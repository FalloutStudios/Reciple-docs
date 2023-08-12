<style lang="scss">
    @import '../styles/variables.scss';

    a {
        display: inline-block;
        padding: 0.6rem 1.2rem;
        color: $white;
        @include BorderedButton();
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: bold;


        &:hover,
        &:focus {
            background: rgba($border, $alpha: .5);
        }

        &:focus-visible {
            outline: 4px $link solid;
        }

        &.blue {
            @include BorderedButton($link, lighten($link, $amount: 3));

            &:hover,
            &:focus {
                background: rgba($link, $alpha: .95);
            }

            &:focus-visible {
                outline-color: currentColor;
            }
        }
    }
</style>

<a {...$$props}><slot/></a>