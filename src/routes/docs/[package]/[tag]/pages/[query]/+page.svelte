<script lang="ts">
    import type { PackagePagesLoadData } from './+page';
    import Markdown from '$lib/components/Markdown.svelte';

    export let data: PackagePagesLoadData;
</script>
<Markdown content={data.page.content}/>