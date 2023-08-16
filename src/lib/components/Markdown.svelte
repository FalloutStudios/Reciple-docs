<script lang="ts">
    import '../styles/markdown.scss';
    import type { MarkedOptions } from 'MarkedOptions';
    import { markdownOptions, markdownParser } from '../scripts/config';

    export let content: string;
    export let options: MarkedOptions = markdownOptions;
    export let inline: boolean = false;

    $: html = inline ? markdownParser.parseInline(content, options) : markdownParser.parse(content, options);
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    .markdown.inline {
        width: 100%;
        position: relative;
        margin-bottom: 1rem;
        @include WordWrap();
    }
</style>

<div {...$$props} class="markdown" class:inline>
    {#await html then text}
        {@html text ?? ''}
    {/await}
</div>