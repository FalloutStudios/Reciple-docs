<script lang="ts">
    import Icon from '@iconify/svelte';
    import HomeButton from './HomeButton.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let values: { value: string; href: string; selected?: boolean; }[];
    export let icon: string = '';
    export let id: string;

    $: selected = values.find(v => v.selected) ?? values[0] as typeof values[0]|undefined;

    let isClosed: boolean = true;
    let notFocused: boolean = true;
    let closing: NodeJS.Timer|null = null;

    export function changeSelected(value: typeof values[0]) {
        selected = value;
        isClosed = true;
        dispatch('change', {
            value: value.value
        });
    }

    export function openDropdown() {
        if (closing) clearTimeout(closing);

        isClosed = false;
        notFocused = false;
    }

    export function closeDropdown() {
        if (closing) clearTimeout(closing);

        notFocused = true;

        closing = setTimeout(() => {
            if (notFocused) isClosed = true;
        }, 500);
    }
</script>

<style lang="scss">
    .dropdown {
        position: relative;
        display: flex;
        flex-direction: column;

        :global(.selector) {
            padding: 0.4rem 1rem;
            display: flex;
            align-items: center;
            vertical-align: middle;

            :global(.icon) {
                font-size: 1.4rem;
                margin-right: 1rem;
                flex-shrink: 0;
            }

            :global(.arrow) {
                font-size: 1.5rem;
            }

            :global(.selected) {
                width: 100%;
            }
        }

        .selections {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 0.2rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            z-index: 5;
            padding: 5px 0;
            border-radius: 5px;
            background: rgba(34, 34, 34, 1.0);
            border: 1px solid rgba(60, 60, 60, 1.0);

            a {
                padding: 10px;
                text-decoration: none;
                font-weight: 500;
                color: currentColor;

                &:hover,
                &:focus {
                    background: rgb(53, 53, 53);
                }

                &.selected {
                    color: #5865f2;
                }
            }
        }
    }

    .dropdown.closed {
        .selections {
            display: none;
        }
    }
</style>

<div class="dropdown" {...$$props} class:closed={isClosed}>
    <HomeButton
        class="selector"
        href="javascript:void(0)"
        id={id}
        on:blur={closeDropdown}
        on:click={(() => isClosed = !isClosed)}
    >
        {#if icon}<Icon {icon} class="icon"/>{/if}
        <span class="selected">{@html selected?.value ?? 'No chosen option'}</span>
        {#if isClosed}
            <Icon icon="ph:caret-down" class="arrow"/>
        {:else}
            <Icon icon="ph:caret-up" class="arrow"/>
        {/if}
    </HomeButton>
    <div class="selections">
        {#each values as val}
            <a
                class="select-option"
                href={val.href}
                on:focus={openDropdown}
                on:blur={closeDropdown}
                on:click={() => changeSelected(val)}
                class:selected={selected?.value === val.value}
                tabindex={selected?.value === val.value ? -1 : null}
            >{val.value}</a>
        {/each}
    </div>
</div>