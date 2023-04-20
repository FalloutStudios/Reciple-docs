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
    import { onMount } from 'svelte';

    export let data: { package: keyof typeof packages; tag: string; function: string; };

    let docs: DocsData = packages[data.package];

    $: tag = data.tag;
    $: pkg = data.package;

    $: func = data.function;
    $: docsData = docs.data.functions?.find(e => e.name === func);
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
    <title>Function | {func}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag} on:tagChange={changeTag} accordionSelected={{ name: func, type: 'function' }}></SideNav>

{#if docsData}
    <div class="docsContent">
        <div class="contents">
            <Title icon="codicon:symbol-method" source={docsData.meta.url}>{docsData.name}</Title>
            {#if docsData?.description}<Markdown {docs} class="content-description" content={docsData?.description} />{/if}

            <h3>Construct</h3>
            <Markdown class="nowrap-code-md" content={'```ts\n'+ docsData.name + `(${ docsData.params ? docs.parseParamTypes(docsData.params, { escapeHtml: false, disableTypeAnchors: true }) : '' }): ${returns || 'unknown'}` +'\n```'}></Markdown>

            {#if docsData.params}
                <ParamsTable params={docsData.params} {docs} title="Params"></ParamsTable>
            {/if}
            {#if returns}
                <h3>Returns</h3>
                {#if docsData.returnsDescription}<Markdown {docs} class="content-description" content={docsData.returnsDescription}/>{/if}
                <Markdown content={'```js\n' + returns + '\n```'} {docs}></Markdown>
            {/if}
        </div>
    </div>
{/if}