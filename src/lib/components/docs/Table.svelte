<style lang="scss">
    @import '../../styles/variables.scss';

    .table {
        overflow: auto;
        width: 100%;

        table {
            width: 100%;
            border-spacing: 0;

            :global(tr) {
                :global(td), :global(th) {
                    padding: 0.7rem 1rem;
                    border-top: 1px solid $border;
                    font-size: 0.85rem;
                    text-align: left;
                }

                :global(th.table-header) {
                    font-weight: bold;
                    font-size: 1rem;
                    border-top: none;
                }

                :global(td) {
                    @include WordWrap();
                    max-width: 300px;

                    :global(a) {
                        color: $link;
                        text-decoration: none;
                    }

                    :global(.table-text),
                    :global(.table-code) {
                        display: block;
                        font-family: 'Roboto Mono', monospace;
                    }

                    :global(.table-text.deprecated) {
                        text-decoration: line-through;
                        color: $danger;
                    }
                }

                &:global(.member) :global(td) {
                    padding: 0.8rem 1rem;
                }
            }
        }
    }
</style>

<div class="table">
    <table><slot/></table>
</div>