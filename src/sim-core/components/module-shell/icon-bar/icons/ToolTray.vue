<template>
    <div id="icon-tool-tray" :class="{ active: isActive }" @click="show()"></div>
</template>

<script>
export default {
    name: 'IconToolTray',
    computed: {
        isActive () {
            return this.$store.getters.getToolTrayIconIsEnabled
        }
    },
    methods: {
        show () {
            this.$store.commit('showToolTray')
        }
    }
}
</script>


<style scoped>
#icon-tool-tray.active {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 20px;
    float: right;
    cursor: pointer;
	pointer-events: all;
    background: url(/assets/img/icons/tools_icon_active.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
#icon-tool-tray {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 20px;
    float: right;
    cursor: pointer;
	pointer-events: none;
    background: url(/assets/img/icons/tools_icon_inactive.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
</style>
