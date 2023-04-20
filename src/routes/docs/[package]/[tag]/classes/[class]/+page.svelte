<script lang="ts">
    import '../../../../../../assets/styles/main.scss';
    import '../../../../../../assets/styles/docs.scss';
    import Nav from "../../../../../../components/Nav.svelte";
    import SideNav from '../../../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../../../data/DocsData';
    import packages from '../../../../../../scripts/packages';
    import Title from '../../../../../../components/docs/Title.svelte';
    import Markdown from '../../../../../../components/docs/Markdown.svelte';
    import PropMethods from '../../../../../../components/docs/PropMethods.svelte';
    import ParamsTable from '../../../../../../components/docs/ParamsTable.svelte';
    import PropertyDocs from '../../../../../../components/docs/PropertyDocs.svelte';
    import MethodDocs from '../../../../../../components/docs/MethodDocs.svelte';
    import { onMount } from 'svelte';

    export let data: { package: keyof typeof packages; tag: string; class: string; };

    let docs: DocsData = packages[data.package];

    $: tag = data.tag;
    $: pkg = data.package;

    $: class_ = data.class;
    $: docsData = docs.data.classes?.find(e => e.name === class_);
    $: xtnds = docsData?.extends?.map((t: string[][]) => docs.typeKey(t, [docsData!.name])).join('');
    $: mplmnts = docsData?.implements?.map((t: string[][]) => docs.typeKey(t, [docsData!.name])).join('');

    onMount(async () => {
        if (docs.fetched) return;
        docs = await docs.resolveSelf(tag);
    });

    async function changeTag(tag: CustomEvent<string>) {
        docs = await docs.resolveSelf(tag.detail);
    }
</script>

<svelte:head>
    <title>Class | {class_}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag} on:tagChange={changeTag} accordionSelected={{ name: class_, type: 'class' }}></SideNav>

{#if docsData}
    <div class="docsContent">
        <div class="contents">
            <Title icon="codicon:symbol-class" source={docsData.meta.url} subTitle={(xtnds ? `extends ${xtnds} ` : '') + (mplmnts ? `implements ${mplmnts}` : '')}>{docsData.name}</Title>
            {#if docsData?.description}<Markdown class="content-description" {docs} content={docsData?.description} />{/if}
            <Markdown {docs} content={'```js\n'+  docsData.construct.name +'('+ (docsData.construct.params ? docs.parseParamTypes(docsData.construct.params) : '') +')\n```'}/>
            {#if docsData.construct.params}
                <ParamsTable params={docsData.construct.params} {docs}></ParamsTable>
            {/if}
            <PropMethods properties={docsData.props} methods={docsData.methods}></PropMethods>
            <hr>

            {#if docsData.props?.length}
                <h1 class="content-label">Properties</h1>
                <div class="properties">
                    {#each docsData.props as prop}
                        <PropertyDocs property={prop} {docs}></PropertyDocs>
                    {/each}
                </div>
            {/if}

            {#if docsData.methods.length}
                <h1 class="content-label">Methods</h1>
                <div class="methods">
                    {#each docsData.methods as method}
                        <MethodDocs {method} {docs}></MethodDocs>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}