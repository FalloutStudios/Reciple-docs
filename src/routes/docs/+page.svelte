<script lang="ts">
    import '../../assets/styles/main.scss';
    import Icon from '@iconify/svelte';
    import HomeButton from '../../components/HomeButton.svelte';
    import packages from '../../scripts/packages';
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
    <title>Choose a package</title>
</svelte:head>

<div class="container">
    <div class="center">
        <div class="title">
            Select a package:
        </div>
        <div class="content">
            {#each Object.keys(packages) as pkg}
                <HomeButton href="/docs/{pkg}">
                    <span><Icon icon="ph:package-bold" class="icon"/> {pkg}</span>
                    <Icon icon="ic:round-arrow-forward" class="arrow"/>
                </HomeButton>
            {/each}
            <HomeButton href="https://discord.js.org" target="_blank">
                <span><Icon icon="ph:package-bold" class="icon"/> discord.js</span>
                <Icon icon="mingcute:external-link-line" class="arrow"/>
            </HomeButton>
        </div>
        <div class="back">
            <HomeButton style="Blue" href="/">
                <Icon icon="ic:round-arrow-back" /> Back
            </HomeButton>
        </div>
    </div>
</div>