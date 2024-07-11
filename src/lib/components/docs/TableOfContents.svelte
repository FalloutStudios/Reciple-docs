<script lang="ts">
    import type { ClassMethodParser, ClassPropertyParser, InterfaceMethodParser, InterfacePropertyParser } from 'typedoc-json-parser';
    import Accordion from './Accordion.svelte';
    import AlignLeftIcon from '@iconify/icons-tabler/align-left';
    import propertyIcon from '@iconify/icons-codicon/symbol-property';
    import methodIcon from '@iconify/icons-codicon/symbol-method';
    import { slug } from 'github-slugger';
    import { deprecatedElementSorter, getElementBlocktag, isElementDeprecated } from '../../scripts/helpers';

    export let properties: (InterfacePropertyParser|ClassPropertyParser)[] = [];
    export let methods: (InterfaceMethodParser|ClassMethodParser)[] = [];
</script>

<Accordion name="Table of contents" id="-table-of-contents" icon={AlignLeftIcon} hr={false} isSubaccordion={true}>
    <div class="content">
        {#if properties.length}
            <Accordion name="Properties" hr={false} id="-properties" icon={propertyIcon} isSubaccordion={true} isSubHeader={true}>
                <div class="list">
                    {#each properties.sort(deprecatedElementSorter) as property}
                        {@const isStatic = 'static' in property && property.static}
                        {@const deprecationMessage = isElementDeprecated(property) ? getElementBlocktag(property, 'deprecated') : null}
                        <a href="#{slug((isStatic ? 'static-' : '') + property.name)}" class:deprecated={!!deprecationMessage} title={(!!deprecationMessage ? '(Deprecated)' : '') + property.name}>
                            {property.name}
                        </a>
                    {/each}
                </div>
            </Accordion>
        {/if}
        {#if methods.length}
            <Accordion name="Methods" hr={false} id="-methods" icon={methodIcon} isSubaccordion={true} isSubHeader={true}>
                <div class="list">
                    {#each methods.sort(deprecatedElementSorter) as method}
                        {@const isStatic = 'static' in method && method.static}
                        {@const deprecationMessage = isElementDeprecated(method) ? getElementBlocktag(method, 'deprecated') : null}
                        <a href="#{slug((isStatic ? 'static-' : '') + method.name)}" class:deprecated={!!deprecationMessage} title={(!!deprecationMessage ? '(Deprecated) ' : '') + method.name}>
                            {method.name}()
                        </a>
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

        .list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.5rem;

            a {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: lighten($link, $amount: 5);
                text-decoration: none;
                font-size: 1.1rem;
                padding: 0.4rem 2.5rem;
                border-radius: 3px;

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
    }
</style>