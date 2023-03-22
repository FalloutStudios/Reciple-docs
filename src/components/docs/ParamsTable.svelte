<script lang="ts">
    import type { DocsData } from '../../data/DocsData';
    import type { DocumentationParameter } from '../../interfaces/Documentation';
    import { typeKey } from '../../scripts/typeKey';

    export let docs: DocsData|null = null;
    export let params: DocumentationParameter[] = [];
    export let title: string|null = '';

    let defaultEnabled = params.find(e => e.default);
    let descriptionEnabled = params.find(e => e.description);
    let optionalEnabled = params.find(e => e.optional == true);
</script>

<style lang="scss">
    @import '../../assets/styles/variables.scss';

    .container {
        margin: 1rem 0;
        margin-top: 0;
        border: 1px solid $border;
        border-radius: 5px;
        width: 100%;
        overflow: auto;

        table {
            width: 100%;
            text-align: center;
            border-spacing: 0;

            tr {
                padding: 0;

                &:last-child {
                    td {
                        border-bottom: none !important;
                    }
                }

                th {
                    padding: 1rem;
                    border-bottom: 1px solid $border;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                }

                td {
                    padding: 0.5rem;
                    border-left: 1px solid $border;
                    font-size: 0.9rem;
                    border-bottom: 1px solid rgba($color: $border, $alpha: 0.5);

                    &:first-child {
                        border-left: none;
                    }

                    &.type {
                        font-family: 'Courier New', Courier, monospace;
                    }
                }
            }
        }
    }
</style>

<h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem">{title}</h3>
<div class="container">
    <table>
        <tr class="labels">
            <th>Name</th>
            <th>Type</th>
            {#if defaultEnabled}<th>Default</th>{/if}
            {#if optionalEnabled}<th>Optional</th>{/if}
            {#if descriptionEnabled}<th>Description</th>{/if}
        </tr>
        {#each params as param}
            <tr>
                <td>{param.name}</td>
                <td class="type">{@html param.type.map(e => typeKey(e, docs ?? undefined, true, [])).join('')}</td>
                {#if defaultEnabled}<td>{param.default || ''}</td>{/if}
                {#if optionalEnabled}<td>{param.optional}</td>{/if}
                {#if descriptionEnabled}<td>{param.description ?? ''}</td>{/if}
            </tr>
        {/each}
    </table>
</div>