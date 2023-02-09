<script lang="ts">
    import '../../../../../../assets/styles/main.scss';
    import '../../../../../../assets/styles/docs.scss';
    import Nav from "../../../../../../components/Nav.svelte";
    import SideNav from '../../../../../../components/SideNav.svelte';
    import type { DocsData } from '../../../../../../data/DocsData';
    import packages from '../../../../../../scripts/packages';
  import Title from '../../../../../../components/docs/Title.svelte';

    export let data: { package: keyof typeof packages; tag: string; class: string; };

    let docs: DocsData = packages[data.package];

    $: tag = data.tag;
    $: pkg = data.package;
    $: class_ = data.class;
    $: docsData = docs.data.classes?.find(e => e.name === class_);

    let fetchDocs = docs.resolveSelf(data.tag).then(e => { docs = e; });

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
        <div class="contents" style="padding: 2.5rem">
            <Title icon="codicon:symbol-class" source={docsData.meta.url}>{docsData.name}</Title>
        </div>
    </div>
{/if}