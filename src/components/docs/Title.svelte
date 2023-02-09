<script lang="ts">
    import Icon from '@iconify/svelte';

    export let source: string|null = null;
    export let icon: string|null = null;
</script>

<style lang="scss">
    h1 {
        font-weight: bolder;
        font-size: 1.4em;
        margin: 0.5 !important;
        padding-bottom: 1.5rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #3c3c3c;

        .contents {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;

            .icon {
                display: inline-block;
                margin-right: 0.5rem;
                vertical-align: middle;
                font-size: 1.2em;
            }
        }

        .link {
            flex-shrink: 0;
            margin-left: 1rem;
        }
    }
</style>

<h1>
    <span class="contents">
        {#if icon}
            <span class="icon">
                <Icon {icon}/>
            </span>
        {/if}
        <slot></slot>
    </span>

    {#if source}
        <a href={source} class="link" target="_blank noreferrer">
            <Icon icon="ion:document-text-outline" inline={true}/>
        </a>
    {/if}
</h1>