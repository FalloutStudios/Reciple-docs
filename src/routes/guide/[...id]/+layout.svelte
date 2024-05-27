<script lang="ts">
    import { page } from '$app/stores';
    import { getFirstFocusableElement } from '$lib/scripts/helpers';
    import { onMount } from 'svelte';
    import Sidebar from './components/SideBar.svelte';
    import Nav from './components/Nav.svelte';
    import FooterPagination from './components/FooterPagination.svelte';

    export let data;

    let content: HTMLElement;
    let firstElement: undefined|HTMLButtonElement;

    onMount(() => {
        firstElement = getFirstFocusableElement<HTMLButtonElement>(content);
    });
</script>

<svelte:head>
    <title>Reciple Guide | {$page.data.metadata.title}</title>
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

{#if firstElement}<button class="skip-navigation" on:click={() => firstElement?.focus()}>Skip to navigation</button>{/if}

<Nav/><Sidebar bind:pages={data.guides}/>
<div class="content-container">
    <main class="content" bind:this={content}>
        <slot/>
        <FooterPagination bind:guides={data.guides} pagination={$page.data.pagination}/>
    </main>
</div>