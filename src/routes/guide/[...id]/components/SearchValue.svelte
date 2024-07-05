<script lang="ts">
    export let name: string;
    export let category: string;
</script>

<span class="search-value">
    <span class="category">{category}</span>
    <span>{name}</span>
</span>

<style lang="scss">
    @import '$lib/styles/variables.scss';

    .search-value {
        text-wrap: nowrap;

        .category {
            display: inline-block;
            font-size: 0.9em;
            opacity: 0.5;
            margin-right: 0.5em;
            padding: 0.1rem 0.4em;
            border-radius: 0.3em;
            background: rgba($white, $alpha: 0.1);
            color: #fff;
            border: 1px solid $border;
            font-weight: 400;
            width: fit-content;
        }
    }
</style>