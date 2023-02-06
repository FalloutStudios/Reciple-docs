<script>
    import '../assets/styles/main.scss';
    import HomeButton from '../components/HomeButton.svelte';
    import Install from '../components/Install.svelte';
    import Icon from '@iconify/svelte';
  import { githubHome } from '../scripts/data';
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

    .home {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 2rem 5rem;

        .home-container {
            display: flex;
            align-items: center;
            max-width: 1000px;
            width: 100%;

            .introduction {
                width: 100%;

                .title {
                    font-family: 'Archivo Black', sans-serif;
                    font-size: 3rem;
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
            }
        }
    }
</style>

<div class="home">
    <div class="home-container">
        <div class="introduction section">
            <div class="title">
                Another <a href="https://discord.js.org/" class="highlight">Discord.js</a> command handler that just works.
            </div>
            <div class="description">
                Reciple is a simple command handler with message command (aka prefix command), slash commands and context menu support. Reciple makes Discord.js command handling simple and cleaner using our built-in CLI tool.
            </div>
            <div class="buttons">
                <HomeButton style="Blue" href="/docs">Docs</HomeButton>
                <HomeButton href={githubHome} target="_blank">GitHub<Icon icon="mingcute:external-link-line"/></HomeButton>
            </div>
        </div>
        <div class="install-section section">
            <Install></Install>
        </div>
    </div>
</div>