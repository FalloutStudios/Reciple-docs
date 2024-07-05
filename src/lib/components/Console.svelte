<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { consolePrefix, consoleSteps } from '../scripts/config';
    import { isVisibleInViewport, sleep } from '../scripts/helpers';

    let console: HTMLPreElement;
    let index: number|null = 0;

    onMount(async () => {
        if (!console) return;

        printConsoleOutput();
    });

    onDestroy(async () => {
        index = null;
    });

    async function printConsoleOutput() {
        if (index === null) {
            index = 0;
            return;
        }

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

        if (isVisibleInViewport(element)) console.scrollBy({ top: console.scrollHeight, behavior: 'smooth' });

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
        color: $white;
        @include BorderedButton(#15131d, #373352);
        box-shadow: 0px 0px 120px -10px rgba($linkVisited, $alpha: 0.2);

        .console-content {
            padding: 1rem;
            padding-top: 0.4rem;
            height: 100%;
            font-family: 'Courier New', Courier, monospace;
            text-wrap: pretty;
            font-size: 0.8rem;
            overflow-y: scroll;

            :global(span) {
                color: rgba($white, $alpha: 0.7);
            }

            :global(.green) {
                color: $success;
            }

            :global(.blue) {
                color: $blue;
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

        .topbar {
            padding: 0.4rem;
            text-align: center;
            width: 100%;
            background: rgba($border, $alpha: 0.1);
            position: relative;

            .title {
                font-size: 0.8rem;
            }

            .controls {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                height: 100%;

                span {
                    height: 0.7rem;
                    width: 0.7rem;
                    border-radius: 50%;
                    background: currentColor;
                    flex-shrink: 0;
                    margin: 0 0.2rem;

                    &:nth-child(1) {
                        color: darken($danger, $amount: 5);
                        margin-left: 0.8rem;
                    }

                    &:nth-child(2) {
                        color: rgb(252, 169, 44);
                    }

                    &:nth-child(3) {
                        color: darken($success, $amount: 20);
                        margin-right: 0;
                    }
                }
            }
        }
    }
</style>

<div class="console-container">
    <div class="topbar">
        <div class="controls" on:click={() => { console.innerHTML = ''; index = 0; printConsoleOutput();}}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h3 class="title">catplvsplus@user</h3>
    </div>
    <pre class="console-content" bind:this={console}></pre>
</div>