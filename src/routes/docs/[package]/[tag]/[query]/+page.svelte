<script lang="ts">
    import type { PackageQueryLoadData } from './+page';
    import type { AnyDocsElement } from '$lib/scripts/types';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    import Markdown from '$lib/components/Markdown.svelte';
    import { getElementTypeDisplayName } from '$lib/scripts/helpers';

    export let data: PackageQueryLoadData;

    $: selected = (data.docs.data?.find(data.selected) ?? undefined) as AnyDocsElement;

    onMount(() => {
        if (!selected) throw error(404);
    });
</script>
<svelte:head>
    <title>{data.package}@{data.tag} | {getElementTypeDisplayName(selected)} {selected.name}</title>
</svelte:head>
<Markdown content={'```json\n' + JSON.stringify(selected.toJSON(), null, 2) + '\n```'}/>