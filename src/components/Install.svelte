<script lang="ts">
    import Icon from '@iconify/svelte';

    const installScripts = {
        npm: 'npm i reciple discord.js',
        yarn: 'yarn add reciple discord.js',
        pnpm: 'pnpm add reciple discord.js'
    };

    let packageManager: keyof typeof installScripts = 'npm';
    let copied: boolean = false;

    $: command = installScripts[packageManager];

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
    .container {
        display: block;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 5px;
        background: rgba($color: #FFF, $alpha: 0.05);
        border: 1px solid rgba(60, 60, 60, 1.0);
        width: 100%;

        .tabs {
            display: flex;

            .tab {
                width: 100%;
                padding: 0.5rem 1rem;
                color: #bcbcbc;
                background: none;
                font-size: 0.8rem;
                font-weight: 500;
                text-transform: uppercase;
                border: none;

                &.active {
                    color: #fff;
                    background-color: rgba($color: #000, $alpha: 0.05);
                }
            }
        }

        .content {
            padding: 10px 5px;
            font-family: 'Courier New', Courier, monospace;
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
        <button class:active={packageManager == 'npm'} class="tab npm" on:click={(() => packageManager = 'npm')}>npm</button>
        <button class:active={packageManager == 'yarn'} class="tab yarn" on:click={(() => packageManager = 'yarn')}>yarn</button>
        <button class:active={packageManager == 'pnpm'} class="tab pnpm" on:click={(() => packageManager = 'pnpm')}>pnpm</button>
    </div>
    <div class="content">
        <span class="icon"><Icon icon="ph:caret-right-bold"/></span>
        <span class="command">{command}</span>
        <button class:copied={copied} class="copy" on:click={copyCommand}>
            {#if copied}
                <Icon icon="ic:outline-check"/>
            {:else}
                <Icon icon="tabler:copy" />
            {/if}
        </button>
    </div>
</div>