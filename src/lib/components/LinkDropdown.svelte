<script lang="ts">
    import Icon from '@iconify/svelte';
    import { Dropdown, DropdownItem } from 'flowbite-svelte';

    export let items: { name: string; href: string; blank?: boolean; selected?: boolean; }[];
    export let icon: string|null = null;

    let open: boolean = false;
    let width: number;
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    .dropdown {
        display: inline-block;

        button {
            @include BorderedButton($dark);
            width: 100%;
            position: relative;
            padding: 0.6rem 1.2rem;
            color: $white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: bold;
            text-align: left;
            display: flex;
            align-items: center;
            z-index: 1;

            &:hover,
            &:focus {
                background: lighten($dark, $amount: 2);
            }

            &:focus-visible {
                outline: 4px $link solid;
            }

            .content {
                width: 100%;
            }

            .icon,
            .caret {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 1rem;
                font-size: 1.3em;
                flex-shrink: 0;
            }

            .caret {
                margin-right: 0;
                margin-left: 1rem;
                @include Transition();

                &.active {
                    rotate: 180deg;
                }
            }
        }

        :global(.items) {
            @include BorderedButton();

            :global(li) {
                list-style: none;
            }

            :global(.item) {
                display: block;
                color: $white;
                width: 100%;
                padding: 0.5rem 1rem;
                text-decoration: none;
                text-align: left;
                background: none;
                border: none;
                font-size: 1em;

                &:hover,
                &:focus {
                    background: rgba($border, $alpha: 0.2);
                }

                &:is([data-selected="true"]) {
                    cursor: default;
                    color: lighten($link, $amount: 10);
                    font-weight: 600;
                }
            }
        }
    }
</style>

<div class="dropdown">
    <button bind:clientWidth={width} type="button">
        {#if icon}
            <span class="icon"><Icon {icon}/></span>
        {/if}
        <span class="content"><slot/></span>
        <span class="caret" class:active={!open}><Icon icon="ph:caret-up"/></span>
    </button>
    <Dropdown class="items" style="width: {width + 2}px; z-index: 5;" bind:open={open}>
        {#each items as item}
            <DropdownItem defaultClass="item" href={item.selected ? undefined : item.href} data-selected={item.selected} target={item.blank ? "_blank" : null}>
                {item.name} {#if item.blank}<Icon icon="mingcute:external-link-line"/>{/if}
            </DropdownItem>
        {/each}
    </Dropdown>
</div>