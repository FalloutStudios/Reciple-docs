<script lang="ts">
    import { onMount } from 'svelte';
    import { consoleSteps } from '../scripts/config';
    import { sleep } from '../scripts/helpers';

    let console: HTMLPreElement;
    let index: number = 0;

    onMount(async () => {
        if (!console) return;

        printConsoleOutput();
    });

    async function printConsoleOutput() {
        const output = consoleSteps[index];
        const step = typeof output === 'string' ? { content: output } : output;
        const element = document.createElement('p');

        if (Array.isArray(step)) {
            let subIndex: number = 0;

            console.appendChild(element);

            for (const subStep of step) {
                const delay = typeof subStep === 'string' ? 0 : subStep.delay;
                const content = typeof subStep === 'string' ? subStep : subStep.content;

                element.innerHTML = content;

                subIndex++;
                if (delay) await sleep(delay);
                if (subIndex > step.length) break;
            }
        } else {
            element.innerHTML = step.content;
            console.appendChild(element);

            if (step.delay) await sleep(step.delay);
        }

        element.scrollIntoView({ behavior: 'delay' in step && (step.delay ?? 0) <= 499 ? 'instant' : 'smooth' })

        index++;
        if (index > consoleSteps.length) return;

        await printConsoleOutput();
    }
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    .console-container {
        display: block;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        height: 100%;
        @include BorderedButton(#1c1b24, #373352);
        box-shadow: 0px 0px 120px -10px rgba($linkVisited, $alpha: 0.2);

        .console-content {
            padding: 1rem;
            height: 100%;
            font-family: 'Courier New', Courier, monospace;
            text-wrap: pretty;
            font-size: 0.8rem;
            overflow-y: scroll;

            :global(span) {
                color: darken($white, $amount: 50);
            }

            :global(.green) {
                color: $success;
            }

            :global(.blue) {
                color: $link;
            }

            :global(red) {
                color: $danger;
            }

            :global(.cyan) {
                color: rgb(93, 201, 228);
            }

            :global(.magenta) {
                color: rgb(194, 74, 158);
            }

            :global(.yellow) {
                color: rgb(233, 187, 59);
            }
        }
    }
</style>

<div class="console-container">
    <pre class="console-content" bind:this={console}></pre>
</div>