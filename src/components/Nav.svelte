<script lang="ts">
    import { githubHome } from '../scripts/data';
    import Icon from '@iconify/svelte';
</script>

<style lang="scss">
    :global(body) {
        padding-top: 68.32px;
    }

    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #181818;
        border-bottom: 1px solid #3c3c3c;

        .nav-container {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.5rem 2rem;

            .nav-links {
                display: flex;
                align-items: center;
                flex-shrink: 0;

                a {
                    color: #fff;
                    text-decoration: none;
                    padding: 1rem 2rem;
                    border-radius: 5px;
                    margin: 0 2px;

                    &:focus-visible {
                        background: rgba(60, 60, 60, 0.415);
                        outline: none;
                    }

                    &:first-child {
                        margin-left: 0;
                    }

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            .nav-whitespace {
                width: 100%;
                flex-shrink: 1;
            }

            .nav-utils {
                flex-shrink: 0;

                .nav-search {
                    border: 1px solid rgba(60, 60, 60, 0.415);
                    background: #303030;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    padding: 1rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;

                    .placeholder {
                        width: 100%;
                        opacity: 0.5;
                        font-size: 1rem;
                        padding-right: 3rem;
                    }
                }
            }
        }
    }
</style>

<div class="nav">
    <div class="nav-container">
        <div class="nav-links">
            <a href="/">Reciple</a>
            <a href="/docs">Documentation</a>
            <a href={githubHome} target="_blank noreferrer">GitHub <Icon icon="mingcute:external-link-line"/></a>
            <a href="https://discord.js.org/docs" target="_blank noreferrer">Discord.js <Icon icon="mingcute:external-link-line"/></a>
        </div>
        <div class="nav-whitespace"></div>
        <div class="nav-utils">
            <button class="nav-search">
                <span class="placeholder">
                    Search docs
                </span>
                <span class="icon">
                    <Icon icon="uil:search" class="icon"/>
                </span>
            </button>
        </div>
    </div>
</div>