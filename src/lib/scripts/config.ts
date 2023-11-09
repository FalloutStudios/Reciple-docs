import { Marked, type MarkedOptions } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import hljsDiff from 'highlightjs-code-diff/dist/index';
import { gfmHeadingId } from 'marked-gfm-heading-id';

export const githubHome = 'https://github.com/thenorthsolution/reciple';
export const npmHome = 'https://npmjs.com/package/reciple';

export const navLinks: { name: string; href: string; blank?: boolean; }[] = [
    {
        name: 'Reciple',
        href: '/'
    },
    {
        name: 'GitHub',
        href: githubHome,
        blank: true
    },
    {
        name: 'Discord.js',
        href: 'https://discordjs.dev',
        blank: true
    }
];

export let markdownOptions: MarkedOptions = {
    gfm: true
};

export enum EscapedHTMLEntities {
    '"' = '&quot;',
    "<" = '&lt;',
    ">" = '&gt;'
}

export enum UnescapedHTMLEntities {
    '&quot;' = '"',
    '&lt;' = "<",
    '&gt;' = ">"
}

export enum Colors {
    BG= "#181818",
    WHITE = "#f7f7f7",
    LINK = "#5a69f1",
    LINK_VISITED = "#5a38f0",
    Danger = "#ee4747",
    DARK = "#222222",
    BORDER = "#3c3c3c",
}

export const highlightjs = hljsDiff(hljs);

export const markdownParser = new Marked(
    markedHighlight({
        langPrefix: "",
        highlight: (code, lang) => {
            const language = highlightjs.getLanguage(lang) ? lang : 'text';

            return highlightjs.highlight(code, { language }).value;
        }
    }),
    gfmHeadingId()
);