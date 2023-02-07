<script lang="ts">
    import Icon from '@iconify/svelte';
    import HomeButton from './HomeButton.svelte';

    export let values: { value: string; href: string; selected?: boolean; }[];
    export let icon: string = '';
    export let id: string;

    $: selected = values.find(v => v.selected) ?? values[0];

    let isClosed: boolean = true;
    let notFocused: boolean = true;
    let closing: NodeJS.Timer|null = null;

    $: isClosed, notFocused, closing;

    export function changeSelected(value: typeof values[0]) {
        selected = value;
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
            console.log(notFocused);
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
            padding: 0.4rem 1.5rem;
            display: flex;
            align-items: center;
            vertical-align: middle;

            :global(.icon) {
                font-size: 1.4rem;
                margin-right: 1rem;
                flex-shrink: 0;
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
        <span class="selected">{@html selected.value}</span>
        {#if isClosed}
            <Icon icon="ph:caret-down" />
        {:else}
            <Icon icon="ph:caret-up" />
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
                class:selected={selected.value === val.value}
                tabindex={selected.value === val.value ? -1 : null}
            >{val.value}</a>
        {/each}
    </div>
</div>