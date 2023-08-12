<script lang="ts">
    import { Svrollbar } from 'svrollbar';
    import LinkDropdown from './LinkDropdown.svelte';
    import { packages } from '../scripts/packages';
    import SidebarCategory from './SidebarCategory.svelte';
    import type { PackageTagLoadData } from '../../routes/docs/[package]/[tag]/+page';
    import { page } from '$app/stores';

    $: data = $page.data as PackageTagLoadData;

    let sidebar: HTMLDivElement;
    let sidebarcontent: HTMLDivElement;
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    :root {
        --sidebar-width: 320px;
    }

    .sidebar-container {
        position: fixed;
        top: 0;
        left: 0;
        padding: 0.5rem;
        padding-top: var(--nav-height);
        height: 100%;
        width: var(--sidebar-width);
        z-index: 4;

        .sidebar-viewport {
            height: 100%;
            width: 100%;
            @include BorderedButton();
            @include GlassBackdrop();

            .sidebar {
                height: 100%;
                width: 100%;
                position: relative;
                @include NoScrollbar();
                overflow-y: auto;
                overflow-x: hidden;
            }

            .sidebar-content {
                height: 100%;
                padding-right: 0.5rem;

                .sidebar-options {
                    width: 100%;
                    border-bottom: 1px solid rgba($border, $alpha: 0.5);
                    padding-bottom: .5rem;
                    margin-bottom: 1rem;

                    :global(.dropdown) {
                        width: 100%;
                        margin-bottom: 0.5rem;
                    }
                }
            }
        }
    }
</style>

<div class="sidebar-container">
    <style>
        body {
            padding-left: var(--sidebar-width);
        }
    </style>
    <div class="sidebar-viewport">
        <div class="sidebar" bind:this={sidebar}>
            <div class="sidebar-content" bind:this={sidebarcontent}>
                <div class="sidebar-options">
                    <LinkDropdown icon="ph:package-bold" items={packages.map(p => ({ name: p, href: `/docs/${p}`, selected: p === data.docs.options.package }))}>{data.docs.options.package}</LinkDropdown>
                    <LinkDropdown icon="tabler:versions" items={data.docs.tags.map(t => ({ name: t, href: `/docs/${data.docs.options.package}/${t}`, selected: t === data.docs.currentTag }))}>{data.docs.currentTag}</LinkDropdown>
                </div>
                <div class="sidebar-links">
                    {#if data.docs.data?.classes.length}
                        <SidebarCategory
                            name="Classes"
                            icon="codicon:symbol-class"
                            data={data.docs.data?.classes.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/classes:${c.name}`, selected: c.id === data.selected }))}
                        />
                    {/if}
                    {#if data.docs.data?.functions.length}
                        <SidebarCategory
                            name="Functions"
                            icon="codicon:symbol-method"
                            data={data.docs.data?.functions.map(c => ({ name: c.name, href: `/docs/${data.docs.options.package}/${data.docs.currentTag}/functions:${c.name}`, selected: c.id === data.selected }))}
                        />
                    {/if}
                </div>
            </div>
        </div>
        <Svrollbar viewport={sidebar} contents={sidebarcontent} margin={{top: 2, buttom: 2}}/>
    </div>
</div>