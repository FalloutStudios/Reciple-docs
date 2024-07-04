<script lang="ts">
    import { afterNavigate, beforeNavigate } from '$app/navigation';

    export let ready = true;

    beforeNavigate(() => ready = false);
    afterNavigate(() => ready = true);
</script>

{#if !ready}
<style>
    html {
        overflow: hidden;
    }
</style>
<div class="page-loader"><div class="progress"></div></div>
{/if}

<style lang="scss">
    @import '$lib/styles/variables.scss';

    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        background: rgba($bg, $alpha: 0.1);
        @include GlassBackdrop(1px);

        .progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: $border;

            &::after {
                content: '';
                display: block;
                height: 100%;
                width: 95%;
                background: $link;
                animation: progress 3s cubic-bezier(0.075, 0.82, 0.165, 1);
            }
        }
    }

    @keyframes progress {
        from {
            width: 0%;
        }

        50% {
            width: 40%;
        }

        70% {
            width: 80%;
        }

        80% {
            width: 90%;
        }

        to {
            width: 95%;
        }
    }
</style>