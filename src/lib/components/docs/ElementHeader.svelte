<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { AnyDocsElement } from '../../scripts/types';
    import { createClassTypeSnippet, createFunctionTypeSnippet, createInterfaceTypeSnippet, createTypeAliasTypeSnippet, createVariableTypeSnipper, getElementDescription, getElementExtensions, getElementIcon, isElementDeprecated, stringifyType } from '../../scripts/helpers';
    import fileCodeIcon from '@iconify/icons-codicon/file-code';
    import Markdown from '../Markdown.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import type { PackageQueryLoadData } from '../../../routes/docs/[package]/[tag]/[query]/+page';
    import { ClassParser, FunctionParser, InterfaceParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
    import symbolParameter from '@iconify/icons-codicon/symbol-parameter';
    import Accordion from './Accordion.svelte';
    import SignatureTable from './SignatureTable.svelte';

    export let element: AnyDocsElement;
    export let data: PackageQueryLoadData;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .element-header-container {
        width: 100%;
        padding: 2rem 0;

        .element-header {
            .element-header-title {
                display: flex;
                font-size: 1.4rem;
                font-weight: 600;
                align-items: center;
                padding-bottom: 1rem;

                .text {
                    width: 100%;
                    display: flex;
                    align-items: start;

                    &.deprecated {
                        color: $danger;

                        .name .display-name {
                            text-decoration: line-through;
                        }

                        .icon,
                        .name .display-name {
                            opacity: 0.8;
                        }
                    }

                    .icon {
                        display: flex;
                        align-items: center;
                        height: 1.5em;
                        width: 1.5em;
                        font-size: 1.5rem;
                    }

                    .name {
                        display: flex;
                        flex-direction: column;
                        width: calc(100% - 1.5rem - 1.5em);
                        padding-right: 0.5rem;

                        .display-name {
                            width: 100%;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            line-height: 1.5em;
                            height: 1.5em;
                            vertical-align: middle;
                        }

                        .extensions {
                            font-size: 0.82rem;
                            font-weight: 500;
                            color: lighten($border, $amount: 40);

                            :global(a) {
                                text-decoration: none;
                                color: $link;
                            }
                        }
                    }

                    .source {
                        font-size: 1.5rem;
                        color: $link;
                    }
                }
            }

            .element-description .element-snippet{
                padding-bottom: 1rem;
            }
        }
    }
</style>

<div class="element-header-container">
    <div class="element-header">
        <div class="element-header-title">
            <p class="text" class:deprecated={isElementDeprecated(element)}>
                <span class="icon">
                    <Icon icon={getElementIcon(element)}/>
                </span>
                <span class="name">
                    <p class="display-name">{element.name}</p>
                    <p class="extensions">
                        {#if element instanceof ClassParser}
                            {@html getElementExtensions(data, element)}
                        {/if}
                    </p>
                </span>
                {#if element.source?.url}
                    <a href={element.source.url} class="source" target="_blank"><Icon icon={fileCodeIcon}/></a>
                {/if}
            </p>
        </div>
        <div class="element-description">
            {#if element instanceof ClassParser}
                <div class="element-snippet">
                    <Markdown content={'```typescript\n' + createClassTypeSnippet(data, element) + '\n```'}/>
                </div>
            {:else if element instanceof InterfaceParser}
                <div class="element-snippet">
                    <Markdown content={'```typescript\n' + createInterfaceTypeSnippet(data, element) + '\n```'}/>
                </div>
            {:else if element instanceof TypeAliasParser}
                <div class="element-snippet">
                    <Markdown content={'```typescript\n' + createTypeAliasTypeSnippet(data, element) + '\n```'}/>
                </div>
            {:else if element instanceof FunctionParser}
                <div class="element-snippet">
                    <Markdown content={'```typescript\n' + createFunctionTypeSnippet(data, element) + '\n```'}/>
                </div>
            {:else if element instanceof VariableParser}
                <div class="element-snippet">
                    <Markdown content={'```typescript\n' + createVariableTypeSnipper(data, element) + '\n```'}/>
                </div>
            {/if}
            {#if getElementDescription(element)}
                <Accordion name="Summary">
                    <Markdown content={getElementDescription(element) ?? ''}/>
                </Accordion>
            {/if}
            {#if element instanceof FunctionParser}
                <Accordion name="Parameters" icon={symbolParameter} hr={false}>
                    <SignatureTable {data} signatures={element.signatures}/>
                </Accordion>
            {/if}
        </div>
    </div>
</div>