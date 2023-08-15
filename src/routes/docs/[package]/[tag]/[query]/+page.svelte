<script lang="ts">
    import type { PackageQueryLoadData } from './+page';
    import type { AnyDocsElement } from '$lib/scripts/types';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    import { getElementBlocktag, getElementDescription, getElementTypeDisplayName, isElementDeprecated, stringifyType } from '$lib/scripts/helpers';
    import { ClassParser, EnumParser, InterfaceParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
    import Accordion from '$lib/components/docs/Accordion.svelte';
    import Label from '$lib/components/docs/Label.svelte';
    import enumMemberIcon from '@iconify/icons-codicon/symbol-enum-member';
    import rulerIcon from '@iconify/icons-codicon/symbol-ruler';
    import propertyIcon from '@iconify/icons-codicon/symbol-property';
    import methodIcon from '@iconify/icons-codicon/symbol-method';
    import Header from '$lib/components/docs/Header.svelte';
    import { slug } from 'github-slugger';
    import Markdown from '$lib/components/Markdown.svelte';
    import Member from '$lib/components/docs/Member.svelte';
    import SignatureTable from '../../../../../lib/components/docs/SignatureTable.svelte';
    import FloatingLabel from '../../../../../lib/components/docs/FloatingLabel.svelte';
    import warningBoldIcon from '@iconify/icons-ph/warning-bold';
    import symbolParameter from '@iconify/icons-codicon/symbol-parameter';
    import { Colors } from '../../../../../lib/scripts/config';

    export let data: PackageQueryLoadData;

    $: selected = (data.docs.data?.find(data.selected) ?? undefined) as AnyDocsElement;

    onMount(() => {
        if (!selected) throw error(404);
    });
</script>
<svelte:head>
    <title>{data.package}@{data.tag} | {getElementTypeDisplayName(selected)} {selected.name}</title>
</svelte:head>

{#if selected instanceof ClassParser || selected instanceof InterfaceParser}
    {#if selected.properties.length}
        <Accordion name="Properties" hr={false} id="-properties" icon={propertyIcon}>
            {#each selected.properties as member, index}
                {@const isStatic = 'static' in member && member.static}
                {@const deprecationMessage = isElementDeprecated(member) ? getElementBlocktag(member, 'deprecated') : null}
                {@const description = getElementDescription(member)}
                <Member hr={!!index}>
                    <Header id={slug((isStatic ? 'static-' : '') + member.name)}>
                        <code class:deprecated={!!deprecationMessage}>{member.name}{member.optional ? '?' : ''}: {@html stringifyType(data, member.type, true, 2)}</code>
                    </Header>
                    <div class="content">
                        {#if deprecationMessage !== null}
                            <div class="labels">
                                <FloatingLabel label="Deprecated" icon={warningBoldIcon} borderColor={Colors.Danger}>
                                    <Markdown content={deprecationMessage || `This property is deprecated`} inline={true}/>
                                </FloatingLabel>
                            </div>
                        {/if}
                        {#if description}
                            <Markdown class="member-description" content={description}/>
                        {/if}
                    </div>
                </Member>
            {/each}
        </Accordion>
    {/if}
    {#if selected.methods.length}
        <Accordion name="Methods" hr={false} id="-methods" icon={methodIcon}>
            {#each selected.methods as member, index}
                {@const isStatic = 'static' in member && member.static}
                {@const deprecationMessage = isElementDeprecated(member) ? getElementBlocktag(member, 'deprecated') : null}
                {@const description = getElementDescription(member)}
                <Member hr={!!index}>
                    <Header id={slug((isStatic ? 'static-' : '') + member.name)}>
                        <code class:deprecated={!!deprecationMessage}>{member.name}()</code>
                    </Header>
                    <div class="content">
                        {#if deprecationMessage !== null}
                            <div class="labels">
                                <FloatingLabel label="Deprecated" icon={warningBoldIcon} borderColor={Colors.Danger}>
                                    <Markdown content={deprecationMessage || `This method is deprecated`} inline={true}/>
                                </FloatingLabel>
                            </div>
                        {/if}
                        {#if description}
                            <Markdown class="member-description" content={description}/>
                        {/if}
                        <Accordion name="Parameters" open={false} hr={false} icon={symbolParameter}>
                            <SignatureTable signatures={member.signatures} {data}/>
                        </Accordion>
                    </div>
                </Member>
            {/each}
        </Accordion>
    {/if}
{:else if selected instanceof EnumParser}
    <Accordion name="Members" hr={false} id="-members" icon={enumMemberIcon}>
        {#each selected.members as member, index}
            {@const deprecationMessage = isElementDeprecated(member) ? getElementBlocktag(member, 'deprecated') : null}
            {@const description = getElementDescription(member)}
            <Member hr={!!index}>
                <Header id={slug(member.name)}>
                    <code class:deprecated={!!deprecationMessage}>{member.name} = {member.value}</code>
                </Header>
                <div class="content">
                    {#if deprecationMessage !== null}
                        <div class="labels">
                            <FloatingLabel label="Deprecated" icon={warningBoldIcon} borderColor={Colors.Danger}>
                                <Markdown content={deprecationMessage || `This enum member is deprecated`} inline={true}/>
                            </FloatingLabel>
                        </div>
                    {/if}
                    {#if description}
                        <Markdown class="member-description" content={description}/>
                    {/if}
                </div>
            </Member>
        {/each}
    </Accordion>
{:else if selected instanceof TypeAliasParser || selected instanceof VariableParser}
    <Accordion name="Type" hr={false} id="-type" icon={rulerIcon}>
        <Label label="Type">
            <code>{@html stringifyType(data, selected.type, true, 5)}</code>
        </Label>
    </Accordion>
{/if}