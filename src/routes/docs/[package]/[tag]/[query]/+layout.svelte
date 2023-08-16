<script lang="ts">
    import { page } from "$app/stores";
    import type { AnyDocsElement } from '$lib/scripts/types';
    import type { DocsParser } from '$lib/scripts/classes/DocsParser';
    import ElementHeader from '$lib/components/docs/ElementHeader.svelte';
    import type { PackageQueryLoadData } from './+page';

    $: docsData = $page.data as PackageQueryLoadData & { docs: DocsParser & { data: Exclude<DocsParser['data'], undefined> } };
    $: selected = docsData.docs.data.find(docsData.selected) as AnyDocsElement;
</script>
<ElementHeader element={selected} data={docsData}/>
<slot/>