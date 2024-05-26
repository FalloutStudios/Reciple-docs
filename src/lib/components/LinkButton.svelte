<style lang="scss">
    @import '../styles/variables.scss';

    a {
        display: inline-flex;
        padding: 0.6rem 1.2rem;
        color: $white;
        @include BorderedButton();
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: bold;
        align-items: center;


        &:hover,
        &:focus {
            background: rgba($dark, $alpha: .8);
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