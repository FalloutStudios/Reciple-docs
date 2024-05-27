<script lang="ts">
    import Icon from '@iconify/svelte';
    import { navLinks } from '../scripts/config';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
    import searchIcon from '@iconify/icons-tabler/search';
    import Search from './Search.svelte';
    import type { PackageTagLoadData } from '../../routes/docs/[package]/[tag]/+page';
    import type { DocsParser } from '../scripts/classes/DocsParser';
    import '$lib/styles/nav.scss';

    export let data: PackageTagLoadData & { docs: DocsParser & { data: Exclude<DocsParser['data'], undefined> } };

    let opensearch = false;
    let searchInput: HTMLInputElement|null;

    function openSearch() {
        opensearch = true;

        setTimeout(() => searchInput?.focus(), 100);
    }
</script>

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
        <a href="/docs/{data.package}/{data.tag}" class="nav-home">{data.package.replaceAll('-',' ')}<span class="tag"><span class="separator">/</span>{data.tag}</span></a>
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
            <button class="open-search" on:click={openSearch}>
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
{#if data?.docs.data}
    <Search docs={data} bind:searchInput={searchInput} bind:open={opensearch}/>
{/if}