<script lang="ts">
    import type { PackageTagLoadData } from './+page';
    import { page } from "$app/stores";
    import Nav from '../../../../lib/components/Nav.svelte';
    import SideBar from '../../../../lib/components/SideBar.svelte';

    $: docsData = $page.data as PackageTagLoadData;
</script>

<svelte:head>
    <title>{docsData.package}@{docsData.tag}</title>
</svelte:head>

<Nav data={docsData.docs}/><SideBar/>
<div class="content-container">
    <div class="content">
        <slot/>
    </div>
</div>