<script lang="ts">
    import Icon from '@iconify/svelte';
    import InfoIcon from '@iconify/icons-ph/info-bold';
    import WarningIcon from '@iconify/icons-ph/warning-bold';
    import DangerIcon from '@iconify/icons-ph/x-circle-bold'

    export let type: 'danger'|'success'|'info'|'warning' = 'info';
    export let title: string|null = null;
</script>

<style lang="scss">
    @import '$lib/styles/variables.scss';

    .alert {
        position: relative;
        display: flex;
        padding: 1rem;
        border: 2px solid currentColor;
        border-radius: 5px;
        background: transparent;
        margin: 1rem 0;
        align-items: center;
        font-size: 0.9em;

        .label {
            flex-shrink: 0;
            font-size: 1.2rem;
            margin-right: 0.5rem;
        }

        &.has-title {
            margin-top: 1.5rem;

            .label {
                position: absolute;
                top: -0.7em;
                left: 1rem;
                background: $bg;
                padding: 0.1rem 0.3rem;
                display: flex;
                align-items: center;
                font-weight: 600;

                .title {
                    font-size: 1rem;
                    margin-left: 0.4rem;
                }
            }
        }

        &.danger {
            color: $danger;
        }

        &.info {
            color: $blue;
        }

        &.warning {
            color: $warning;
        }

        &.success {
            color: $success;
        }

        .content {
            color: $white;
        }
    }
</style>

<div class="alert {type}" class:has-title={!!title}>
    <div class="label">
        <Icon icon={
            type === 'info'
                ? InfoIcon
                : type === 'warning'
                    ? WarningIcon
                    : DangerIcon
        } inline={true}/>
        {#if title}<span class="title">{title}</span>{/if}
    </div>
    <div class="content">
        <slot/>
    </div>
</div>