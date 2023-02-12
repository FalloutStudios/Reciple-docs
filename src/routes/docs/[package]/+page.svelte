<script lang="ts">
    import '../../../assets/styles/main.scss';
    import Icon from '@iconify/svelte';
    import HomeButton from '../../../components/HomeButton.svelte';
    import packages from '../../../scripts/packages';
    import type { DocsData } from '../../../data/DocsData';

    export let data: { package: string; };

    let pkg: DocsData = packages[data.package as keyof typeof packages];
    let tags: Promise<string[]> = pkg.resolveTags();
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
    <title>Choose a version</title>
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
                    <HomeButton href="/docs/{pkg.options.package}/{tag}">
                        <span><Icon icon="tabler:versions" class="icon"/> {tag}</span>
                        <Icon icon="ic:round-arrow-forward" class="arrow"/>
                    </HomeButton>
                {/each}
            </div>
        {:catch err}
            <div class="title" style="text-align: center;">
                Couldn't fetch tags from Github
            </div>
        {/await}
        <div class="back">
            <HomeButton style="Blue" href="/docs">
                <Icon icon="ic:round-arrow-back" /> Back
            </HomeButton>
        </div>
    </div>
</div>