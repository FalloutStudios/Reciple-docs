<script lang="ts">
    import type { ClassMethodParser, ClassPropertyParser, InterfaceMethodParser, InterfacePropertyParser } from 'typedoc-json-parser';
    import Accordion from './Accordion.svelte';
    import AlignLeftIcon from '@iconify/icons-tabler/align-left';
    import propertyIcon from '@iconify/icons-codicon/symbol-property';
    import methodIcon from '@iconify/icons-codicon/symbol-method';
    import { slug } from 'github-slugger';
    import { deprecatedElementSorter, getElementBlocktag, isElementDeprecated } from '../../scripts/helpers';
    import { onMount } from 'svelte';
  import isMobile from 'is-mobile';

    export let properties: (InterfacePropertyParser|ClassPropertyParser)[] = [];
    export let methods: (InterfaceMethodParser|ClassMethodParser)[] = [];
    export let open: boolean = true;

    onMount(() => {
        if (properties.length >= 30 || methods.length >= 30) open = false;
        if (isMobile()) open = false;
    });
</script>

<Accordion name="Table of contents" id="-table-of-contents" icon={AlignLeftIcon} hr={true} isSubaccordion={true}>
    <div class="content">
        {#if properties.length}
            <Accordion name="Properties" hr={false} id="-properties" icon={propertyIcon} isSubaccordion={true} isSubHeader={true} open={open}>
                <div class="list">
                    {#each properties.sort(deprecatedElementSorter) as property}
                        {@const isStatic = 'static' in property && property.static}
                        {@const deprecationMessage = isElementDeprecated(property) ? getElementBlocktag(property, 'deprecated') : null}
                        <a href="#{slug((isStatic ? 'static-' : '') + property.name)}" class:deprecated={!!deprecationMessage} title={(!!deprecationMessage ? '(Deprecated)' : '') + property.name}>{property.name}</a>
                    {/each}
                </div>
            </Accordion>
        {/if}
        {#if methods.length}
            <Accordion name="Methods" hr={false} id="-methods" icon={methodIcon} isSubaccordion={true} isSubHeader={true} open={open}>
                <div class="list">
                    {#each methods.sort(deprecatedElementSorter) as method}
                        {@const isStatic = 'static' in method && method.static}
                        {@const deprecationMessage = isElementDeprecated(method) ? getElementBlocktag(method, 'deprecated') : null}
                        <a href="#{slug((isStatic ? 'static-' : '') + method.name)}" class:deprecated={!!deprecationMessage} title={(!!deprecationMessage ? '(Deprecated) ' : '') + method.name}>{method.name}</a>
                    {/each}
                </div>
            </Accordion>
        {/if}
    </div>
</Accordion>

<style lang="scss">
    @import '../../styles/variables.scss';

    .content {
        display: flex;
        gap: 1rem;

        :global(.accordion-container) {
            width: 50% !important;
        }

        .list {
            display: block;
            padding: 0.5rem;
            flex-shrink: 0;

            a {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: lighten($link, $amount: 5);
                text-decoration: none;
                font-size: 1.1rem;
                padding: 0.4rem 2.5rem;
                border-radius: 3px;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 100%;
                margin-bottom: 0.3rem;
                position: relative;
                white-space: break-spaces;
                word-wrap: break-word;

                &:hover,
                &:focus {
                    background: rgba($link, $alpha: 0.05);
                }

                &.deprecated {
                    color: rgba(lighten($link, $amount: 5), $alpha: 0.5);
                    text-decoration: line-through;
                }
            }
        }

        @media (max-width: 1080px) {
            flex-direction: column;
            gap: 0;

            :global(.accordion-container) {
                width: 100% !important;
                margin-bottom: 0.5rem !important;
            }

            .list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 0.5rem;
                padding-left: 2.5rem;

                a {
                    width: calc(50% - 0.3rem);
                    padding: 0.4rem;
                }
            }

            @media (max-width: 560px) {
                .list {
                    a {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>