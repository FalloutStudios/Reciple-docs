<script lang="ts">
    import '../../assets/styles/markdown.scss';
    import highlighter from 'showdown-highlight';
    import { Converter } from 'showdown';
    import type { DocsData } from '../../data/DocsData';
  import { convertLinks } from '../../scripts/convertLinks';

    export let content: string;
    export let docs: DocsData|null = null;
</script>

<div class="markdown-section markdown" {...$$props}>
    {@html (new Converter({
        backslashEscapesHTMLTags: true,
        completeHTMLDocument: false,
        disableForced4SpacesIndentedSublists: true,
        ellipsis: false,
        emoji: true,
        encodeEmails: true,
        ghCodeBlocks: true,
        ghCompatibleHeaderId: true,
        omitExtraWLInCodeBlocks: true,
        openLinksInNewWindow: true,
        simpleLineBreaks: true,
        simplifiedAutoLink: true,
        smartIndentationFix: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        tasklists: true,
        underline: true,
        extensions: [
            highlighter({
                auto_detection: true,
                pre: true
            }),
        ]
    })).makeHtml(!docs ? content : convertLinks(content, docs))}
</div>