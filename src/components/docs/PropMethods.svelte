<script lang="ts">
    import type { DocumentationClassMethod, DocumentationProperty } from '../../interfaces/Documentation';


    export let properties: DocumentationProperty[] = [];
    export let methods: DocumentationClassMethod[] = [];
</script>

<style lang="scss">
    .container {
        display: flex;
        width: 100%;

        .content {
            width: 100%;
            margin: 0.5rem;

            h2 {
                display: block;
                padding: 1rem 0;
            }

            .links {
                width: 100%;

                :global(a) {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>

<div class="container">
    {#if properties.length}
        <div class="content">
            <h2>Properties</h2>
            <div class="links">
                {@html properties.map(e => `<a href="#${e.name}" title="${e.name}${e.deprecated ? ' (Deprecated)' : ''}" ${e.deprecated ? 'style="text-decoration: line-through; opacity: 0.4;"' : ''}>${e.name}${e.optional ? '?' : ''}</a>`).join('')}
            </div>
        </div>
    {/if}

    {#if methods.length}
        <div class="content">
            <h2>Methods</h2>
            <div class="links">
                {@html methods.map(e => `<a href="#${e.name}" title="${e.name}${e.deprecated ? ' (Deprecated)' : ''}" ${e.deprecated ? 'style="text-decoration: line-through; opacity: 0.4;"' : ''}>${e.name}</a>`).join('')}
            </div>
        </div>
    {/if}
</div>