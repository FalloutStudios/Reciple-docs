<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { DocsParser } from '../scripts/classes/DocsParser';
    import { navLinks } from '../scripts/config';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
    import searchIcon from '@iconify/icons-tabler/search';

    export let data: DocsParser;
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    :root {
        --nav-height: 80px;
    }

    .nav {
        position: fixed;
        top: 0;
        left: 0;
        height: var(--nav-height);
        width: 100%;
        border-top: none;
        border-left: none;
        border-right: none;
        padding: 0.5rem;
        overflow: hidden;
        z-index: 5;

        .nav-container {
            height: 100%;
            width: 100%;
            @include BorderedButton();
            @include GlassBackdrop();
            display: flex;
            align-items: center;
            overflow: hidden;

            a {
                margin-right: 1rem;
                color: $white;
                text-decoration: none;
                white-space: nowrap;
            }

            a.nav-home {
                margin-right: 4rem;
                margin-left: 1rem;
                flex-shrink: 0;
                position: relative;
            }

            .nav-links {
                display: flex;
                width: 100%;

                a {
                    margin: 0 1rem;
                }
            }

            .search {
                display: flex;
                align-items: center;
                flex-shrink: 0;
                height: 100%;
                padding: 0 0.5rem;

                .open-search {
                    height: calc(100% - 1rem);
                    width: 300px;
                    border: none;
                    border-radius: 5px;
                    background: $bg;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    .icon {
                        font-size: 1rem;
                        padding:  0 1rem;
                        color: darken($white, $amount: 20);
                        line-height: 1;
                        flex-shrink: 0;
                    }

                    .placeholder {
                        color: darken($white, $amount: 50);
                        font-family: 'Inter', sans-serif;
                        width: 100%;
                        font-size: 0.9rem;
                        font-weight: 500;
                        text-align: left;
                    }

                    .key {
                        height: 1.8rem;
                        width: 1.8rem;
                        line-height: 1.8;
                        padding-top: 1px;
                        margin: 0.6rem;
                        flex-shrink: 0;
                        @include BorderedButton();
                        color: darken($white, $amount: 20);
                    }
                }
            }
        }
    }
</style>

<div class="nav">
    <style>
        body {
            padding-top: var(--nav-height);
        }

        html,
        body {
            scroll-padding-top: var(--nav-height);
        }
    </style>
    <div class="nav-container">
        <a href="/docs/{data.options.package}/{data.currentTag}" class="nav-home">
            {data.options.package}@{data.currentTag}
        </a>
        <div class="nav-links">
            {#if navLinks.length}
                {#each navLinks as link}
                    <a href={link.href} target={link.blank ? "_blank" : null} class:canbehidden={link.blank}>
                        {link.name} {#if link.blank}<Icon icon={externalLinkIcon}/>{/if}
                    </a>
                {/each}
            {/if}
        </div>
        <div class="search">
            <button class="open-search">
                <span class="icon">
                    <Icon icon={searchIcon} class="icon"/>
                </span>
                <span class="placeholder">
                    Search...
                </span>
                <span class="key">/</span>
            </button>
        </div>
    </div>
</div>