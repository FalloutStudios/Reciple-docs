<script lang="ts">
    import { Svrollbar } from 'svrollbar';
    import LinkDropdown from './LinkDropdown.svelte';
    import { packages } from '../scripts/packages';
    import SidebarCategory from './SidebarCategory.svelte';
    import type { PackageTagLoadData } from '../../routes/docs/[package]/[tag]/+page';
    import { page } from '$app/stores';
    import { isElementDeprecated } from '../scripts/helpers';
    import packageBold from '@iconify/icons-ph/package-bold';
    import versionsIcon from '@iconify/icons-tabler/versions';
    import fileIcon from '@iconify/icons-codicon/file';
    import symbolClassIcon from '@iconify/icons-codicon/symbol-class';
    import symbolEmunIcon from '@iconify/icons-codicon/symbol-enum';
    import symbolInterfaceIcon from '@iconify/icons-codicon/symbol-interface';
    import symbolRulerIcon from '@iconify/icons-codicon/symbol-ruler';
    import symbolMethodIcon from '@iconify/icons-codicon/symbol-method';
    import symbolFieldIcon from '@iconify/icons-codicon/symbol-field';
    import { onDestroy, onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { beforeNavigate } from '$app/navigation';
    import '$lib/styles/sidebar.scss';

    $: data = $page.data as PackageTagLoadData;

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

<div class="sidebar-container" class:mobile={width < 900}>
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
        <div class="sidebar-viewport" transition:fly={{ x: 900, duration: width < 900 ? 300 : 0, opacity: 1 }}>
            <div class="sidebar" bind:this={sidebar}>
                <div class="sidebar-content" bind:this={sidebarcontent}>
                    <div class="sidebar-options">
                        <LinkDropdown icon={packageBold} items={packages.map(p => ({ name: p, href: `/docs/${p}`, selected: p === data.docs.options.package }))}>{data.docs.options.package}</LinkDropdown>
                        <LinkDropdown icon={versionsIcon} items={data.docs.tags.map(t => ({ name: t, href: `/docs/${data.docs.options.package}/${t}`, selected: t === data.docs.currentTag }))}>{data.docs.currentTag}</LinkDropdown>
                    </div>
                    <div class="sidebar-links">
                        {#if data.docs.customPages.size}
                            {#each data.docs.customPages as [name, pages]}
                                <SidebarCategory
                                    name={name}
                                    icon={fileIcon}
                                    data={pages.map(p => {
                                        const selected = data.page && data.page?.category === name && data.page?.id === p.id;

                                        return {
                                            name: p.name,
                                            href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/pages/${name}:${p.id}`,
                                            selected
                                        };
                                    })}
                                    open={!!data.page && data.page?.category === name}
                                />
                            {/each}
                        {/if}
                        {#if data.docs.data?.classes.length}
                            <SidebarCategory
                                name="Classes"
                                icon={symbolClassIcon}
                                data={data.docs.data?.classes.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/classes:${c.name}`, deprecated: isElementDeprecated(c), selected: c.id === data.selected }))}
                            />
                        {/if}
                        {#if data.docs.data?.functions.length}
                            <SidebarCategory
                                name="Functions"
                                icon={symbolMethodIcon}
                                data={data.docs.data?.functions.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/functions:${c.name}`, deprecated: isElementDeprecated(c), selected: c.id === data.selected }))}
                            />
                        {/if}
                        {#if data.docs.data?.variables.length}
                            <SidebarCategory
                                name="Variables"
                                icon={symbolFieldIcon}
                                data={data.docs.data?.variables.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/variables:${c.name}`, deprecated: isElementDeprecated(c), selected: c.id === data.selected }))}
                            />
                        {/if}
                        {#if data.docs.data?.enums.length}
                            <SidebarCategory
                                name="Enums"
                                icon={symbolEmunIcon}
                                data={data.docs.data?.enums.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/enums:${c.name}`, deprecated: isElementDeprecated(c), selected: c.id === data.selected }))}
                            />
                        {/if}
                        {#if data.docs.data?.interfaces.length}
                            <SidebarCategory
                                name="Interfaces"
                                icon={symbolInterfaceIcon}
                                data={data.docs.data?.interfaces.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/interfaces:${c.name}`, deprecated: isElementDeprecated(c), selected: c.id === data.selected }))}
                            />
                        {/if}
                        {#if data.docs.data?.typeAliases.length}
                            <SidebarCategory
                                name="Types"
                                icon={symbolRulerIcon}
                                data={data.docs.data?.typeAliases.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/typeAliases:${c.name}`, deprecated: isElementDeprecated(c), selected: c.id === data.selected }))}
                            />
                        {/if}
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