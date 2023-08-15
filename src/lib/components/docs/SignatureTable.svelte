<script lang="ts">
    import type { ClassConstructorParser, SignatureParser } from 'typedoc-json-parser';
    import { getElementDescription, isElementDeprecated, stringifyType } from '../../scripts/helpers';
    import type { PackageQueryLoadData } from '../../../routes/docs/[package]/[tag]/[query]/+page';
    import Markdown from '../Markdown.svelte';
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
    import caretDownIcon from '@iconify/icons-ph/caret-down';
    import Icon from '@iconify/svelte';
    import Table from './Table.svelte';
    import Label from './Label.svelte';

    export let data: PackageQueryLoadData;
    export let signatures: (SignatureParser|ClassConstructorParser)[];
    export let signatureIndex: number = 0;

    let open: boolean = false;
    let width: number = 0;

    $: currentSignature = signatures[signatureIndex];
    $: requiredCol = !!currentSignature.parameters?.some(p => !p.optional);
    $: descriptionCol = !!currentSignature.parameters?.some(p => p.comment.deprecated);
    $: isEmpty = !currentSignature.parameters?.length;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .signature-table-container {
        display: block;
        width: 100%;
        margin-top: 0.5rem;

        .signature-table {
            display: block;

            .signature-table-description {
                :global(.markdown) {
                    margin-bottom: 1rem;
                }
            }

            .signature-table-dropdown {
                display: block;
                padding-top: 1rem;
                padding-bottom: 0.5rem;

                .signature-table-button {
                    @include BorderedButton();
                    padding: 0.5rem 1rem;
                    display: flex;
                    font-weight: 500;
                    align-items: center;

                    .value {
                        width: 100%;
                    }

                    .icon {
                        font-size: 1.2rem;
                        margin-left: 0.5rem;
                        height: 1.2rem;
                        width: 1.2rem;
                        display: block;
                        flex-shrink: 0;
                        @include Transition();

                        &.open {
                            transform: rotate(180deg);
                        }
                    }
                }

                :global(.dropdown) {
                    @include BorderedButton();
                    @include DropShadow();
                    padding: 0.2rem 0;

                    :global(li) {
                        list-style: none;
                    }

                    :global(.item) {
                        display: block;
                        color: $white;
                        width: 100%;
                        padding: 0.3rem 1rem;
                        text-decoration: none;
                        text-align: left;
                        background: none;
                        border: none;
                        font-size: 1em;

                        &:hover,
                        &:focus {
                            background: rgba($border, $alpha: 0.2);
                        }

                        &:is([data-selected="true"]) {
                            cursor: default;
                            color: lighten($link, $amount: 10);
                            font-weight: 600;
                        }
                    }
                }
            }

            .signature-content {
                width: 100%;

                :global(.label-container) {
                    margin-top: 1rem;
                    font-weight: 500;
                }
            }
        }
    }
</style>

<div class="signature-table-container">
    <div class="signature-table">
        {#if currentSignature.parameters.length}
            <div class="signature-table-description"></div>
            <div class="signature-content">
                <Table>
                    <tr class="table-heaser">
                        <th class="table-header">Name</th>
                        <th class="table-header">Type</th>
                        {#if requiredCol}<th class="table-header">Required</th>{/if}
                        {#if descriptionCol}<th class="table-header">Description</th>{/if}
                    </tr>
                    {#each currentSignature.parameters as parameter}
                    {@const deprecated = isElementDeprecated(parameter)}
                    <tr class="member">
                        <td><span class="table-text" class:deprecated={deprecated} title={parameter.name + (deprecated ? ' (Deprecated)' : '')}>{parameter.name}</span></td>
                        <td><code class="table-code">{@html stringifyType(data, parameter.type, true, 5)}</code></td>
                        {#if requiredCol}<td><span class="table-text">{parameter.optional ? 'No' : 'Yes'}</span></td>{/if}
                        {#if descriptionCol}
                            <td>
                                <span class="table-text">
                                    <Markdown content={getElementDescription(parameter) ?? ''} inline={true}/>
                                </span>
                            </td>
                        {/if}
                    </tr>
                    {/each}
                </Table>
                {#if 'returnType' in currentSignature}
                    <Label label="Returns" class="returns">
                        <code>{@html stringifyType(data, currentSignature.returnType, true, 5)}</code>
                    </Label>
                {/if}
            </div>
        {/if}
        {#if signatures.length > 1}
            <div class="signature-table-dropdown">
                <button class="signature-table-button" bind:offsetWidth={width}>
                    <span class="value">Overload {signatureIndex + 1}</span>
                    <span class="icon" class:open><Icon icon={caretDownIcon}/></span>
                </button>
                <Dropdown class="dropdown" bind:open={open} style="min-width: {width}px; z-index: 99;">
                    {#each signatures as signature, index}
                        <DropdownItem data-selected={signatureIndex === index} defaultClass="item" on:click={() => { signatureIndex = index; open = false; }}>Overload {index + 1}</DropdownItem>
                    {/each}
                </Dropdown>
            </div>
        {/if}
    </div>
</div>