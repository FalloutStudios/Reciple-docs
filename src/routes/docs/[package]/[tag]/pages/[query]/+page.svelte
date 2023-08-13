<script lang="ts">
    import type { PackagePagesLoadData } from './+page';
    import Markdown from '$lib/components/Markdown.svelte';

    export let data: PackagePagesLoadData;
</script>
<svelte:head>
    <title>{data.package}@{data.tag} | {data.page.name}</title>
</svelte:head>
<Markdown content={data.page.content}/>