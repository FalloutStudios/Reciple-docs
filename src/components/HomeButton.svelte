<script lang="ts">
    export let style: 'Blue'|'Normal' = 'Normal';
</script>

<style lang="scss">
    @import '../assets/styles/variables.scss';

    a {
        position: relative;
        display: inline-block;
        padding: 0.6rem 1.2rem;
        background: $dark;
        border: 1px solid $border;
        text-decoration: none;
        border-radius: 5px;
        color: #fff;
        font-size: 1.1rem;
        font-weight: bold;

        &:hover,
        &:focus {
            background: rgba($color: $border, $alpha: 0.5);
        }

        &:focus-visible {
            outline: 4px $link solid;
        }

        &.blue {
            background: $link;
            border-color: lighten($color: $link, $amount: 3);

            &:focus-visible {
                outline-color: currentColor;
            }
        }
    }
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<a class:blue={style == 'Blue'} on:click on:focus on:blur {...$$props}><slot>Link</slot></a>