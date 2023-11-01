<style lang="scss">
    @import '$lib/styles/variables.scss';

    .brandings {
        display: flex;
        flex-direction: column;
        opacity: 0.7;

        .header {
            font-size: 0.9rem;
            margin: 0 7px;
        }

        .brands {
            display: flex;
            align-items: center;

            span {
                display: block;
                height: 30px;
                width: 1px;
                background: currentColor;
                opacity: 0.3;
                margin: 0.5rem;
            }

            .brand {
                margin: 0.5rem;

                img {
                    height: 40px;
                }
            }
        }
    }

    @media (max-width: 510px) {
        .brandings {
            .header {
                font-size: 0.7rem;
            }

            .brands {
                display: flex;

                span {
                    display: none;
                }

                .brand {
                    img {
                        height: unset;
                        max-height: 30px;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>

<div class="brandings">
    <h3 class="header">Made possible by</h3>
    <div class="brands">
        <a class="brand" href="https://thenorthsolution.com" target="_blank">
            <img src="/images/thenorthsolution.png" title="The North Solution" alt="">
        </a>
        <span></span>
        <a class="brand" href="https://github.com/FalloutStudios" target="_blank">
            <img src="/images/falloutstudios.png" title="Fallout Studios" alt="">
        </a>
    </div>
</div>