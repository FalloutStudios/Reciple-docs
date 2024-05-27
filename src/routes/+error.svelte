<script lang="ts">
    import { page } from '$app/stores';
    import caretLeftIcon from '@iconify/icons-ph/caret-left-bold';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let code = $page.status;
    let message = $page.error?.message ?? '';

    $: previewsPages = 0;

    onMount(() => previewsPages = history.length - 1);
</script>

<style lang="scss">
    @import '$lib/styles/variables.scss';

    .container {
        height: 100%;
        width: 100%;
        display: block;
        position: relative;
        overflow: hidden;

        .error {
            text-align: center;
            width: 100%;
            @include AbsoluteCenter();

            h1 {
                position: fixed;
                font-size: 60vw;
                color: rgba($link, $alpha: 0.2);
                @include AbsoluteCenter();
                z-index: -1;
            }

            h3 {
                font-size: 3rem;
                font-weight: 700;
                width: calc(100% - 2rem);
                margin: 1rem;
            }

            button {
                @include BorderedButton($link, lighten($link, $amount: 3));
                padding: 0.5rem 1rem;
                font-weight: 600;
                cursor: pointer;
                font-size: 1.1rem;
            }
        }
    }
</style>

<div class="container">
    <div class="error">
        <h1>{code}</h1>
        <h3>{message}</h3>
        {#if previewsPages > 0}
            <button class="blue" on:click={() => history.back()}>
                <Icon icon={caretLeftIcon} inline={true}/> Back
            </button>
        {:else}
            <button class="blue" on:click={() => goto('/')}>
                <Icon icon={caretLeftIcon} inline={true}/> Home
            </button>
        {/if}
    </div>
</div>