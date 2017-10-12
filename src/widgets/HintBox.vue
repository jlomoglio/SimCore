<template>
    <div :id="id" class="hint-box"></div>
</template>

<script>
export default {
    name: 'HintBox',
    props: ['id']
}
</script>

<style scoped>
.hint-box:hover {
    cursor: default;
}
</style>
