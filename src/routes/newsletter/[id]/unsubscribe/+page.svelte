<script lang="ts">
    const { data } = $props();

    const message: string = $derived(data.message);
</script>

{message}