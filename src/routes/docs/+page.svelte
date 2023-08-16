<script lang="ts">
    import Icon from '@iconify/svelte';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import { packages } from '$lib/scripts/packages';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
    import packageBoldIcon from '@iconify/icons-ph/package-bold';
    import caretRightIcon from '@iconify/icons-ph/caret-right';
    import caretLeftIcon from '@iconify/icons-ph/caret-left';
</script>

<style lang="scss">
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
    <title>Select A Package</title>
</svelte:head>

<div class="container">
    <div class="center">
        <div class="title">
            Select a package:
        </div>
        <div class="content">
            {#each packages as pkg}
                <LinkButton href="/docs/{pkg}">
                    <span><Icon icon={packageBoldIcon} class="icon"/> {pkg}</span>
                    <Icon icon={caretRightIcon} class="arrow"/>
                </LinkButton>
            {/each}
            <LinkButton href="https://discord.js.org" target="_blank">
                <span><Icon icon={packageBoldIcon} class="icon"/> discord.js</span>
                <Icon icon={externalLinkIcon} class="arrow"/>
            </LinkButton>
        </div>
        <div class="back">
            <LinkButton class="blue" href="/">
                <Icon icon={caretLeftIcon} /> Back
            </LinkButton>
        </div>
    </div>
</div>