<script lang="ts">
    export let label: string;

    let labelWidth: number;
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    .label-container {
        display: flex;
        width: 100%;
        margin: 0.2em 0;

        .label {
            font-weight: 500;
            font-size: 1em;
            padding-right: 0.3rem;
            flex-shrink: 0;
        }

        .label-content {
            @include WordWrap();
            font-size: 0.85em;
            line-height: 1.5em;
            vertical-align: middle;
            opacity: 0.85;
        }
    }
</style>

<div class="label-container" {...$$props}>
    <div class="label" bind:offsetWidth={labelWidth}>{label}:</div>
    <div class="label-content" style="max-width: calc(100% - {labelWidth}px);"><slot/></div>
</div>