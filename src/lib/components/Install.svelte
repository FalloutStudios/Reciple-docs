<script lang="ts">
    import Icon from '@iconify/svelte';
    import caretRightBoldIcon from '@iconify/icons-ph/caret-right-bold';
    import checkBoldIcon from '@iconify/icons-ph/check-bold';
    import copyIcon from '@iconify/icons-tabler/copy';

    const installScripts = {
        npm: 'npm create reciple@latest',
        bun: 'bun create reciple@latest',
        yarn: 'yarn create reciple@latest',
        pnpm: 'pnpm create reciple@latest'
    };

    let packageManager = 'npm';
    let copied: boolean = false;

    $: command = installScripts[packageManager as keyof typeof installScripts];

    async function copyCommand(): Promise<void> {
        if (copied) return;

        await navigator.clipboard.writeText(command);
        copied = true;

        setTimeout(() => {
            copied = false;
        }, 1000);
    }
</script>

<style lang="scss">
    @import '../styles/variables.scss';

    .container {
        display: block;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        @include BorderedButton(#1c1b24, #373352);
        box-shadow: 0px 0px 120px -10px rgba($linkVisited, $alpha: 0.2);

        .tabs {
            display: flex;

            .tab {
                width: 100%;
                padding: 0.5rem 1rem;
                color: #bcbcbc;
                background: none;
                font-size: 0.7rem;
                font-weight: 500;
                letter-spacing: 0.1rem;
                text-transform: uppercase;
                border: none;

                &.active {
                    color: lighten($color: $link, $amount: 10);
                    font-weight: 600;
                }
            }
        }

        .content {
            padding: 10px 5px;
            font-family: monospace;
            display: flex;
            width: 100%;

            .icon,
            .copy {
                color: #999;
                padding: 0 10px;
                flex-shrink: 0;
                background: 0;
                border: none;
            }

            .copy {
                font-size: 1.2rem;
                color: #cfcfcf;
                cursor: pointer;

                &.copied {
                    color: rgb(35, 202, 35);
                }
            }

            .command {
                user-select: all;
                overflow: auto;
                width: 100%;
                white-space: nowrap;
            }
        }
    }
</style>

<div class="install-command container">
    <div class="tabs">
        {#each Object.keys(installScripts) as key}
            <button class:active={packageManager == key} class="tab {key}" on:click={(() => packageManager = key)}>{key}</button>
        {/each}
    </div>
    <div class="content">
        <span class="icon"><Icon icon={caretRightBoldIcon}/></span>
        <span class="command">{command}</span>
        <button class:copied={copied} class="copy" on:click={copyCommand}>
            {#key copied}<Icon icon={copied ? checkBoldIcon : copyIcon}/>{/key}
        </button>
    </div>
</div>