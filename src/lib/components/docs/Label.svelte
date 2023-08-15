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
            padding-right: 0.3em;
            flex-shrink: 0;
            margin-top: 0.1em
        }

        .label-content {
            @include WordWrap();
            opacity: 0.8;
            width: 100%;
            font-size: 0.95em;
            margin-top: 0.1rem;
        }
    }
</style>

<div {...$$props} class="label-container">
    <div class="label" bind:offsetWidth={labelWidth}>{label}:</div>
    <div class="label-content" style="max-width: calc(100% - {labelWidth}px);"><slot/></div>
</div>