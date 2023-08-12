<script lang="ts">
    import Icon from '@iconify/svelte';

    export let name: string;
    export let icon: string;
    export let open: boolean = true;

    export let data: { name: string; href: string; selected?: boolean; }[] = [];
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    .sidebar-category {
        display: block;
        width: 100%;

        .category-topbar {
            border-radius: 5px;
            background: none;
            border: none;
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
            display: flex;

            &:hover,
            &:focus {
                background: lighten($dark, $amount: 2);
            }

            &:focus-visible {
                outline: 4px $link solid;
            }

            .name {
                width: 100%;
                font-size: 1em;
            }

            .icon,
            :global(.caret) {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 1rem;
                font-size: 1.3em;
                flex-shrink: 0;
            }

            :global(.caret) {
                margin-right: 0;
                margin-left: 1rem;
                @include Transition();
            }
        }

        .category-content {
            display: none;
            padding-left: 1.8rem;

            a {
                display: block;
                border-left: 1px solid $border;
                padding: 8px;
                padding-left: 1.5rem;
                font-size: 0.9rem;
                text-decoration: none;
                color: $white;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;

                &:hover,
                &:focus {
                    background: lighten($dark, $amount: 2);
                }

                &.selected {
                    color: $link;
                    border-color: currentColor;
                    font-weight: bold;
                }
            }
        }

        &.active {
            .category-topbar :global(.caret) {
                rotate: 180deg;
            }

            .category-content {
                display: block;
            }
        }
    }
</style>

<div class="sidebar-category" class:active={open}>
    <button class="category-topbar" on:click={() => open = !open}>
        <span class="icon"><Icon {icon}/></span>
        <span class="name">{name}</span>
        <span class="caret"><Icon icon="ph:caret-up"/></span>
    </button>
    <div class="category-content">
        {#each data as element}
            <a href={element.href} title={element.name} class:selected={element.selected}>{element.name}</a>
        {/each}
    </div>
</div>