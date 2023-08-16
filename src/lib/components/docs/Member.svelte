<script lang="ts">
    export let hr: boolean;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .member {
        display: block;
        margin-bottom: 1rem;
        line-height: 0.8rem;

        :global(.header) {
            font-size: 1.1rem;
            margin: 0.5rem 0;
        }

        :global(.pills) {
            margin-bottom: 1rem;
            display: flex;
        }

        :global(.label) {
            font-size: 1rem;
        }

        :global(.member-labels .label) {
            margin-top: 0.5rem;
        }

        :global(.accordion-container) {
            margin-top: 0.5rem;

            > :global(.accordion .accordion-content) {
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
        }

        .content {
            :global(.markdown) {
                font-size: 0.95rem !important;
                line-height: 0.9rem !important;
            }
        }
    }
</style>

<div class="member">
    {#if hr}<hr>{/if}
    <div class="content">
        <slot/>
    </div>
</div>