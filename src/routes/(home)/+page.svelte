<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import HomeNav from "./components/HomeNav.svelte";
    import isMobile from 'is-mobile';
    import Icon from '@iconify/svelte';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import { githubHome } from '$lib/scripts/config';
    import Console from '$lib/components/Console.svelte';
    import Install from '$lib/components/Install.svelte';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';

    let navScroll = false;

    function onScroll() {
        if (window.scrollY > 0) {
            navScroll = true;
        } else {
            navScroll = false;
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', onScroll);
            onScroll();
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll);
    });
</script>

<svelte:head>
    <title>Reciple - ⚡Discord.js framework that just works</title>
</svelte:head>

<HomeNav {navScroll}/>
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
            <Console/>
            <Install/>
        </div>
    </div>
</div>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
    @import '$lib/styles/variables.scss';

    .home {
        padding-top: 5rem;
        min-height: calc(100% - 5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2rem;

        .home-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: 1200px;
            padding: 0.5rem 2rem;

            .intro {
                width: 100%;
                margin-right: 2rem;

                .title {
                    font-family: 'Archivo Black', 'Inter', sans-serif;
                    font-size: 2.8rem;
                    font-weight: 500;
                    line-height: 3.5rem;
                    padding-bottom: 10px;
                    color: $white;

                    .highlight {
                        text-decoration: none;
                        color: $white;
                        background: $link;
                        border-radius: 5px;
                        padding: 2px 10px;
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
                height: 400px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 1rem;

                :global(> .install-command) {
                    flex-shrink: 0;
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
                    flex-direction: column-reverse;
                    gap: 1rem;

                    :global(.install-command) {
                        max-width: 100%;
                    }
                }
            }
        }
    }
</style>