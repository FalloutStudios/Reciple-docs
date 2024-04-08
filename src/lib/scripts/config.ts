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
            const language = highlightjs.getLanguage(lang) ? lang : lang ?? undefined;

            return highlightjs.highlight(code, { language }).value;
        }
    }),
    gfmHeadingId()
);

export const date = new Date();
export const consolePrefix = (dir = '~/') => `<b><span class="green">catplvsplus@user</span>:<span class="blue">${dir}</span></b>$`;
export const consoleSteps: (({ content: string; delay?: number; }|string)[]|{ content: string; delay?: number; }|string)[] = [
    { content: `${consolePrefix()} npm create reciple@latest ./ -- --force --typescript --esm -a reciple-anticrash --package-manager npm --token YOUR_TOKEN`, delay: 1000 },
    { content: `<span>$ npm install</span>`, delay: 500 },
    [
        { content: '⠋ Installing dependencies...', delay: 100 },
        { content: '⠙ Installing dependencies...', delay: 100 },
        { content: '⠹ Installing dependencies...', delay: 100 },
        { content: '⠸ Installing dependencies...', delay: 100 },
        { content: '⠼ Installing dependencies...', delay: 100 },
        { content: '⠴ Installing dependencies...', delay: 100 },
        { content: '⠦ Installing dependencies...', delay: 100 },
        { content: '⠧ Installing dependencies...', delay: 100 },
        { content: '⠇ Installing dependencies...', delay: 100 },
        { content: '⠏ Installing dependencies...', delay: 100 },
        '<i>Added 154* packages, and audited 155* packages</i>',
    ],
    { content: `<span>$ npx reciple '/home/user/bot' --setup -c reciple.mjs</span>`, delay: 500 },
    { content: `<span>$ npm install reciple-anticrash</span>`, delay: 500 },
    [
        { content: '⠋ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠙ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠹ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠸ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠼ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠴ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠦ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠧ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠇ Installing <b>reciple-anticrash</b>...', delay: 100 },
        { content: '⠏ Installing <b>reciple-anticrash</b>...', delay: 100 },
        '<i>Added 4* packages, and audited 159* packages</i>',
    ],
    `${consolePrefix('~/bot')} npm run start`,
    { content: `<span>$ npm run start</span>`, delay: 500 },
    { content: `[${date.getHours()}:${date.getMinutes()}:59 INFO] Starting Reciple client v8.3.2 - ${date.toISOString()}`, delay: 200 },
    { content: `[${date.getHours()}:${date.getMinutes()}:59 INFO] Started module <span class="cyan">'reciple-anticrash'</span>` },
    { content: `[${date.getHours()}:${date.getMinutes()}:59 INFO] Started module <span class="cyan">'/home/user/bot/modules/example.js'</span>`, delay: 500 },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO][AntiCrash] Listening to client error events!` },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO][AntiCrash] Listening to process error events!`, delay: 500 },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO] Loaded module <span class="cyan">'reciple-anticrash'</span>` },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO] Loaded module <span class="cyan">'/home/user/bot/modules/example.js'</span>`, delay: 500 },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO] Registered (2) application commands globally`, delay: 500 },
    { content: `<span class="yellow">[${date.getHours()}:${date.getMinutes()}:01 WARN]</span> Logged in as <span class="cyan">Cat#6909</spab> <span class="magenta">(749120018771345488)</span>`, delay: 200 },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO] Loaded 1 context menu command(s)` },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO] Loaded 1 message command(s)` },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO] Loaded 1 slash command(s)` },
    { content: `[${date.getHours()}:${date.getMinutes()}:01 INFO] Loaded 2 precondition(s)` },
];