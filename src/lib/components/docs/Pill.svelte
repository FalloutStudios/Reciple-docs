<script lang="ts">
    import { Colors } from '../../scripts/config';

    export let color: string|Colors = Colors.WHITE;
    export let backgroundColor: string|Colors = Colors.LINK;
</script>

<style lang="scss">
    .pill {
        display: inline-block;
        height: 1.5em;
        line-height: 1em;
        padding: 0.2em 0.8em;
        border-radius: 1em;
        font-weight: 500;
        font-size: 0.9rem;
        text-transform: uppercase;
        margin: 0 0.2rem;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }
    }
</style>

<span class="pill" style="background: {backgroundColor}; color: {color};"><slot/></span>