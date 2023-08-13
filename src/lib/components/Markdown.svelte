<script lang="ts">
    import '../styles/markdown.scss';
    import type { MarkedOptions } from 'MarkedOptions';
    import { markdownOptions, markdownParser } from '../scripts/config';

    export let content: string;
    export let options: MarkedOptions = markdownOptions;

    $: html = markdownParser.parse(content, options);
</script>

<div class="markdown" {...$$props}>
    {#await html then text}
        {@html text ?? ''}
    {/await}
</div>