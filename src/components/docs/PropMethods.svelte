<script lang="ts">
    import Icon from '@iconify/svelte';
import type { DocumentationClassMethod, DocumentationProperty } from '../../interfaces/Documentation';


    export let properties: DocumentationProperty[] = [];
    export let methods: DocumentationClassMethod[] = [];

    let isPropertiesClosed: boolean = false;
    let isMethodsClosed: boolean = false;
</script>

<style lang="scss">
    .container {
        display: flex;
        width: 100%;

        .content {
            width: 100%;
            margin: 0.5rem;
            margin-top: 0;

            h2 {
                display: block;
                padding: 1rem 0;
                padding-top: 0;

                button {
                    width: 100%;
                    display: block;
                    text-align: inherit;
                    background: none;
                    border: none;
                    font: inherit;
                    display: flex;
                    align-items: center;

                    :global(.icon) {
                        color: #a4a4a4;
                        font-size: 1.3rem;
                        margin-right: 0.5rem;
                    }
                }
            }

            .links {
                width: 100%;

                &.closed {
                    display: none;
                }

                :global(a) {
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 0.2rem;
                    margin-left: 1.8rem;
                }
            }
        }
    }
</style>

<div class="container">
    {#if properties.length}
        <div class="content">
            <h2>
                <button on:click={() => isPropertiesClosed = !isPropertiesClosed}>
                    <Icon icon={isPropertiesClosed ? 'ph:caret-right-bold' : 'ph:caret-down-bold'} class="icon"/>
                    Properties
                </button>
            </h2>
            <div class="links" class:closed={isPropertiesClosed}>
                {@html properties.map(e => `<a href="#${e.name}" title="${e.name}${e.deprecated ? ' (Deprecated)' : ''}" ${e.deprecated ? 'style="text-decoration: line-through; opacity: 0.4;"' : ''}>${e.name}${e.optional ? '?' : ''}</a>`).join('<br>')}
            </div>
        </div>
    {/if}

    {#if methods.length}
        <div class="content">
            <h2>
                <button on:click={() => isMethodsClosed = !isMethodsClosed}>
                    <Icon icon={isMethodsClosed ? 'ph:caret-right-bold' : 'ph:caret-down-bold'} class="icon"/>
                    Methods
                </button>
            </h2>
            <div class="links" class:closed={isMethodsClosed}>
                {@html methods.map(e => `<a href="#${e.name}" title="${e.name}${e.deprecated ? ' (Deprecated)' : ''}" ${e.deprecated ? 'style="text-decoration: line-through; opacity: 0.4;"' : ''}>${e.name}</a>`).join('<br>')}
            </div>
        </div>
    {/if}
</div>