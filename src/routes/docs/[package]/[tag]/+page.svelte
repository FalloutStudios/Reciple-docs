<script lang="ts">
    import '../../../../assets/styles/main.scss';
    import Nav from "../../../../components/Nav.svelte";
    import SideNav from '../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../data/DocsData';
    import packages from '../../../../scripts/packages';

    export let data: { package: keyof typeof packages; tag: string; };

    let docs: DocsData = packages[data.package];

    $: tag = data.tag;
    $: pkg = data.package;
</script>

<Nav title="{pkg}@{tag}"></Nav>
<SideNav {docs} {tag}></SideNav>

<div class="docsContent">
</div>