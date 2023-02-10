<script lang="ts">
    import '../../../../../../assets/styles/main.scss';
    import '../../../../../../assets/styles/docs.scss';
    import Nav from "../../../../../../components/Nav.svelte";
    import SideNav from '../../../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../../../data/DocsData';
    import packages from '../../../../../../scripts/packages';
    import Title from '../../../../../../components/docs/Title.svelte';
    import Markdown from '../../../../../../components/docs/Markdown.svelte';
    import ParamsTable from '../../../../../../components/docs/ParamsTable.svelte';
    import { typeKey } from '../../../../../../scripts/typeKey';

    export let data: { package: keyof typeof packages; tag: string; function: string; };

    let docs: DocsData = packages[data.package];

    let tag = data.tag;
    let pkg = data.package;

    $: func = data.function;
    $: docsData = docs.data.functions?.find(e => e.name === func);
    $: returns = docsData?.returns.map((e: string[][][]) => e.map(i => docs.typeKey(i, true, false)).join('')).join('');

    let fetchDocs = docs.resolveSelf(data.tag).then(e => { docs = e; });

    async function changeTag(tag: CustomEvent<string>) {
        docs = await docs.resolveSelf(tag.detail);
    }
</script>

<svelte:head>
    <title>Function | {func}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag} on:tagChange={changeTag} accordionSelected={{ name: func, type: 'function' }}></SideNav>

{#if docsData}
    <div class="docsContent">
        <div class="contents" style="padding: 2.5rem">
            <Title icon="codicon:symbol-method" source={docsData.meta.url}>{docsData.name}</Title>
            {#if docsData.description}<p class="content-description">{docsData.description}</p>{/if}
            {#if docsData.params}
                <ParamsTable params={docsData.params} {docs}></ParamsTable>
            {/if}
            <h3>Returns</h3>
            {#if docsData.returnsDescription}<p class="content-description">{docsData.returnsDescription}</p>{/if}
            <Markdown content={'```js\n' + returns + '\n```'}></Markdown>
        </div>
    </div>
{/if}