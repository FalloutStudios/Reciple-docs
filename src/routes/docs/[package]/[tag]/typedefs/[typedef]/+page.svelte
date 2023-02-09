<script lang="ts">
    import '../../../../../../assets/styles/main.scss';
    import '../../../../../../assets/styles/docs.scss';
    import Nav from "../../../../../../components/Nav.svelte";
    import SideNav from '../../../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../../../data/DocsData';
    import packages from '../../../../../../scripts/packages';
    import Title from '../../../../../../components/docs/Title.svelte';

    export let data: { package: keyof typeof packages; tag: string; typedef: string; };

    let docs: DocsData = packages[data.package];

    let tag = data.tag;
    let pkg = data.package;

    $: typedef = data.typedef;
    $: docsData = docs.data.typedefs?.find(e => e.name = typedef);

    let fetchDocs = docs.resolveSelf(data.tag).then(e => { docs = e; });

    async function changeTag(tag: CustomEvent<string>) {
        docs = await docs.resolveSelf(tag.detail);
    }
</script>

<svelte:head>
    <title>Class | {typedef}</title>
</svelte:head>

<Nav title="{pkg}@{tag}" {docs}></Nav>
<SideNav {docs} {tag} on:tagChange={changeTag} accordionSelected={{ name: typedef, type: 'typedef' }}></SideNav>

{#if docsData}
    <div class="docsContent">
        <div class="contents" style="padding: 2.5rem">
            <Title icon="codicon:symbol-field" source={docsData.meta.url}>{docsData.name}</Title>
        </div>
    </div>
{/if}