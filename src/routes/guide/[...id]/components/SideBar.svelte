<script lang="ts">
    import '$lib/styles/sidebar.scss';
    import { beforeNavigate } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { Svrollbar } from 'svrollbar';
    import SidebarCategory from '$lib/components/SidebarCategory.svelte';
    import fileIcon from '@iconify/icons-codicon/file';
    import { page } from '$app/stores';

    export let pages: { category: string; pages: string[] }[] = [];

    $: currentPage = { category: $page.data.category, id: $page.data.id };
    let width: number = 0;
    let sidebar: HTMLDivElement;
    let sidebarcontent: HTMLDivElement;
    let open: boolean = false;

    function onResize() {
        open = window.innerWidth !== width ? false : open;
        width = window.innerWidth;
    }

    beforeNavigate(() => open = false);

    onMount(() => {
        if(typeof window !== 'undefined') window.addEventListener('resize', onResize);
        onResize();
    });

    onDestroy(() => {
        if(typeof window !== 'undefined') window.removeEventListener('resize', onResize);
    });
</script>

<div class="sidebar-container">
    {#if width > 900}
    <style>
        body {
            padding-left: calc(var(--sidebar-width) + 1rem);
        }
    </style>
    {:else}
    <style>
        body {
            padding-left: 1rem;
        }

        :root {
            --padding-bottom: 5rem;
        }
    </style>
    {/if}
    {#if open || width > 900}
        {#if width < 900}
            <style>
                html {
                    overflow: hidden;
                }
            </style>
        {/if}
        <div class="sidebar-viewport" transition:fly={{ x: 900, duration: width < 900 ? 300 : 0 }}>
            <div class="sidebar" bind:this={sidebar}>
                <div class="sidebar-content" bind:this={sidebarcontent}>
                    <div class="sidebar-links">
                        {#each pages as page}
                            <SidebarCategory
                                name={page.category}
                                icon={fileIcon}
                                data={page.pages.map(p => ({
                                    name: p,
                                    href: `/guide/${page.category}/${p}`,
                                    selected: currentPage.category === page.category && currentPage.id === p
                                }))}
                            />
                        {/each}
                    </div>
                </div>
            </div>
            <Svrollbar viewport={sidebar} contents={sidebarcontent} margin={{top: 2, buttom: 2}}/>
        </div>
    {/if}
</div>

{#if width < 900}
<div class="mobile-button" class:active={open}>
    <button on:click={() => open = !open}>
        <span class="icon"></span>
    </button>
</div>
{/if}