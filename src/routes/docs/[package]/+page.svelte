<script lang="ts">
    import Icon from '@iconify/svelte';
    import LinkButton from '../../../lib/components/LinkButton.svelte';
    import type { DocsParser } from '../../../lib/scripts/classes/DocsParser';
    import type { packages } from '../../../lib/scripts/packages';
    import type { PackageLoadData } from './+page';

    export let data: PackageLoadData;

    let tags: Promise<string[]> = data.docs.resolveTags();
</script>

<style lang="scss">
    :global(body) {
        scroll-padding-top: 1rem;
    }

    .container {
        min-height: 100%;
        width: 100%;
        display: grid;
        position: relative;

        .center {
            display: inline-flex;
            width: calc(100% - 20px);
            max-width: 400px;
            flex-direction: column;
            margin: 2rem 10px;
            align-self: center;
            justify-self: center;

            .title {
                display: block;
                width: 100%;
                font-size: 1.5rem;
                font-weight: bold;
            }

            .content {
                :global(a) {
                    display: flex;
                    margin: 15px 0;
                    width: 100%;
                    align-items: center;

                    :global(span) {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        font-weight: 500;
                        flex-shrink: 1;

                        :global(.icon) {
                            font-size: 1.5rem;
                            margin-right: 10px;
                        }
                    }

                    :global(.arrow) {
                        flex-shrink: 0;
                        font-size: 1.5rem;
                    }
                }
            }

            .back {
                margin: 1rem 0;
                text-align: center;
            }
        }
    }
</style>

<svelte:head>
    <title>{data.package} | Choose version</title>
</svelte:head>

<div class="container">
    <div class="center">
        {#await tags}
            <div class="title" style="text-align: center;">
                Loading Tags...
            </div>
        {:then tags} 
            <div class="title">
                Select a version:
            </div>
            <div class="content">
                {#each tags as tag}
                    <LinkButton href="/docs/{data.package}/{tag}">
                        <span><Icon icon="tabler:versions" class="icon"/> {tag}</span>
                        <Icon icon="ic:round-arrow-forward" class="arrow"/>
                    </LinkButton>
                {/each}
            </div>
        {:catch err}
            <div class="title" style="text-align: center;">
                Couldn't fetch tags from Github
            </div>
        {/await}
        <div class="back">
            <LinkButton class="blue" href="/docs">
                <Icon icon="ic:round-arrow-back" /> Back
            </LinkButton>
        </div>
    </div>
</div>