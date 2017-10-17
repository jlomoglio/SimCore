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

<!-- <style scoped>
#zoom-panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    margin: 10px;
    /* background: #fff; */
    /* background: linear-gradient(0deg, #ffffb3, white); */
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(251,248,203,1) 100%);
    box-sizing: border-box;
    box-shadow: 4px 5px 10px 3px rgba(0,0,0,0.6);
}
</style> -->
<style scoped>
#zoom-panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/module/content_area_bg.png");
}
</style>
