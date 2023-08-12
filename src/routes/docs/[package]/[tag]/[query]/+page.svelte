<script lang="ts">
    import type { PackageQueryLoadData } from './+page';
    import type { AnyDocsElement } from '../../../../../lib/scripts/types';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';

    export let data: PackageQueryLoadData;

    $: selected = data.docs.data?.find(data.selected) ?? undefined as AnyDocsElement|undefined;

    onMount(() => {
        if (!selected) throw error(404);
    });
</script>
<pre>{JSON.stringify(selected.toJSON(), null, 2)}</pre>