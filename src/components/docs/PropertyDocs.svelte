<script lang="ts">
    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    import type { DocsData } from '../../data/DocsData';
    import type { DocumentationProperty } from '../../interfaces/Documentation';
    import Markdown from './Markdown.svelte';
    import { createEventDispatcher, onMount } from 'svelte';

    export let docs: DocsData;
    export let property: DocumentationProperty;

    let anchor: HTMLAnchorElement|null = null;
    let fragment: string = typeof window !== 'undefined' ? window.location.hash.substring(1) : '';
    let dispatch = createEventDispatcher();

    onMount(async () => {
        if (fragment !== property.name) return;

        dispatch('scrollTo', anchor);
    });
</script>

<style lang="scss">
    .content-property {
        width: 100%;
        margin: 2rem 0;
        position: relative;
        border-bottom: 1px solid rgba(60, 60, 60, 0.5);
        padding-bottom: 1rem;

        .contents {
            font-size: 0.9rem;

            .type {
                display: flex;
                align-items: center;
                margin-bottom: 0.2rem;

                .label {
                    margin-right: 0.5rem;
                    font-weight: 600;
                    flex-shrink: 0;

                    :global(i) {
                        color: #5865f2;
                        font-style: normal;
                        cursor: help;

                        &:hover {
                            position: relative;

                            &::after {
                                content: 'Optional';
                                position: absolute;
                                display: block;
                                bottom: 100%;
                                left: 50%;
                                transform: translateX(-50%);
                                color: #fff;
                                background: #3c3c3c;
                                padding: 0.2rem 0.5rem;
                                border-radius: 5px;
                                font-size: 0.8rem;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                            }
                        }
                    }
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

<div class="content-property">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h3 id={property.name} class="content-title" on:click={() => goto(`#${property.name}`)}>
        <a href="#{property.name}" bind:this={anchor} id={fragment === property.name ? 'scrollIntoView' : null}>
            .{property.name}
        </a>
        <div class="tags">
            {#if property.scope === 'static'} <span class="tag" data-content="static"></span> {/if}
            {#if property.scope === 'private'} <span class="tag" data-content="private"></span> {/if}
            {#if property.readonly} <span class="tag" data-content="readonly"></span> {/if}
            {#if property.deprecated} <span class="tag" data-content="deprecated"></span> {/if}
        </div>
        {#if property.meta?.url}
            <a href={property.meta.url} target="_blank noreferrer" class="source">
                <Icon icon="ph:code-bold" />
            </a>
        {/if}
    </h3>
    <div class="contents">
        {#if property.description}<Markdown class="content-description" {docs} content={property.description} />{/if}
        {#if typeof property.deprecated === 'string'}<Markdown {docs} class="deprecation-warning" content={property.deprecated}/>{/if}
        {#if property.default}
            <div class="type">
                <div class="label">Default: </div>
                <Markdown {docs} class="value nowrap-code-md" content={'```ts\n'+ property.default +'\n```'}></Markdown>
            </div>
        {/if}
        <div class="type">
            <span class="label">Type: {@html property.optional ? '<i>?</i>' : ''}</span>
            <Markdown {docs} class="value nowrap-code-md" content={'```ts\n' + property.type.map(e => docs.typeKey(e, true, false)).join('') + '\n```'}></Markdown>
        </div>
    </div>
</div>