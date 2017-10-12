<template>
    <div :id="id" class="hot-spot" @click="clickable ? fn() : null"></div>
</template>

<script>
export default {
    name: 'HotSpot',
    props: ['id', 'currentTask', 'task'],
    computed: {
        clickable() {
            if (this.currentTask === this.task) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        fn() {
            if (this.currentTask === this.task) {
                this.clickable = true
                this.$emit('action')
            } else {
                this.clickable = false
            }
        }
    }
}
</script>

<style scoped>
.hot-spot:hover {
    cursor: default;
}
</style>
