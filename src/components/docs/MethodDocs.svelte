<script lang="ts">
    import { goto } from '$app/navigation';
    import type { DocsData } from '../../data/DocsData';
    import type { DocumentationClassMethod } from '../../interfaces/Documentation';
    import Markdown from './Markdown.svelte';
  import ParamsTable from './ParamsTable.svelte';

    export let docs: DocsData;
    export let method: DocumentationClassMethod;

    let returns = method?.returns?.map((e: string[][][]) => Array.isArray(e) ? e.map(i => docs.typeKey(i, true, false)).join('') : '').join('');
</script>

<style lang="scss">
    .content-method {
        width: 100%;
        margin: 2rem 0;
        position: relative;
        border-bottom: 1px solid rgba(60, 60, 60, 0.5);
        padding-bottom: 1rem;

        .content-title {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            scroll-padding-top: 4rem;

            a {
                text-decoration: none;
            }

            .params {
                opacity: 0.6;
            }

            .tags {
                display: flex;
                align-items: center;
                margin-left: 0.5rem;

                .tag {
                    display: inline-block;
                    padding: 0.2rem 0.5rem;
                    margin-right: 0.5rem;
                    font-size: 0.7rem;
                    border-radius: 100px;
                    background: #5865f2;
                    text-transform: uppercase;

                    &::before {
                        content: attr(data-content);
                    }

                    &[data-content="deprecated"] {
                        background: rgba(190, 42, 42, 1);
                    }
                }
            }
        }

        .contents {
            font-size: 0.9rem;

            :global(.construct) {
                margin: 1rem 0;
            }

            .returns {
                display: flex;
                align-items: center;

                .label {
                    margin-right: 0.5rem;
                    font-weight: 600;
                }

                :global(.value) {
                    display: inline-block;
                    font-size: 0.8rem;

                    :global(pre) {
                        padding: 0.2rem;
                    }
                }
            }
        }
    }
</style>

<div class="content-method">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h3 id={method.name} class="content-title" on:click={() => goto(`#${method.name}`)}>
        <a href="#{method.name}">
            .{method.name}(<span class="params">{method.params ? method.params.map(e => e.name + (e.optional ? '?' : '')).join(', ') : ''}</span>)
        </a>
        <div class="tags">
            {#if method.scope === 'static'} <span class="tag" data-content="static"></span> {/if}
            {#if method.scope === 'private'} <span class="tag" data-content="private"></span> {/if}
            {#if method.deprecated} <span class="tag" data-content="deprecated"></span> {/if}
        </div>
    </h3>
    <div class="contents">
        {#if method.description}<Markdown class="content-description" {docs} content={method.description} />{/if}
        {#if typeof method.deprecated === 'string'}<Markdown {docs} class="deprecation-warning" content={method.deprecated}/>{/if}

        <h3>Construct</h3>
        <Markdown class="nowrap-code-md construct" content={'```ts\n'+ method.name + `(${ method.params ? docs.parseParamTypes(method.params, { escapeHtml: false, disableTypeAnchors: true }) : '' }): ${returns || 'unknown'}` +'\n```'}></Markdown>

        {#if method.params}
            <h3>Params</h3>
            <ParamsTable {docs} params={method.params}></ParamsTable>
        {/if}

        {#if returns}
            <div class="returns">
                <span class="label">Returns: </span>
                <Markdown class="value nowrap-code-md" content={'```js\n' + returns + '\n```'} {docs}></Markdown>
            </div>
        {/if}
    </div>
</div>