<template>
    <div id="zoom-panel" :style="bgimg">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ZoomPanel',
    props: ['bgimg']
}
</script>

<style scoped>
#zoom-panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
</style>
