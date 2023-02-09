<script lang="ts">
    import Icon from '@iconify/svelte';

    export let source: string|null = null;
    export let icon: string|null = null;
    export let subTitle: string|null = null;
</script>

<style lang="scss">
    .title {
        margin: 0.5rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #3c3c3c;

        h1 {
            font-weight: bolder;
            font-size: 1.4em;
            display: flex;
            white-space: nowrap;

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
                margin-top: 0.2rem;
            }
        }

        h3 {
            font-size: 0.8rem;
            margin-top: 0;
            color: #bdbdbd;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 0.5rem;
            padding-bottom: 1rem;
            font-weight: 500;

            &.space {
                padding-left: 2.55rem;
            }
        }
    }
</style>

<div class="title">
    <h1>
        <span class="contents">
            {#if icon}
                <span class="icon">
                    <Icon {icon}/>
                </span>
            {/if}
            <slot></slot>
            {#if subTitle}
                <h3 class:space={icon}>{@html subTitle}</h3>
            {/if}
        </span>

        {#if source}
            <a href={source} class="link" title="View Source" target="_blank noreferrer">
                <Icon icon="ion:document-text-outline" inline={true}/>
            </a>
        {/if}
    </h1>
</div>