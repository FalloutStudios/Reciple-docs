<script lang="ts">
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

    let fetchDocs = docs.resolveSelf(data.tag);

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
    <div class="contents" style="padding: 2.5rem">
        {#await fetchDocs then e}
            {#if docs.defaultPage}
                <Markdown content={docs.defaultPage?.content} style=""></Markdown>
            {/if}
        {/await}
    </div>
</div>