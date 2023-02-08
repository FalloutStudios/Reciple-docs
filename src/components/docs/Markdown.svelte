<script lang="ts">
    import { marked, Renderer } from 'marked';
    export let content: string;
</script>

<div class="markdown-section">
    {@html marked(content, {
            headerIds: true,
            sanitize: true,
            mangle: true,
            breaks: true,
            gfm: true,
            pedantic: true,
            smartLists: true,
            smartypants: true,
            langPrefix: '',
            silent: false,
            renderer: new Renderer()
        })
    }
</div>