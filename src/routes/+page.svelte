<script lang="ts">
    import Install from '$lib/components/Install.svelte';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import Brandings from '$lib/components/Bandings.svelte';
    import { githubHome, npmHome } from '$lib/scripts/config';
    import Icon from '@iconify/svelte';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
    import Console from '../lib/components/Console.svelte';
    import isMobile from 'is-mobile';
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
    @import '$lib/styles/variables.scss';

    .home {
        display: flex;
        min-height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 5rem;
        flex-direction: column;
        position: relative;
        z-index: 2;

        .home-container {
            display: flex;
            align-items: center;
            max-width: 1200px;
            width: 100%;
            padding-bottom: 8rem;
            padding-top: 8rem;

            .intro {
                width: 100%;
                margin-right: 2rem;

                .title {
                    font-family: 'Archivo Black', 'Inter', sans-serif;
                    font-size: 2.8rem;
                    font-weight: 500;
                    line-height: 3rem;
                    padding-bottom: 10px;
                    color: $white;

                    .highlight {
                        text-decoration: none;
                        color: $white;
                        background: $link;
                        border-radius: 5px;
                        padding: 5px 10px;
                        position: relative;
                        box-shadow: 0px 0px 40px rgba($linkVisited, $alpha: 0.5);
                    }
                }

                .description {
                    font-size: 1.1rem;
                    font-weight: normal;
                    line-height: 1.5rem;
                    color: #bababa;
                }

                .buttons {
                    margin-top: 2rem;

                    :global(a) {
                        margin: 0 10px;

                        &:first-child {
                            margin-left: 0;
                        }

                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }

                @media (max-width: 570px) {
                    .buttons {
                        display: flex;
                        flex-direction: column;

                        :global(a) {
                            margin: 0.5rem 0;
                            text-align: center;
                        }
                    }
                }
            }

            .install {
                width: 50%;
                height: 340px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                :global(> .install-command) {
                    flex-shrink: 0;
                    margin-top: 0.5rem;
                }
            }
        }
    }

    @media (max-width: 1010px) {
        .home {
            .home-container {
                flex-direction: column;
                margin-bottom: 4rem;
                padding-bottom: 0;
                padding-top: 2rem;

                .intro {
                    margin-right: 0;
                    margin-bottom: 2rem;

                    @media (max-width: 590px) {
                        .title {
                            font-size: 2rem;
                            line-height: 2.5rem;
                        }
                    }
                }

                .install {
                    width: 100%;

                    :global(.install-command) {
                        max-width: 100%;
                    }
                }
            }
        }

        @media (max-width: 560px) {
            .home {
                padding: 3rem;
            }
        }

        @media (max-width: 375px) {
            .home {
                padding: 2.4rem;
            }
        }
    }
</style>

<svelte:head>
    <title>Reciple</title>
</svelte:head>

<div class="home">
    <div class="home-container">
        <div class="intro">
            <h1 class="title">
                Another <a href="https://discord.js.org/" class="highlight">Discord.js</a> framework that just works<Icon icon="fluent-emoji:fire" inline style="font-size: 1.2em; margin-left: 0.3rem"/>
            </h1>
            <div class="description">
                Reciple is a command framework with message command (aka prefix command), slash command, and context menu support. Reciple makes Discord.js command handling simple and easy using our built-in CLI tool.
            </div>
            <div class="buttons">
                <LinkButton class="blue" href="/guide">Get Started</LinkButton>
                <LinkButton href="/docs">Docs</LinkButton>
                <LinkButton href={githubHome} target="_blank">GitHub <Icon icon={externalLinkIcon}/></LinkButton>
            </div>
        </div>
        <div class="install">
            {#if isMobile()}
                <Install/>
            {:else}
                <Console/>
                <Install/>
            {/if}
        </div>
    </div>
    <Brandings/>
</div>