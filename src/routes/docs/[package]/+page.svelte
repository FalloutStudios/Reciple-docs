<script lang="ts">
    import Icon from '@iconify/svelte';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import type { PackageLoadData } from './+page';
    import caretRightIcon from '@iconify/icons-ph/caret-right';
    import caretLeftIcon from '@iconify/icons-ph/caret-left';
    import versionsIcon from '@iconify/icons-tabler/versions';

    export let data: PackageLoadData;
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
        {#if data.tags.length}
            <div class="title">
                Select a version:
            </div>
            <div class="content">
                {#each data.tags as tag}
                    <LinkButton href="/docs/{data.package}/{tag}{data.goto ? `/${data.goto}` : ''}">
                        <span><Icon icon={versionsIcon} class="icon"/> {tag}</span>
                        <Icon icon={caretRightIcon} class="arrow"/>
                    </LinkButton>
                {/each}
            </div>
        {:else}
            <div class="title" style="text-align: center;">
                Couldn't fetch tags from Github
            </div>
        {/if}
        <div class="back">
            <LinkButton class="blue" href="/docs">
                <Icon icon={caretLeftIcon} /> Back
            </LinkButton>
        </div>
    </div>
</div>