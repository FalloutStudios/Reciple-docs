<script lang="ts">
    import type { PackageQueryLoadData } from './+page';
    import type { AnyDocsElement } from '$lib/scripts/types';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    import { getElementTypeDisplayName, stringifyType } from '$lib/scripts/helpers';
    import { ClassParser, EnumParser, InterfaceParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
    import Accordion from '../../../../../lib/components/docs/Accordion.svelte';
    import Label from '../../../../../lib/components/docs/Label.svelte';
    import enumMemberIcon from '@iconify/icons-codicon/symbol-enum-member';
    import rulerIcon from '@iconify/icons-codicon/symbol-ruler';
    import propertyIcon from '@iconify/icons-codicon/symbol-property';
    import methodIcon from '@iconify/icons-codicon/symbol-method';

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
            <h1>HEHEHHE</h1>
        </Accordion>
    {/if}
    {#if selected.methods.length}
        <Accordion name="Methods" hr={false} id="-methods" icon={methodIcon}>
            <h1>HEHEHHE</h1>
        </Accordion>
    {/if}
{:else if selected instanceof EnumParser}
    <Accordion name="Members" hr={false} id="-members" icon={enumMemberIcon}>
        <h1>Bitch</h1>
    </Accordion>
{:else if selected instanceof TypeAliasParser || selected instanceof VariableParser}
    <Accordion name="Type" hr={false} id="-type" icon={rulerIcon}>
        <Label label="Type">
            <code>{@html stringifyType(data, selected.type, true, 5)}</code>
        </Label>
    </Accordion>
{/if}