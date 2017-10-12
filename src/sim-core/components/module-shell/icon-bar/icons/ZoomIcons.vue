<template>
    <div id="zoom-icons">
		<icon-zoom-out></icon-zoom-out>
		<icon-zoom-in></icon-zoom-in>
	</div>
</template>

<script>
import IconZoomOut from './ZoomOut'
import IconZoomIn from './ZoomIn'

export default {
    name: 'ZoomIcons',
    components: {
        IconZoomOut,
        IconZoomIn
    }
}
</script>

<style scoped>
#zoom-icons {
	position: relative;
	text-align: right;
    width: 76px;
    height: 20px;
	margin-top: 0px;
	margin-left: 0px;
    float: right;
}
</style>
