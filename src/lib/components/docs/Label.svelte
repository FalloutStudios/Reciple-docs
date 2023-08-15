<script lang="ts">
    export let label: string;

    let labelWidth: number;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .label-container {
        display: flex;
        width: 100%;
        margin: 0.2rem 0;

        .label {
            font-weight: 600;
            font-size: 1rem;
            padding-right: 0.5rem;
            flex-shrink: 0;
        }

        .label-content {
            @include WordWrap();
            font-size: 0.85rem;
            line-height: 1.4rem;
            vertical-align: middle;
        }
    }
</style>

<div class="label-container" {...$$props}>
    <div class="label" bind:offsetWidth={labelWidth}>{label}:</div>
    <div class="label-content" style="max-width: calc(100% - {labelWidth}px);"><slot/></div>
</div>