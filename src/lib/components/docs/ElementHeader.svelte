<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { AnyDocsElement } from '../../scripts/types';
    import { createClassTypeSnippet, createFunctionTypeSnippet, createInterfaceTypeSnippet, createTypeAliasTypeSnippet, createVariableTypeSnipper, getElementBlocktag, getElementDescription, getElementExtensions, getElementIcon, getElementTypeDisplayName, isElementDeprecated, stringifyType } from '../../scripts/helpers';
    import fileCodeIcon from '@iconify/icons-codicon/file-code';
    import Markdown from '../Markdown.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import type { PackageQueryLoadData } from '../../../routes/docs/[package]/[tag]/[query]/+page';
    import { ClassParser, FunctionParser, InterfaceParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
    import symbolParameter from '@iconify/icons-codicon/symbol-parameter';
    import Accordion from './Accordion.svelte';
    import SignatureTable from './SignatureTable.svelte';
    import symbolMethodIcon from '@iconify/icons-codicon/symbol-method';
    import Label from './Label.svelte';

    export let element: AnyDocsElement;
    export let data: PackageQueryLoadData;

    $: typeSnippet = element instanceof ClassParser
        ? createClassTypeSnippet(data, element)
        : element instanceof InterfaceParser
            ? createInterfaceTypeSnippet(data, element)
            : element instanceof TypeAliasParser
                ? createTypeAliasTypeSnippet(data, element)
                : element instanceof FunctionParser
                    ? createFunctionTypeSnippet(data, element)
                    : element instanceof VariableParser
                        ? createVariableTypeSnipper(data, element)
                        : null;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .element-header-container {
        width: 100%;
        padding-top: 2rem;

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

        .labels {
            margin-top: 1rem;
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
            {#if typeSnippet}
                <div class="element-snippet">
                    <Markdown content={'```typescript\n' + typeSnippet + '\n```'}/>
                </div>
            {/if}
            <Accordion name="Summary">
                <Markdown content={getElementDescription(element) ?? 'No summary provided'}/>
                {#if isElementDeprecated(element)}
                    <div class="labels">
                        <Label label="@deprecated">
                            <Markdown content={getElementBlocktag(element, 'deprecated') || `This ${getElementTypeDisplayName(element).toLowerCase()} is deprecated`} inline={true}/>
                        </Label>
                    </div>
                {/if}
            </Accordion>
            {#if element instanceof FunctionParser}
                <Accordion name="Parameters" icon={symbolParameter} hr={false}>
                    <SignatureTable {data} signatures={element.signatures}/>
                </Accordion>
            {:else if element instanceof ClassParser}
                <Accordion name="Constructor" icon={symbolMethodIcon} hr={false}>
                    <SignatureTable {data} signatures={[element.construct]}/>
                </Accordion>
            {/if}
        </div>
    </div>
</div>