<script lang="ts">
    import Icon from '@iconify/svelte';
    import { navLinks } from '../scripts/config';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
    import searchIcon from '@iconify/icons-tabler/search';
    import Search from './Search.svelte';
    import type { PackageTagLoadData } from '../../routes/docs/[package]/[tag]/+page';
    import type { DocsParser } from '../scripts/classes/DocsParser';
    import '$lib/styles/nav.scss';
    import { deprecatedElementSorter, getElementDisplayName, getElementHref, getElementIcon, isElementDeprecated } from '../scripts/helpers';

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
    <Search
        bind:searchInput={searchInput}
        bind:open={opensearch}
        search={async query => {
            const results = query.trim() ? (data.docs.data?.search(query).sort(deprecatedElementSorter).splice(0, 20) ?? []) : [];

            return results.map(result => {
                const { name, displayName } = getElementDisplayName(data.docs.data, result);

                return {
                    name,
                    displayName,
                    icon: getElementIcon(result),
                    deprecated: 'comment' in result || 'signatures' in result ? isElementDeprecated(result) : false,
                    href: getElementHref(data, result)
                };
            });
        }}
    />
{/if}