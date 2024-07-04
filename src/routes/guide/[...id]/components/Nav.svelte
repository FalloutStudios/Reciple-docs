<script lang="ts">
    import { page } from '$app/stores';
    import '$lib/styles/nav.scss';
    import Icon from '@iconify/svelte';
    import searchIcon from '@iconify/icons-tabler/search';
    import { navLinks } from '$lib/scripts/config';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
    import Search from '$lib/components/Search.svelte';
    import type { Guides } from '../../../api/guides/+server';
    import type { SearchData } from '../../../../lib/scripts/types';
    import { slug } from 'github-slugger';
    import Uwuify from 'uwuifier';


    let opensearch = false;
    let searchInput: HTMLInputElement|null;
    let guideData: Guides|null = null;

    const uwu = new Uwuify();

    function openSearch() {
        opensearch = true;
        setTimeout(() => searchInput?.focus(), 100);
    }

    async function search(query: string): Promise<SearchData[]> {
        let catYes = false;

        if (query.startsWith('cat++')) {
            catYes = true;
            query = query.substring(5);
        }

        guideData ??= await fetch('/api/guides').then(res => res.json());

        return (guideData ?? [])
            .map(g => g.pages).flat()
            .filter(p => 
                p.category.toLowerCase().includes(query.toLowerCase()) ||
                (p.metadata.title && p.metadata.title?.toLowerCase().includes(query.toLowerCase())) ||
                (p.metadata.description && p.metadata.description?.toLowerCase().includes(query.toLowerCase())) ||
                (p.metadata.keywords && p.metadata.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase())))
            )
            .map(p => ({
                name: p.metadata.title ?? p.id,
                displayName: p.metadata.title && catYes ? uwu.uwuifyWords(p.metadata.title) : p.metadata.title,
                href: `/guide/${slug(p.category)}/${p.id}`,
                icon: catYes ? 'fluent-emoji:cat-face' : 'lucide:book-marked'
            }));
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
        <a href="/guide" class="nav-home">Guide<span class="tag" style="text-transform: capitalize;"><span class="separator">/</span>{$page.data.categoryName}</span></a>
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
<Search
    bind:searchInput={searchInput}
    bind:open={opensearch}
    {search}
/>