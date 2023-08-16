<script lang="ts">
    import type { IconifyIcon } from '@iconify/svelte';
    import Icon from '@iconify/svelte';
    import { Colors } from '../../scripts/config';

    export let label: string;
    export let icon: string|IconifyIcon|null = null;
    export let borderColor: string|Colors = Colors.LINK;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .floating-label-container {
        position: relative;
        display: block;

        .floating-label-content {
            border-radius: 5px;
            padding: 1rem;
            margin-top: 0.2rem;

            :global(.markdown) {
                margin-bottom: 0;
            }

            .floating-label {
                position: absolute;
                top: -0.5rem;
                left: 1.5rem;
                background: $bg;
                padding: 0 0.5rem;
                display: flex;
                align-items: center;
                font-weight: 500;

                :global(.icon) {
                    margin-right: 0.4rem;
                    font-size: 1.1rem;
                }
            }
        }
    }
</style>

<div class="floating-label-container">
    <div class="floating-label-content" style="border: 2px solid {borderColor};">
        <div class="floating-label" style="color: {borderColor};">
            {#if icon}<Icon {icon} class="icon"/>{/if}
            <span class="text">{label}</span>
        </div>
        <div class="floating-label-slot"><slot/></div>
    </div>
</div>