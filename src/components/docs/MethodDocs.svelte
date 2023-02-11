<script lang="ts">
    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import type { DocsData } from '../../data/DocsData';
    import type { DocumentationClassMethod } from '../../interfaces/Documentation';
    import Markdown from './Markdown.svelte';
    import ParamsTable from './ParamsTable.svelte';

    export let docs: DocsData;
    export let method: DocumentationClassMethod;

    onMount(() => {
        if (window.location.hash.substring(1) !== method.name) return;

        document.getElementById(method.name)?.scrollIntoView({
            block: 'start',
            inline: 'start'
        });
    });

    let returns = method?.returns?.map((e: string[][][]) => Array.isArray(e) ? e.map(i => docs.typeKey(i, true, false)).join('') : '').join('');
</script>

<style lang="scss">
    .content-method {
        width: 100%;
        margin: 2rem 0;
        position: relative;
        border-bottom: 1px solid rgba(60, 60, 60, 0.5);
        padding-bottom: 1rem;

        .contents {
            font-size: 0.9rem;

            :global(.construct) {
                margin: 1rem 0;
            }

            .returns {
                display: flex;
                align-items: center;
                flex-wrap: wrap;

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

        @media (max-width: 910px) {
            .content-title {
                .params {
                    display: none;
                }
            }
        }
    }
</style>

<div class="content-method">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h3 id={method.name} class="content-title" on:click={() => goto(`#${method.name}`)}>
        <a href="#{method.name}">
            .{method.name}<span class="params">(<span class="param-contents">{method.params ? method.params.map(e => e.name + (e.optional ? '?' : '')).join(', ') : ''}</span>)</span>
        </a>
        <div class="tags">
            {#if method.scope === 'static'} <span class="tag" data-content="static"></span> {/if}
            {#if method.scope === 'private'} <span class="tag" data-content="private"></span> {/if}
            {#if method.deprecated} <span class="tag" data-content="deprecated"></span> {/if}
        </div>
        {#if method.meta?.url}
            <a href={method.meta.url} target="_blank noreferrer" class="source">
                <Icon icon="ph:code-bold" />
            </a>
        {/if}
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