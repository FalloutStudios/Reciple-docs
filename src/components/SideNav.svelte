<script lang="ts">
    import type { DocsData } from '../data/DocsData';
    import packages from '../scripts/packages';
    import DropdownMenu from './DropdownMenu.svelte';
    import { Svrollbar } from 'svrollbar';
    import Accordion from './docs/Accordion.svelte';
    import { createEventDispatcher } from 'svelte';

    export let docs: DocsData;
    export let tag: string;
    export let accordionSelected: { type: 'class'|'function'|'typedef', name: string; }|null = null;

    docs.resolveSelf(tag).then(e => docs = e);
    let Sidebar: Element;
    let SidebarContents: Element;

    const dispatch = createEventDispatcher();

    async function handleTagChange(tag: CustomEvent<{ value: string; }>) {
        dispatch('tagChange', tag.detail.value);
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
                {#await docs.resolveSelf(tag) then self}
                    <DropdownMenu class="dropdown" on:change={handleTagChange} values={self.tags.map(v => ({ value: v, href: `/docs/${docs.options.package}/${v}`, selected: v === tag }))} icon="tabler:versions" id="tag-select"></DropdownMenu>
                {/await}
            </div>

            {#if docs.classes?.size}
                <Accordion
                    label="Classes"
                    icon="codicon:symbol-class"
                    selectedValue={accordionSelected?.type === 'class' ? accordionSelected.name : null}
                    contents={docs.classes.map(e => ({
                        value: e.name,
                        href: `/docs/${docs.options.package}/${tag}/classes/${e.name}`
                    }))}
                ></Accordion>
            {/if}

            {#if docs.functions?.size}
                <Accordion
                    label="Functions"
                    icon="codicon:symbol-method"
                    selectedValue={accordionSelected?.type === 'function' ? accordionSelected.name : null}
                    contents={docs.functions.map(e => ({
                        value: e.name,
                        href: `/docs/${docs.options.package}/${tag}/functions/${e.name}`
                    }))}
                ></Accordion>
            {/if}

            {#if docs.typedefs?.size}
                <Accordion
                    label="Typedefs"
                    icon="codicon:symbol-field"
                    selectedValue={accordionSelected?.type === 'typedef' ? accordionSelected.name : null}
                    contents={docs.typedefs.map(e => ({
                        value: e.name,
                        href: `/docs/${docs.options.package}/${tag}/typedefs/${e.name}`
                    }))}
                ></Accordion>
            {/if}
        </div>
    </div>
    <Svrollbar viewport={Sidebar} contents={SidebarContents}/>
</div>