<script lang="ts">
    import type { IconifyIcon } from '@iconify/svelte';
    import caretDownIcon from '@iconify/icons-ph/caret-down';
    import listSelection from '@iconify/icons-codicon/list-selection';
    import Icon from '@iconify/svelte';
    import { slide } from 'svelte/transition';

    export let name: string;
    export let icon: string|IconifyIcon = listSelection;
    export let open: boolean = true;
    export let hr: boolean = true;
    export let id: string|null = null;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .accordion-container {
        width: 100%;
        position: relative;
        margin-bottom: 1rem;

        .accordion {
            display: block;

            > .accordion-header {
                position: relative;
                border-radius: 5px;
                background: $dark;
                border: none;
                width: 100%;
                padding: 1rem;
                color: $white;
                font-size: 1rem;
                font-weight: bold;
                text-align: left;
                display: flex;
                align-items: center;
                z-index: 1;
                display: flex;

                .name {
                    width: 100%;
                    font-size: 1em;
                }

                .icon,
                > .caret {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 1rem;
                    font-size: 1.4em;
                    flex-shrink: 0;
                }

                > .caret {
                    margin-right: 0;
                    margin-left: 1rem;
                    @include Transition();
                }
            }

            .accordion-content {
                position: relative;
                padding: 0.5rem;
                margin-left: 2.8rem;
                margin-right: 2.8rem;
                margin-bottom: 2rem;

                &.hr {
                    border-bottom: 1px solid rgba($border, $alpha: 0.5);
                }
            }

            &.active {
                > .accordion-header .caret {
                    rotate: 180deg;
                }
            }
        }
    }

    @media (max-width: 710px) {
        .accordion-container {
            .accordion {
                .accordion-content {
                    margin-left: 0;
                    margin-right: 0;
                }
            }
        }
    }
</style>

<div class="accordion-container" {id}>
    <div class="accordion" class:active={open}>
        <button class="accordion-header" on:click={() => open = !open}>
            <span class="icon"><Icon {icon}/></span>
            <span class="name">{name}</span>
            <span class="caret"><Icon icon={caretDownIcon}/></span>
        </button>
        {#if open}
            <div class="accordion-content" class:hr={hr} transition:slide={{ axis: "y", duration: 300, delay: 1 }}><slot/></div>
        {/if}
    </div>
</div>