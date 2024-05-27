<script lang="ts">
    import { slug } from 'github-slugger';
    import type { Guides } from '../../../api/guides/+server';
    import Icon from '@iconify/svelte';
    import ArrowRightIcon from '@iconify/icons-ph/arrow-right-bold';
    import ArrowLeftIcon from '@iconify/icons-ph/arrow-left-bold';

    export let guides: Guides;
    export let pagination: Guides[0]['pages'][0]['pagination'] = { next: null, previous: null };

    $: previousCategory = pagination.previous && (guides.find(c => c.id === pagination.previous?.categoryId) ?? null);
    $: nextCategory = pagination.next && (guides.find(c => c.id === pagination.next?.categoryId) ?? null);

    $: previous = previousCategory?.pages.find(p => p.id === pagination.previous?.pageId);
    $: next = nextCategory?.pages.find(p => p.id === pagination.next?.pageId);
</script>

<style lang="scss">
    @import '$lib/styles/variables.scss';

    .footer-pagination {
        display: flex;
        margin: 2rem 0;

        .space {
            width: 100%;
        }

        .paginator {
            @include BorderedButton();
            width: 100%;
            padding: 1rem;
            color: $white;
            text-decoration: none;
            display: flex;
            align-items: center;
            overflow: hidden;

            :global(.icon) {
                flex-shrink: 0;
                height: 1.4rem;
                width: 1.4rem;
            }

            &.prev {
                text-align: left;

                :global(.icon) {
                    margin-right: 1rem;
                }
            }

            &.next {
                text-align: right;

                :global(.icon) {
                    margin-left: 1rem;
                }
            }

            .container {
                width: calc(100% - 2.4rem);
                display: flex;
                flex-direction: column;

                h3 {
                    font-size: 1.4rem;
                    line-height: 1.2;
                    max-height: calc(1.2 * 2);
                    font-weight: 600;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: keep-all;
                    white-space: nowrap;
                    width: 100%;
                }

                p {
                    font-size: 0.9rem;
                    font-weight: 300;
                    opacity: 0.7;
                }
            }

            &.spaced {
                &.prev {
                    margin-right: 0.35rem;
                }

                &.next {
                    margin-left: 0.35rem;
                }
            }

            &:hover,
            &:focus {
                @include BorderedButton(rgba($link, $alpha: 0.5), rgba(lighten($link, $amount: 3), $alpha: 0.5));
            }
        }
    }

    @media (max-width: 560px) {
        .footer-pagination {
            flex-direction: column;

            .paginator {
                margin-bottom: 0.5rem;
                padding: 0.8rem 1rem;

                .container {
                    text-align: center;

                    h3 {
                        font-size: 1.1rem;
                    }

                    p {
                        font-size: 0.7rem;
                    }
                }

                &.prev .container {
                    padding-right: 2.4rem;
                }

                &.next .container {
                    padding-left: 2.4rem;
                }

                &.spaced.prev,
                &.spaced.next {
                    margin-left: 0;
                }
            }
        }
    }
</style>

<div class="footer-pagination">
    {#if previousCategory && previous}
        <a title={(previous.metadata?.title ?? previous.id) + '\n' + previousCategory.category} href="/guide/{previousCategory.id}/{previous.id}" class="paginator prev" class:spaced={previous && next}>
            <Icon icon={ArrowLeftIcon} inline={true} class="icon"/>
            <div class="container">
                <h3 class="title">{previous?.metadata.title ?? previous.id}</h3>
                <p class="category">{previousCategory.category}</p>
            </div>
        </a>
    {:else}
        <span class="space"></span>
    {/if}
    {#if nextCategory && next}
        <a title={(next.metadata?.title ?? next.id) + '\n' + nextCategory.category} href="/guide/{nextCategory.id}/{next.id}" class="paginator next" class:spaced={previous && next}>
           <div class="container">
                <h3 class="title">{next.metadata?.title ?? next.id}</h3>
                <p class="category">{nextCategory.category}</p>
            </div>
            <Icon icon={ArrowRightIcon} inline={true} class="icon"/>
        </a>
    {:else}
        <span class="space"></span>
    {/if}
</div>