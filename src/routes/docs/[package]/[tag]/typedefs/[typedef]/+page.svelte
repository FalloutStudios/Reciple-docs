<script lang="ts">
    import '../../../../../../assets/styles/main.scss';
    import '../../../../../../assets/styles/docs.scss';
    import Nav from "../../../../../../components/Nav.svelte";
    import SideNav from '../../../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../../../data/DocsData';
    import packages from '../../../../../../scripts/packages';
    import Title from '../../../../../../components/docs/Title.svelte';
    import PropMethods from '../../../../../../components/docs/PropMethods.svelte';
    import Markdown from '../../../../../../components/docs/Markdown.svelte';
    import PropertyDocs from '../../../../../../components/docs/PropertyDocs.svelte';
    import { onMount } from 'svelte';

    export let data: { package: keyof typeof packages; tag: string; typedef: string; };

    let docs: DocsData = packages[data.package];

    let tag = data.tag;
    let pkg = data.package;

    $: typedef = data.typedef;
    $: docsData = docs.data.typedefs?.find(e => e.name == typedef);
    $: returns = docsData?.returns?.map((e: string[][][]) => Array.isArray(e) ? e.map(i => docs.typeKey(i, true, false)).join('') : '').join('');

    onMount(async () => {
        if (docs.fetched) return;
        docs = await docs.resolveSelf(tag);
    });

    async function changeTag(tag: CustomEvent<string>) {
        docs = await docs.resolveSelf(tag.detail);
    }
</script>

<svelte:head>
    <title>Typedef | {typedef}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag} on:tagChange={changeTag} accordionSelected={{ name: typedef, type: 'typedef' }}></SideNav>

{#if docsData}
    <div class="docsContent">
        <div class="contents">
            <Title icon="codicon:symbol-field" source={docsData.meta.url}>{docsData.name}</Title>
            {#if docsData?.description}<Markdown class="content-description" {docs} content={docsData?.description} />{/if}
            {#if docsData.type}<Markdown {docs} content={'```ts\n'+ docsData.type.map(e => docs.typeKey(e, true, false)).join('') + '\n```'}/>{/if}

            <PropMethods properties={docsData?.props ?? []}></PropMethods>
            <hr>

            {#if docsData.props?.length}
                <h1>Properties</h1>
                <div class="properties">
                    {#each docsData.props as prop}
                        <PropertyDocs property={prop} {docs}></PropertyDocs>
                    {/each}
                </div>
            {/if}

            {#if returns}
                <h3>Returns</h3>
                {#if docsData.returnsDescription}<Markdown {docs} class="content-description" content={docsData.returnsDescription}/>{/if}
                <Markdown content={'```js\n' + returns + '\n```'} {docs}></Markdown>
            {/if}
        </div>
    </div>
{/if}