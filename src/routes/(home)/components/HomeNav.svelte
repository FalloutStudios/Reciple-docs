<script lang="ts">
    import Icon from '@iconify/svelte';

    export let navScroll: boolean = false;
</script>

<div class="home-nav" class:active={navScroll}>
    <div class="nav-container">
        <span class="brand">reciple</span>
        <div class="links">
            <div class="pages">
                <a href="/guide">Guide</a>
                <a href="/docs">Docs</a>
            </div>
            <div class="external">
                <a href="https://discord.gg/2gyckrwK7b">
                    <Icon icon="bi:discord"/>
                </a>
                <a href="https://github.com/thenorthsolution/reciple">
                    <Icon icon="bi:github"/>
                </a>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$lib/styles/variables.scss';

    .home-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 80;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;

        .nav-container {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 0.8rem 2rem;
            max-width: 1200px;
            border: 1px solid transparent;
            border-radius: 5px;
            transition: 0.3s ease-in-out;
            height: 4rem;

            .brand {
                font-size: 2rem;
                font-weight: 600;
                color: #fff;
                flex-shrink: 0;
            }

            .links {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin-left: 2rem;

                .pages {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.5rem;

                    a {
                        text-decoration: none;
                        font-weight: 500;
                        color: $white;
                        padding: 0.2rem 0.5rem;
                        border-radius: 0.3rem;
                    }
                }

                .external {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    a {
                        height: 2rem;
                        width: 2rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: $white;
                        font-size: 1.5rem;
                    }
                }
            }
        }

        &.active {
            .nav-container {
                @include GlassBackdrop();
                background: rgba(rgb(19, 19, 26), $alpha: 0.7);
                border: 1px solid rgb(25, 24, 29);
            }
        }

        @media (max-width: 490px) {
            .nav-container {
                .links {
                    justify-content: end;

                    .external {
                        display: none;
                    }
                }
            }
        }

        @media (max-width: 400px) {
            .nav-container {
                padding: 0.8rem 1.5rem;

                .brand {
                    font-size: 1.7rem;
                }
            }
        }
    }
</style>