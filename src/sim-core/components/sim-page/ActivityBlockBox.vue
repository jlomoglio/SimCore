<template>
	<div id="activity-block-box" v-if="this.blockBoxIsShown"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ActivityBlockBox',
    computed: mapGetters({
        blockBoxIsShown: 'getActivityBlockBoxIsShown'
    })
}
</script>

<style scoped>
#activity-block-box {
	position: absolute;
	left: 50%;
    margin-left: -500px;
	width: 1000px;
	background: rgba(0, 51, 204, 0.0) none repeat scroll 0 0;
    top: 75px;
	height: 580px;
	z-index: 10;
}
</style>
