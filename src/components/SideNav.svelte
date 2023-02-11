<script lang="ts">
    import type { DocsData } from '../data/DocsData';
    import packages from '../scripts/packages';
    import DropdownMenu from './DropdownMenu.svelte';
    import { Svrollbar } from 'svrollbar';
    import Accordion from './docs/Accordion.svelte';
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import Icon from '@iconify/svelte';

    export let docs: DocsData;
    export let tag: string;
    export let accordionSelected: { type: 'class'|'function'|'typedef', name: string; }|null = null;
    export let isOpen: boolean = false;

    onMount(async () => {
        docs = await docs.resolveSelf(tag);
    });

    let Sidebar: Element;
    let SidebarContents: Element;

    $: classes = docs.classes.map(e => ({ value: e.name, href: `/docs/${docs.options.package}/${tag}/classes/${e.name}` }));
    $: functions = docs.functions.map(e => ({ value: e.name, href: `/docs/${docs.options.package}/${tag}/functions/${e.name}` }))
    $: typedefs = docs.typedefs.map(e => ({ value: e.name, href: `/docs/${docs.options.package}/${tag}/typedefs/${e.name}` }))

    const dispatch = createEventDispatcher();

    async function handleTagChange(newTag: CustomEvent<{ value: string; }>) {
        tag = newTag.detail.value;

        dispatch('tagChange', tag);
        console.log(tag);
    }

    $: windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

    function escapeHandle(e: KeyboardEvent) {
        if (!isOpen) return;
        e.preventDefault();

        isOpen = false;
    }

    onMount(() => typeof window !== 'undefined' ? window.addEventListener('keydown', escapeHandle) : null);
    onDestroy(() => typeof window !== 'undefined' ? window.removeEventListener('keydown', escapeHandle) : null);
</script>

<style lang="scss">
    :global(.docsContent) {
        padding-left: 300px;
    }

    .open-sidebar {
        display: none;
    }

    .wrapper {
        position: fixed;
        top: 4rem;
        left: 0;
        height: calc(100% - 4rem);
        width: 300px;
        max-width: 100%;
        z-index: 9;

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

    @media (max-width: 770px) {
        :global(.docsContent) {
            padding-left: unset;
        }

        .wrapper {
            top: 4rem;
            left: unset;
            right: -400px;
            transition: 0.3s right;
            box-shadow: 0px 0px 20px rgba($color: #000, $alpha: 0.5);
            max-width: 325px;
            width: 100%;
            visibility: none;

            .sidenav {
                padding-bottom: 8rem;
                border-right: none;
                border-left: 1px solid #3c3c3c;
            }

            &.open {
                right: 0;
                visibility: visible;
            }
        }

        .open-sidebar {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            z-index: 10;
            bottom: 0;
            right: 0;
            height: 3rem;
            width: 3rem;
            color: #000;
            background: #588bf2;
            box-shadow: 0px 0px 20px rgba($color: #000, $alpha: 0.5);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            margin: 3rem;
        }

        .dim {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            z-index: 8;
            background: rgba(0, 0, 0, 0.2);

            &.open {
                display: block;
            }
        }
    }
</style>

<div class="wrapper" class:open={isOpen}>
    <div class="sidenav" bind:this={Sidebar}>
        <div class="contents" bind:this={SidebarContents}>
            <div class="settings">
                <DropdownMenu class="dropdown" values={Object.keys(packages).map(v => ({ value: v, href: `/docs/${v}`, selected: v === docs.options.package }))} icon="ph:package-bold" id="package-select"></DropdownMenu>
                {#await docs.resolveSelf(tag) then self}
                    <DropdownMenu class="dropdown" on:change={handleTagChange} values={self.tags.map(v => ({ value: v, href: `/docs/${docs.options.package}/${v}`, selected: v === tag }))} icon="tabler:versions" id="tag-select"></DropdownMenu>
                {/await}
            </div>

            {#if classes.length}
                <Accordion
                    label="Classes"
                    icon="codicon:symbol-class"
                    selectedValue={accordionSelected?.type === 'class' ? accordionSelected.name : null}
                    contents={classes}
                    on:change={() => isOpen = false}
                ></Accordion>
            {/if}

            {#if functions.length}
                <Accordion
                    label="Functions"
                    icon="codicon:symbol-method"
                    selectedValue={accordionSelected?.type === 'function' ? accordionSelected.name : null}
                    contents={functions}
                    on:change={() => isOpen = false}
                ></Accordion>
            {/if}

            {#if typedefs.length}
                <Accordion
                    label="Typedefs"
                    icon="codicon:symbol-field"
                    selectedValue={accordionSelected?.type === 'typedef' ? accordionSelected.name : null}
                    contents={typedefs}
                    on:change={() => isOpen = false}
                ></Accordion>
            {/if}
        </div>
    </div>
    <Svrollbar viewport={Sidebar} contents={SidebarContents}/>
</div>

{#if windowWidth <= 770}
    <style>
        .docsContent {
            padding-bottom: 8rem;
        }
    </style>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="dim" class:open={isOpen} on:click={() => isOpen = false}></div>
    <button class="open-sidebar" on:click={() => isOpen = !isOpen}>
        {#if isOpen}
        <style>
            html {
                overflow: hidden;
            }
        </style>
        <Icon icon="bi:x" />
        {:else}
        <Icon icon="fluent:navigation-16-filled" />
        {/if}
    </button>
{/if}