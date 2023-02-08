<script lang="ts">
    import { goto } from '$app/navigation';
    import '../../../../assets/styles/main.scss';
    import Markdown from '../../../../components/docs/Markdown.svelte';
    import Nav from "../../../../components/Nav.svelte";
    import SideNav from '../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../data/DocsData';
    import packages from '../../../../scripts/packages';

    export let data: { package: keyof typeof packages; tag: string; };

    let docs: DocsData = packages[data.package];

    $: tag = data.tag;
    $: pkg = data.package;
</script>

<svelte:head>
    <title>Docs | {pkg}@{tag}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag}></SideNav>

<div class="docsContent"></div>