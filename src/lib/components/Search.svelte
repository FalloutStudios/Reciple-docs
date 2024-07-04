<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import { Svrollbar } from 'svrollbar';
    import type { SearchResult } from 'typedoc-json-parser';
    import closeIcon from '@iconify/icons-tabler/arrow-right';
    import searchIcon from '@iconify/icons-tabler/search';
    import Icon from '@iconify/svelte';
    import { Tooltip } from 'flowbite-svelte';
    import { deprecatedElementSorter, getElementDisplayName, getElementHref, getElementIcon, isElementDeprecated } from '../scripts/helpers';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import type { SearchData } from '../scripts/types';

    export let searchInput: HTMLInputElement|null = null;
    export let query: string = '';
    export let originalValue: string = '';
    export let selectedId: number = -1;
    export let open: boolean = false;
    export let search: (query: string) => Promise<SearchData[]> = async () => [];

    const dispatcher = createEventDispatcher();

    let searchContainer: HTMLDivElement;
    let searchContent: HTMLDivElement;
    let results: SearchData[] = [];
    let selectedResult: HTMLAnchorElement|null = null;

    let canBeClosed: boolean = true;
    let closing: NodeJS.Timeout|null = null;

    let loading: boolean = false;
    let inputTimer: NodeJS.Timeout|null = null;

    function clear(timersOnly: boolean = false) {
        if (inputTimer) clearTimeout(inputTimer);
        if (closing) clearTimeout(closing);
        if (timersOnly) return;

        originalValue = '';
        query = '';
        results = [];
    }

    function close() {
        canBeClosed = true;
        if (closing) clearTimeout(closing);

        closing = setTimeout(() => {
            if (!canBeClosed) return;
            clear();
            open = false;
            dispatcher('close');
        }, 100);
    }

    function inputBlur() {
        dispatcher("blur", searchInput);
        close();
    }

    function inputFocus() {
        clear(true);
        open = true;

        if (query) inputUpdate();
    }

    function inputUpdate() {
        clear(true);

        loading = true;
        results = [];

        selectedId = -1;
        originalValue = searchInput?.value ?? '';

        inputTimer = setTimeout(async () => {
            results = await search(query);
            loading = false;
        }, 500);
    }
    function keydown(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedId = selectedId + 1 > (results.length - 1) ? 0 : selectedId + 1;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedId = selectedId - 1 < -1 ? results.length - 1 : selectedId - 1;
        } else if (e.key === 'Escape') {
            e.preventDefault();
            close();
        }

        selectedResult = document.querySelector<HTMLAnchorElement>(`#sr-${selectedId}`);

        if (selectedId === -1) {
            query = originalValue;
        } else {
            query = selectedResult?.getAttribute('data-name') ?? originalValue;
        }
    }

    function keyup(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedResult) selectedResult.click();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (selectedId <= -1) return;

            e.preventDefault();
            selectedResult?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }

    function searchShortcut(e: KeyboardEvent) {
        if (e.key === '/' || (e.key == 'k' && e.ctrlKey) || (!e.ctrlKey && !e.altKey && e.key.length === 1)) {
            if (document.activeElement === searchInput) return;

            e.preventDefault();

            open = true;

            setTimeout(() => {
                if (searchInput && e.key !== '/') {
                    searchInput.value = e.key;
                    originalValue = e.key;
                    query = e.key;

                    inputUpdate();
                }

                searchInput?.focus();
            }, 100);
        }
    }

    onMount(() => {
        searchInput?.focus();
        if (typeof window !== 'undefined') window.addEventListener('keypress', searchShortcut);
    });

    onDestroy(() => typeof window !== 'undefined' && window.removeEventListener('keypress', searchShortcut));
</script>

{#if open}
<div class="search-wrapper" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
    <style>
        html {
            overflow: hidden;
        }
    </style>
    <div class="search-container" bind:this={searchContainer}>
        <div class="search-content" bind:this={searchContent}>
            <div class="search-field">
                <div class="search-input">
                    <div class="search-icon">
                        <Icon icon={searchIcon}/>
                    </div>
                    <input type="search" bind:this={searchInput} bind:value={query} placeholder="Search..." autocomplete="off" on:focus={() => { clear(true); open = true; }} on:blur={inputBlur} on:input={inputUpdate} on:keydown={keydown} on:keyup={keyup}>
                    <button class="search-close" on:click={close} on:blur={inputBlur} on:focus={inputFocus}>
                        <Icon icon={closeIcon}/>
                    </button>
                    <Tooltip triggeredBy=".search-close" placement="bottom-end">Close Search</Tooltip>
                </div>
                {#if results.length}
                    <div class="search-results">
                        {#each results as result, index}
                            <a
                                href={result.href}
                                id="sr-{index}"
                                on:blur={inputBlur}
                                on:focus={() => { selectedId = index; clear(true); open = true; }}
                                on:click={() => { open = false; goto(result.href); }}
                                data-name={result.name}
                                title={(result.displayName ?? result.name) + (result.deprecated ? ' (Deprecated)' : '')}
                                class="search-result"
                                class:deprecated={result.deprecated}
                                class:active={selectedId == index}
                            >
                                {#if result.icon}
                                    <span class="icon">
                                        <Icon icon={result.icon}/>
                                    </span>
                                {/if}
                                <span class="name">{(result.displayName ?? result.name)}</span>
                            </a>
                        {/each}
                    </div>
                {:else if loading}
                    <div class="search-info">
                        <p>Loading...</p>
                    </div>
                {:else if !query}
                    <div class="search-info">
                        <p>Enter a search query</p>
                    </div>
                {:else}
                    <div class="search-info">
                        <p>No Results Found</p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <Svrollbar viewport={searchContainer} contents={searchContent} alwaysVisible={true}/>
</div>
{/if}

<style lang="scss">
    @import '../styles/variables.scss';

    .search-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba($bg, $alpha: 0.5);
        z-index: 7;

        .search-container {
            width: 100%;
            height: 100%;
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            display: block;
            text-align: center;
            @include NoScrollbar();

            .search-content {
                display: inline-flex;
                text-align: initial;
                flex-direction: column;
                align-items: center;
                width: 100%;
                max-width: 600px;
                padding: 4rem 2rem;
                margin-top: 8rem;
                padding-bottom: 2rem;

                .search-field {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    @include BorderedButton();
                    @include GlassBackdrop();

                    .search-input {
                        position: relative;
                        display: flex;
                        height: 3rem;
                        border-bottom: 1px solid $border;

                        input {
                            position: absolute;
                            height: 100%;
                            width: 100%;
                            padding: 0 3rem;
                            border: none;
                            background: none;
                            font-size: 1.1rem;
                            outline: none;
                        }

                        .search-icon,
                        .search-close {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 3rem;
                            height: 100%;
                            font-size: 1rem;
                        }

                        .search-close {
                            position: absolute;
                            top: 50%;
                            right: 0;
                            transform: translateY(-50%);
                            @include BorderedButton();
                            background: darken($border, 5);
                            height: 2em;
                            width: 2em;
                            margin-right: 0.5em;
                        }
                    }

                    .search-info,
                    .search-results {
                        padding: 1rem 0;
                    }

                    .search-info {
                        padding: 1rem;
                        text-align: center;

                        p {
                            font-weight: 500;
                            color: lighten($border, $amount: 30);
                        }
                    }

                    .search-results {
                        display: block;

                        a {
                            display: flex;
                            align-items: center;
                            width: 100%;
                            color: darken($white, $amount: 10);
                            text-decoration: none;
                            padding: 0.3rem 1rem;

                            .icon {
                                font-size: 1.2rem;
                                margin-right: 1rem;
                                flex-shrink: 0;
                            }

                            .name {
                                width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            &:hover,
                            &:focus,
                            &.active {
                                background-color: rgba(lighten($bg, $amount: 10), $alpha: 0.5);
                            }

                            &.active {
                                color: lighten($link, $amount: 10);
                            }

                            &.deprecated {
                                opacity: 0.7;
                                text-decoration: line-through;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 550px) {
        .search-wrapper {
            .search-container {
                .search-content {
                    max-width: 100%;
                    padding: 0.5rem;
                    margin-top: 0;
                }
            }
        }
    }
</style>