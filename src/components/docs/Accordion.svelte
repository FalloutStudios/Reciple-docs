<script lang="ts">
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import HomeButton from "../HomeButton.svelte";

    export let selectedValue: string|null = null;
    export let icon: string|null = '';
    export let label: string;

    export let contents: { value: string; href: string; element?: Element }[] = [];
    export let isClosed: boolean = false;

    function scrollIntoView(element: Element) {
        element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
    }

    onMount(() => {
        setTimeout(() => {
            let selected = contents.find(e => e.value === selectedValue);
            if (selected?.element) scrollIntoView(selected?.element);
        }, 500);
    });

</script>

<style lang="scss">
    .accordion {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;

        :global(.toggle) {
            padding: 0.4rem 1rem;
            display: flex;
            align-items: center;
            vertical-align: middle;

            :global(.label) {
                width: 100%;
            }

            :global(.icon) {
                font-size: 1.4rem;
                margin-right: 1rem;
                flex-shrink: 0;
            }

            :global(.arrow) {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
        }

        .contents {
            position: relative;
            display: flex;
            flex-direction: column;

            a {
                padding: 0.4rem;
                padding-left: 1.7rem;
                margin-left: 1.7rem;
                border-left: 1px solid #3c3c3c;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #fff;
                text-decoration: none;
                font-size: 0.9rem;

                &.selected {
                    color: #5865f2;
                    font-weight: 500;
                    border-color: currentColor;
                }

                &:focus-visible {
                    outline: 4px solid #5865f2;
                    border-radius: 3px;
                }

                &:hover {
                    background: #3c3c3c;
                }
            }
        }
    }

    .accordion.closed {
        .contents {
            display: none;
        }
    }
</style>

<div class="accordion" class:closed={isClosed}>
    <HomeButton class="toggle" href="javascript:void(0)" on:click={(() => isClosed = !isClosed)}>
        {#if icon}
            <span class="icon-container">
                <Icon {icon} class="icon"/>
            </span>
        {/if}
        <span class="label">
            {label}
        </span>
        <span class="arrow-container">
            {#if isClosed}
                <Icon icon="ph:caret-down" />
            {:else}
                <Icon icon="ph:caret-up" />
            {/if}
        </span>
    </HomeButton>
    <div class="contents">
        {#each contents.sort((a, b) => a.value.toLowerCase() < b.value.toLowerCase() ? -1 : 1) as content}
            <a href={content.href} class="content" class:selected={content.value === selectedValue}  title={content.value} bind:this={content.element}>{content.value}</a>
        {/each}
    </div>
</div>