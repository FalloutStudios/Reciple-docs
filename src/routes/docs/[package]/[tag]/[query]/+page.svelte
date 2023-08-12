<script lang="ts">
    import type { PackageQueryLoadData } from './+page';
    import type { AnyDocsElement } from '../../../../../lib/scripts/types';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    import Markdown from '../../../../../lib/components/Markdown.svelte';

    export let data: PackageQueryLoadData;

    $: selected = data.docs.data?.find(data.selected) ?? undefined as AnyDocsElement|undefined;

    onMount(() => {
        if (!selected) throw error(404);
    });
</script>
<Markdown content={'```json\n' + JSON.stringify(selected.toJSON(), null, 2) + '\n```'}/>