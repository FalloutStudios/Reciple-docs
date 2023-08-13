import { Marked, type MarkedOptions } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { gfmHeadingId } from 'marked-gfm-heading-id';

export const githubHome = 'https://github.com/FalloutStudios/reciple';
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
    smartLists: true,
    gfm: true
};

export const markdownParser = new Marked(
    markedHighlight({
        langPrefix: "",
        highlight: (code, lang) => {
            const language = hljs.getLanguage(lang) ? lang : 'text';
            return hljs.highlight(code, { language }).value;
        }
    }),
    gfmHeadingId()
);