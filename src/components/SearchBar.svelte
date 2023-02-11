<script lang="ts">
    import Icon from "@iconify/svelte";
    import { Svrollbar } from 'svrollbar';
    import type { DocsData } from '../data/DocsData';
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let isOpen: boolean = true;
    export let docs: DocsData;

    let viewport: Element;
    let contents: Element;
    let input: HTMLInputElement;

    let query: string;
    let results: { name: string; href: string; }[] = [];

    let canBeClosed: boolean = true;
    let closing: NodeJS.Timer|null = null;

    let loading: boolean = false;
    let inputTimer: NodeJS.Timer|null = null;
    let dispatch = createEventDispatcher();

    let selectedId: number = -1;
    let selectedResult: HTMLAnchorElement|null = null;

    let originalValue: string = '';

    $: isOpen, (() => {
        if (isOpen) setTimeout(() => {
            if (input && typeof window !== 'undefined') input.focus();
        }, 100)
    })();

    function inputUpdate() {
        if (inputTimer) clearTimeout(inputTimer);
        if (closing) clearTimeout(closing);

        loading = true;
        results = [];

        selectedId = -1;
        originalValue = input.value;

        inputTimer = setTimeout(() => search(), 500);
    }

    async function search() {
        results = await docs.search(query || '');
        loading = false;
        dispatch('resultsUpdate', results);
    }

    function close() {
        canBeClosed = true;
        if (closing) clearTimeout(closing);

        closing = setTimeout(() => {
            if (!canBeClosed) return;
            isOpen = false;
            originalValue = '';
            results = [];
            if (input) input.value = '';

            dispatch('close');
        }, 100);
    }

    function open() {
        if (closing) clearTimeout(closing);
        canBeClosed = false;
        isOpen = true;
        dispatch('open');
    }

    function keydown(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedId = selectedId + 1 > (results.length - 1) ? 0 : selectedId + 1;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedId = selectedId - 1 < -1 ? results.length - 1 : selectedId - 1;
        }

        selectedResult = document.querySelector<HTMLAnchorElement>(`#sr-${selectedId}`);

        if (selectedId === -1) {
            input.value = originalValue;
        } else {
            input.value = selectedResult?.getAttribute('title') ?? originalValue;
        }
    }

    function keyup(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedResult) selectedResult.click();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            close();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (selectedId <= -1) return;

            e.preventDefault();
            selectedResult?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }

    function searchShortcut(e: KeyboardEvent) {
        if (e.key === '/' || (e.key == 'k' && e.ctrlKey) || (!e.ctrlKey && !e.altKey && e.key.length === 1)) {
            if (document.activeElement === input) return;

            e.preventDefault();
            if (input && e.key !== '/') {
                input.value = e.key;
                originalValue = e.key;
                query = e.key;

                inputUpdate();
            }
            open();
        }
    }

    onDestroy(() => typeof window === 'undefined' ? null : window.removeEventListener('keypress', searchShortcut));
    onMount(() => typeof window === 'undefined' ? null : window.addEventListener('keypress', searchShortcut));
</script>

<style lang="scss">
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        width: 100%;
        height: 100%;
        display: none;

        &.open {
            display: block;
        }
    }

    .search-container {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(24, 24, 24, 0.5);
        display: grid;

        .search {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 500px;
            padding: 4rem 2rem;
            margin-top: 6rem;
            justify-self: center;

            .form {
                display: flex;
                background: rgba(24, 24, 24, 0.7);
                backdrop-filter: blur(5px);
                padding: 1rem 1rem;
                border-radius: 5px;
                border: 2px solid #3c3c3c;
                align-items: center;
                width: 100%;
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
                margin-bottom: 2px;
                font-size: 1.2rem;
                transition: 0.3s;

                .icon,
                button {
                    width: 1rem;
                    height: 1rem;
                    margin-right: 1rem;
                    color: #999;
                    flex-shrink: 0;
                }

                .loading {
                    height: 1em;
                    width: 1em;
                    display: block;
                    border: 2px solid transparent;
                    border-top-color: #cecece;
                    border-radius: 50%;
                    animation: rotate 0.5s both infinite normal;
                }

                button {
                    display: flex;
                    width: 1.2rem;
                    height: 1.2rem;
                    font-size: 1.2rem;
                    margin-right: 0;
                    margin-left: 1rem;
                    background: none;
                    color: #fff;
                    border: none;
                    outline: none;
                }

                input {
                    width: 100%;
                    border: none;
                    background: none;
                    outline: none;
                }

                &:focus-within {
                    border-color: #588bf2;
                    outline: 2px solid #588bf2;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
                }
            }

            .results {
                display: flex;
                flex-direction: column;
                margin-top: 1rem;
                width: 100%;
                background: rgba(24, 24, 24, 0.7);
                backdrop-filter: blur(5px);
                box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
                border-radius: 5px;
                padding: 4px 0;
                border: 2px solid #3c3c3c;

                a {
                    color: currentColor;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    padding: 0.5rem 1rem;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;

                    &:hover,
                    &:focus-visible {
                        background: rgba(69, 69, 69, 0.5);
                    }

                    &:focus-visible,
                    &.selected {
                        border-radius: 5px;
                        outline: 4px solid #588bf2;
                    }

                    .name {
                        display: block;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #588bf2;
                        font-weight: 600;
                    }

                    &.withChild {
                        .name {
                            color: rgb(129, 149, 184);

                            .separator,
                            .child {
                                color: #588bf2;
                            }
                        }
                    }

                    .url {
                        font-size: 0.8rem;
                        color: #999;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
</style>

{#if isOpen}
<style>
    html {
        overflow: hidden;
    }
</style>
{/if}

<div class="wrapper" class:open={isOpen}>
    <div class="search-container noScrollbar" bind:this={viewport}>
        <div class="search" bind:this={contents}>
            <div class="form">
                <span class="icon">
                    {#if loading}
                        <span class="loading"></span>
                    {:else}
                    <Icon icon="fluent:search-12-regular"/>
                    {/if}
                </span>
                <input type="search" bind:value={query} on:input={inputUpdate} on:blur={close} on:focus={open} on:keydown={keydown} on:keyup={keyup} bind:this={input}>
                <button type="reset" on:click={close}><Icon icon="material-symbols:arrow-forward-rounded" /></button>
            </div>
            {#if results.length}
                <div class="results">
                    {#each results as result, id}
                        <a href={result.href} title="{result.name}" on:click={() => { isOpen = false; goto(result.href); }} on:blur={close} on:mousedown={open} on:focus={open} class:selected={selectedId == id} id="sr-{id}" class:withChild={result.name.split('#').length > 1}>
                            <span class="name">
                                {result.name.split('#')[0]}{#if result.name.split('#')[1]}<span class="separator">#</span><span class="child">{result.name.split('#')[1]}</span>{/if}
                            </span>
                            <span class="url">{result.href}</span>
                        </a>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <Svrollbar {viewport} {contents} alwaysVisible={true}/>
</div>