<script lang="ts">
    import type { PackageTagLoadData } from './+page';
    import { page } from "$app/stores";
    import Nav from '$lib/components/Nav.svelte';
    import SideBar from '$lib/components/SideBar.svelte';
    import type { DocsParser } from '$lib/scripts/classes/DocsParser';
    import { getFirstFocusableElement } from '$lib/scripts/helpers';

    $: docsData = $page.data as PackageTagLoadData & { docs: DocsParser & { data: Exclude<DocsParser['data'], undefined> } };

    let content: HTMLElement;
    $: firstElement = getFirstFocusableElement<HTMLButtonElement>(content);
</script>

<svelte:head>
    <title>{docsData.package}@{docsData.tag}</title>
</svelte:head>

<style lang="scss">
    @import '$lib/styles/variables.scss';

    .content-container {
        width: 100%;
        padding-right: 1rem;
        padding-bottom: var(--padding-bottom);

        display: flex;
        justify-content: center;

        .content {
            width: 100%;
            max-width: 1000px;
        }
    }

    .skip-navigation {
        @include BorderedButton();
        position: fixed;
        z-index: 8;
        font-weight: 500;
        font-size: 0.9rem;
        top: -100%;
        left: 0;
        margin: 1.4rem;
        border-color: $link;
        overflow: hidden;
        padding: 0.5rem 1rem;

        &:focus {
            outline: none;
            top: 0;
        }
    }
</style>

{#if firstElement}<button class="skip-navigation" on:click={() => firstElement?.focus()}>Skip navigation</button>{/if}

<Nav data={docsData}/><SideBar/>
<div class="content-container">
    <main class="content" bind:this={content}>
        <slot/>
    </main>
</div>