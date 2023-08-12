<script lang="ts">
    import DOMPurify from 'dompurify';
    import '../styles/markdown.scss';
    import type { MarkedOptions } from 'MarkedOptions';
    import { markdownOptions, markdownParser } from '../scripts/config';

    export let content: string;
    export let options: MarkedOptions = markdownOptions;

    const html = markdownParser.parse(content, options);
</script>

<div class="markdown" {...$$props}>
    {#await html then text}
        {@html DOMPurify.sanitize(text ?? '')}
    {/await}
</div>