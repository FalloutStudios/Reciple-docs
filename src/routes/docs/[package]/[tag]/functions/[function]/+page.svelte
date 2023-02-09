<script lang="ts">
    import '../../../../../../assets/styles/main.scss';
    import Nav from "../../../../../../components/Nav.svelte";
    import SideNav from '../../../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../../../data/DocsData';
    import packages from '../../../../../../scripts/packages';

    export let data: { package: keyof typeof packages; tag: string; function: string; };

    let docs: DocsData = packages[data.package];

    $: tag = data.tag;
    $: pkg = data.package;
    $: func = data.function;

    let fetchDocs = docs.resolveSelf(data.tag);

    async function changeTag(tag: CustomEvent<string>) {
        docs = await docs.resolveSelf(tag.detail);
    }
</script>

<svelte:head>
    <title>Function | {func}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag} on:tagChange={changeTag} accordionSelected={{ name: func, type: 'function' }}></SideNav>

<div class="docsContent">
    <div class="contents" style="padding: 2.5rem"></div>
</div>