<script lang="ts">
    import { onMount } from 'svelte';
    import '../../../../assets/styles/docs.scss';
    import '../../../../assets/styles/main.scss';
    import Markdown from '../../../../components/docs/Markdown.svelte';
    import Nav from "../../../../components/Nav.svelte";
    import SideNav from '../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../data/DocsData';
    import packages from '../../../../scripts/packages';

    export let data: { package: keyof typeof packages; tag: string; };

    let docs: DocsData = packages[data.package];

    let tag = data.tag;
    let pkg = data.package;

    onMount(async () => {
        docs = await docs.resolveSelf(tag);
    });

    async function changeTag(tag: CustomEvent<string>) {
        docs = await docs.resolveSelf(tag.detail);
    }
</script>

<svelte:head>
    <title>Docs | {pkg}@{tag}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag} on:tagChange={changeTag}></SideNav>

<div class="docsContent">
    <div class="contents">
        {#if docs?.defaultPage}
            <Markdown content={docs.defaultPage?.content} {docs}></Markdown>
        {/if}
    </div>
</div>