<script lang="ts">
    import type { DocsData } from '../data/DocsData';
    import packages from '../scripts/packages';
    import DropdownMenu from './DropdownMenu.svelte';
    import { Svrollbar } from 'svrollbar';
    import Accordion from './docs/Accordion.svelte';

    export let docs: DocsData;
    export let tag: string;

    let fetchDocs: Promise<DocsData> = Promise.resolve(docs.fetchDocs(tag));
    let Sidebar: Element;
    let SidebarContents: Element;
    let accordionSelected: { type: 'class'|'function'|'typedef', name: string; }|null = null;

    $: docs.data = docs.data;

    async function handleTagChange(tag: CustomEvent<{ value: string; }>) {
        docs = await docs.fetchDocs(tag.detail.value);
    }
</script>

<style lang="scss">
    :global(.docsContent) {
        padding-left: 300px;
    }

    .wrapper {
        position: fixed;
        top: 4rem;
        left: 0;
        height: calc(100% - 4rem);
        width: 300px;
        max-width: 100%;

        .sidenav {
            position: relative;
            width: 100%;
            background: #181818;
            border-right: 1px solid #3c3c3c;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            -ms-overflow-style: none;
            scrollbar-width: none;
            padding: 1rem 0.5rem;

            &::-webkit-scrollbar {
                display: none;
            }

            .settings {
                border-bottom: 1px solid #3c3c3c;

                :global(.dropdown) {
                    margin-bottom: 1rem;
                }
            }

            :global(.selector),
            :global(.toggle) {
                border-color: transparent;
                background-color: transparent;
            }
        }
    }
</style>

<div class="wrapper">
    <div class="sidenav" bind:this={Sidebar}>
        <div class="contents" bind:this={SidebarContents}>
            <div class="settings">
                <DropdownMenu class="dropdown" values={Object.keys(packages).map(v => ({ value: v, href: `/docs/${v}`, selected: v === docs.options.package }))} icon="ph:package-bold" id="package-select"></DropdownMenu>
                {#await fetchDocs then e}
                    <DropdownMenu class="dropdown" on:change={handleTagChange} values={docs.tags.map(v => ({ value: v, href: `/docs/${docs.options.package}/${v}`, selected: v === tag }))} icon="tabler:versions" id="tag-select"></DropdownMenu>
                {/await}
            </div>
            {#await fetchDocs then e}
                {#if docs.data.classes?.length}
                    <Accordion
                        label="Classes"
                        icon="codicon:symbol-class"
                        contents={docs.data.classes?.map(e => ({
                            value: e.name,
                            href: `/docs/${docs.options.package}/${tag}/classes/${e.name}`,
                            selected: !!accordionSelected && accordionSelected.type === 'class' && accordionSelected.name === e.name
                        })) ?? []}
                    ></Accordion>
                {/if}

                {#if docs.data.functions?.length}
                    <Accordion
                        label="Functions"
                        icon="codicon:symbol-method"
                        contents={docs.data.functions?.map(e => ({
                            value: e.name,
                            href: `/docs/${docs.options.package}/${tag}/functions/${e.name}`,
                            selected: !!accordionSelected && accordionSelected.type === 'function' && accordionSelected.name === e.name
                        })) ?? []}
                    ></Accordion>
                {/if}

                {#if docs.data.typedefs?.length}
                    <Accordion
                        label="Typedefs"
                        icon="codicon:symbol-field"
                        contents={docs.data.typedefs?.map(e => ({
                            value: e.name,
                            href: `/docs/${docs.options.package}/${tag}/typedefs/${e.name}`,
                            selected: !!accordionSelected && accordionSelected.type === 'typedef' && accordionSelected.name === e.name
                        })) ?? []}
                    ></Accordion>
                {/if}
            {/await}
        </div>
    </div>
    <Svrollbar viewport={Sidebar} contents={SidebarContents}/>
</div>