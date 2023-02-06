<script>
    import '../assets/styles/main.scss';
    import HomeButton from '../components/HomeButton.svelte';
    import Install from '../components/Install.svelte';
    import Icon from '@iconify/svelte';
  import { githubHome, npmHome } from '../scripts/data';
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

    .home {
        display: flex;
        min-height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 5rem;

        .home-container {
            display: flex;
            align-items: center;
            max-width: 1000px;
            width: 100%;

            .introduction {
                width: 100%;
                margin-right: 1rem;

                .title {
                    font-family: 'Archivo Black', sans-serif;
                    font-size: 3rem;
                    font-weight: 500;
                    line-height: 3.4rem;
                    padding-bottom: 10px;
                    color: #fff;

                    .highlight {
                        text-decoration: none;
                        color: #fff;
                        background: #5865f2;
                        border-radius: 5px;
                        padding: 5px 10px;

                        &:hover,
                        &:focus {
                            position: relative;

                            &::after {
                                content: 'https://discord.js.org';
                                position: absolute;
                                display: block;
                                background: #000;
                                color: #fff;
                                font-family: 'Roboto', sans-serif;
                                font-size: 0.8rem;
                                padding: 5px 10px;
                                line-height: 1rem;
                                border-radius: 3px;
                                margin-bottom: 10px;
                                bottom: 100%;
                                left: 50%;
                                transform: translateX(-50%);
                            }
                        }

                        &:focus-visible {
                            outline: none;
                            background: #fff;
                            color: rgba(88, 101, 242, 1.0);
                        }
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
            }

            .install-section {
                width: 50%;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;

                :global(.install-command) {
                    max-width: 400px;
                }
            }
        }
    }

    @media (max-width: 885px) {
        .home {
            .home-container {
                flex-direction: column;

                .introduction {
                    margin-right: 0;
                    margin-bottom: 2rem;

                    @media (max-width: 590px) {
                        .title {
                            font-size: 2rem;
                            line-height: 2.5rem;
                        }
                    }
                }

                .install-section {
                    width: 100%;

                    :global(.install-command) {
                        max-width: 100%;
                    }
                }
            }
        }

        @media (max-width: 480px) {
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
        <div class="introduction section">
            <h1 class="title">
                Another <a href="https://discord.js.org/" class="highlight">Discord.js</a> command handler that just works.
            </h1>
            <div class="description">
                Reciple is a command handler with message command (aka prefix command), slash command, and context menu support. Reciple makes Discord.js command handling simple and cleaner using our built-in CLI tool.
            </div>
            <div class="buttons">
                <HomeButton style="Blue" href="/docs">Docs</HomeButton>
                <HomeButton href={githubHome} target="_blank">GitHub<Icon icon="mingcute:external-link-line"/></HomeButton>
                <HomeButton href={npmHome} target="_blank">NPM<Icon icon="mingcute:external-link-line"/></HomeButton>
            </div>
        </div>
        <div class="install-section section">
            <Install></Install>
        </div>
    </div>
</div>