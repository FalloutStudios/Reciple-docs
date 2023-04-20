<script lang="ts">
    import { githubHome } from '../scripts/data';
    import Icon from '@iconify/svelte';
    import type { DocsData } from '../data/DocsData';
    import SearchBar from './SearchBar.svelte';

    export let title = '';
    export let docs: DocsData;
    export let isSearchOpen = false;
</script>

<style lang="scss">
    @import '../assets/styles/variables.scss';

    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba($color: $bg, $alpha: 0.8);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid $border;
        height: 4rem;
        z-index: 10;

        .nav-container {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.5rem 2rem;

            .nav-title {
                margin-right: 4rem;
                font-weight: 500;
            }

            .nav-links {
                display: flex;
                align-items: center;
                flex-shrink: 0;

                a {
                    color: $white;
                    text-decoration: none;
                    padding: 1rem 2rem;
                    border-radius: 5px;
                    margin: 0 2px;

                    &:focus-visible {
                        background: rgba($color: $border, $alpha: 0.4);
                        outline: none;
                    }

                    &:first-child {
                        margin-left: 0;
                    }

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            .nav-whitespace {
                width: 100%;
                flex-shrink: 1;
            }

            .nav-utils {
                flex-shrink: 0;

                .nav-search {
                    border: 1px solid $border;
                    background: darken($color: $bg, $amount: 1);
                    color: $white;
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 200px;

                    .placeholder {
                        width: 100%;
                        opacity: 0.5;
                        font-size: 1rem;
                        padding-left: 1rem;
                        text-align: left;
                    }

                    .key {
                        height: 1.8em;
                        width: 1.8em;
                        flex-shrink: 0;
                        color: #c5c5c5;
                        line-height: 1.8em;
                        border-radius: 3px;
                        border: 1px solid $border;
                    }
                }

                @media (max-width: 1080px) {
                    .nav-search {
                        width: 2rem;
                        height: 2rem;
                        padding: 0;
                        display: block;
                        border: none;
                        background: none;

                        &:hover,
                        &:focus {
                            background: rgba($color: $border, $alpha: 0.4);
                        }

                        .icon {
                            font-size: 1.2rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                            height: 100%;
                            width: 100%;
                        }

                        .placeholder,
                        .key {
                            display: none;
                        }
                    }
                }
            }
        }

        @media (max-width: 900px) {
            .nav-container {
                padding: 0.5rem 1.5rem;

                .nav-title {
                    display: none;
                }

                .nav-links {
                    a {
                        padding: 0;
                        margin-right: 1rem;

                        &:focus-visible {
                            background: none;
                            border-radius: 3px;
                            outline: 4px solid $white;
                        }
                    }

                    @media (max-width: 515px) {
                        a.canbehidden {
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>

<div class="nav">
    <style>
        body {
            padding-top: 4rem;
        }

        body,
        html {
            scroll-padding-top: 6rem;
            scroll-behavior: smooth;
        }
    </style>
    <div class="nav-container">
        {#if title}
            <div class="nav-title">{title}</div>
        {/if}
        <div class="nav-links">
            <a href="/">Reciple</a>
            <a href="/docs">Documentation</a>
            <a class="canbehidden" href={githubHome} target="_blank noreferrer">GitHub <Icon icon="mingcute:external-link-line"/></a>
            <a class="canbehidden" href="https://discord.js.org/docs" target="_blank noreferrer">Discord.js <Icon icon="mingcute:external-link-line"/></a>
        </div>
        <div class="nav-whitespace"></div>
        <div class="nav-utils">
            <button class="nav-search" on:click={() => isSearchOpen = !isSearchOpen}>
                <span class="icon">
                    <Icon icon="uil:search" class="icon"/>
                </span>
                <span class="placeholder">
                    Search...
                </span>
                <span class="key">/</span>
            </button>
        </div>
    </div>
</div>
<SearchBar {docs} isOpen={isSearchOpen} on:close={() => isSearchOpen = false}/>