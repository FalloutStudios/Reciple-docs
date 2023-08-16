<script lang="ts">
    import Markdown from '$lib/components/Markdown.svelte';
    import type { PackageTagLoadData } from './+page';

    export let data: PackageTagLoadData;
</script>

<Markdown content={data.docs.data?.readme ?? ''}/>