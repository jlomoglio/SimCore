<template>
    <div class="content-box" @click="clickable ? fn() : null">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ContentBox',
    props: ['clickable'],
    // data() {
    //     return {
    //         clickable: false
    //     }
    // },
    // mounted() {
    //     if (this.currentTask === this.task) {
    //         this.clickable = true
    //     }
    // },
    methods: {
        fn() {
            this.$emit('action')
        }
    }
}
</script>

<style scoped>
.content-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 590px;
    z-index: 2; /* Must be a 2 */
}
</style>
