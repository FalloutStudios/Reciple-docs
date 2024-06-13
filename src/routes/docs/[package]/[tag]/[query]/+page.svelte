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
    import SignatureTable from '$lib/components/docs/SignatureTable.svelte';
    import FloatingLabel from '$lib/components/docs/FloatingLabel.svelte';
    import warningBoldIcon from '@iconify/icons-ph/warning-bold';
    import symbolParameter from '@iconify/icons-codicon/symbol-parameter';
    import { Colors } from '$lib/scripts/config';
    import Pill from '$lib/components/docs/Pill.svelte';
    import { page } from '$app/stores';

    export let data: PackageQueryLoadData;

    $: selected = (data.docs.data?.find(data.selected) ?? undefined) as AnyDocsElement;
    $: hash = $page.url.hash.substring(1);

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
                {@const isReadonly = 'readonly' in member && member.readonly}
                {@const isPrivate = 'accessibility' in member && member.accessibility === ClassParser.Accessibility.Private}
                {@const isProtected = 'accessibility' in member && member.accessibility === ClassParser.Accessibility.Protected}
                {@const isAbstract = 'abstract' in member && member.abstract}
                {@const isOptional = 'optional' in member && member.optional}
                {@const deprecationMessage = isElementDeprecated(member) ? getElementBlocktag(member, 'deprecated') : null}
                {@const description = getElementDescription(member)}
                <Member hr={!!index}>
                    <Header id={slug((isStatic ? 'static-' : '') + member.name)}>
                        <code class:deprecated={!!deprecationMessage}>{member.name}{member.optional ? '?' : ''}: {@html stringifyType(data, member.type, true, 2)}</code>
                    </Header>
                    <div class="content">
                        <div class="pills">
                            {#if isPrivate}<Pill backgroundColor={Colors.DARK}>private</Pill>{/if}
                            {#if isProtected}<Pill backgroundColor={Colors.DARK}>protected</Pill>{/if}
                            {#if isOptional}<Pill backgroundColor={Colors.LINK}>optional</Pill>{/if}
                            {#if isAbstract}<Pill backgroundColor={Colors.DARK}>abstract</Pill>{/if}
                            {#if isReadonly}<Pill>readonly</Pill>{/if}
                            {#if isStatic}<Pill backgroundColor={Colors.BORDER}>static</Pill>{/if}
                        </div>
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
                {@const isReadonly = 'readonly' in member && member.readonly}
                {@const isPrivate = 'accessibility' in member && member.accessibility === ClassParser.Accessibility.Private}
                {@const isProtected = 'accessibility' in member && member.accessibility === ClassParser.Accessibility.Protected}
                {@const isAbstract = 'abstract' in member && member.abstract}
                {@const deprecationMessage = isElementDeprecated(member) ? getElementBlocktag(member, 'deprecated') : null}
                {@const description = getElementDescription(member)}
                {@const memberSlug = slug((isStatic ? 'static-' : '') + member.name)}
                <Member hr={!!index}>
                    <Header id={memberSlug}>
                        <code class:deprecated={!!deprecationMessage}>{member.name}()</code>
                    </Header>
                    <div class="content">
                        <div class="pills">
                            {#if isPrivate}<Pill backgroundColor={Colors.DARK}>private</Pill>{/if}
                            {#if isProtected}<Pill backgroundColor={Colors.DARK}>protected</Pill>{/if}
                            {#if isAbstract}<Pill backgroundColor={Colors.DARK}>abstract</Pill>{/if}
                            {#if isReadonly}<Pill>readonly</Pill>{/if}
                            {#if isStatic}<Pill backgroundColor={Colors.BORDER}>static</Pill>{/if}
                        </div>
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
                        <Accordion name="Parameters" open={!!hash && hash === memberSlug} hr={false} icon={symbolParameter}>
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
                    <div class="pills"></div>
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