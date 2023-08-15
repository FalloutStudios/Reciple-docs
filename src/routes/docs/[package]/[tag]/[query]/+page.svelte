<script lang="ts">
    import type { PackageQueryLoadData } from './+page';
    import type { AnyDocsElement } from '$lib/scripts/types';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    import { getElementTypeDisplayName, stringifyType } from '$lib/scripts/helpers';
    import { ClassParser, EnumParser, InterfaceParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
    import Accordion from '../../../../../lib/components/docs/Accordion.svelte';
import Label from '../../../../../lib/components/docs/Label.svelte';

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
<Accordion name="Properties" hr={false} id="-properties">
    <h1>HEHEHHE</h1>
</Accordion>
<Accordion name="Methods" hr={false} id="-methods">
    <h1>HEHEHHE</h1>
</Accordion>
{:else if selected instanceof EnumParser}
<Accordion name="Members" hr={false} id="-members">
    <h1>Bitch</h1>
</Accordion>
{:else if selected instanceof TypeAliasParser || selected instanceof VariableParser}
<Accordion name="Type" hr={false} id="-type">
    <Label label="Type">
        <code>{@html stringifyType(data, selected.type, true, 5)}</code>
    </Label>
</Accordion>
{/if}