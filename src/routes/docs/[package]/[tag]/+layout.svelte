<script lang="ts">
    import type { PackageTagLoadData } from './+page';
    import { page } from "$app/stores";
    import Nav from '$lib/components/Nav.svelte';
    import SideBar from '$lib/components/SideBar.svelte';
    import type { DocsParser } from '$lib/scripts/classes/DocsParser';

    $: docsData = $page.data as PackageTagLoadData & { docs: DocsParser & { data: Exclude<DocsParser['data'], undefined> } };
</script>

<svelte:head>
    <title>{docsData.package}@{docsData.tag}</title>
</svelte:head>

<style lang="scss">
    .content-container {
        width: 100%;
        padding-right: 1rem;
        padding-bottom: 0.5rem;
    }
</style>

<Nav data={docsData}/><SideBar/>
<div class="content-container">
    <div class="content">
        <slot/>
    </div>
</div>