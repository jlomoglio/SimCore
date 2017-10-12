<template>
    <div :id="id" :style="{ 'background-image': 'url(/assets/img/activities/' + background + ')' }" class="view-box">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ViewBox',
    props: ['id', 'background']
}
</script>

<style scoped>
.view-box {
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 590px;
    background-size: 105%;
}
</style>
