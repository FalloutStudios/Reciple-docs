<script lang="ts">
    export let hr: boolean;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .member {
        display: block;
        margin-bottom: 1rem;
        line-height: 0.8rem;

        :global(.content) {
            opacity: 0.9;
        }

        :global(.header) {
            font-size: 1.1rem;
            margin: 1rem 0;
        }

        :global(.label) {
            font-size: 1rem;
        }

        :global(.member-labels .label) {
            margin-top: 0.5rem;
        }

        :global([label="@deprecated"]),
        &:global(.deprecated) {
            color: $danger;
        }
    }
</style>

<div class="member">
    {#if hr}<hr>{/if}
    <div class="content">
        <slot/>
    </div>
</div>