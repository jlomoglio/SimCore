<template>
    <div id="icon-bar" v-if="this.$store.getters.getIconBarIsShown">
		<div id="optional-icons">
			<zoom-icons v-if="zoomIsShown"></zoom-icons>
			<icon-service-info v-if="serviceInfoIsShown"></icon-service-info>
			<icon-tool-tray v-if="toolTrayIsShown"></icon-tool-tray>
			<icon-parts-department v-if="partsDepartmentIsShown"></icon-parts-department>
		</div>
		<icon-mute-audio></icon-mute-audio>
		<icon-repeat-audio></icon-repeat-audio>
		<icon-closed-caption></icon-closed-caption>
		<icon-main-menu></icon-main-menu>
		<icon-close></icon-close>
    </div>
</template>

<script>
/** Optional Icons ******************************/
import ZoomIcons from './icons/ZoomIcons'
import IconServiceInfo from './icons/ServiceInfo'
import IconToolTray from './icons/ToolTray'
import IconPartsDepartment from './icons/PartsDepartment'

/** Required Icons ******************************/
import IconMuteAudio from './icons/MuteAudio'
import IconRepeatAudio from './icons/RepeatAudio'
import IconClosedCaption from './icons/ToggleCC'
import IconMainMenu from './icons/MainMenu'
import IconClose from './icons/CloseModule'

export default {
    name: 'IconBar',
    components: {
        ZoomIcons,
        IconServiceInfo,
        IconToolTray,
        IconPartsDepartment,

        IconMuteAudio,
        IconRepeatAudio,
        IconClosedCaption,
        IconMainMenu,
        IconClose
    },
    computed: {
        partsDepartmentIsShown () {
            return this.$store.getters.getPartsDepartmentIconIsShown
        },
        serviceInfoIsShown () {
            return this.$store.getters.getServiceInfoIconIsShown
        },
        toolTrayIsShown () {
            return this.$store.getters.getToolTrayIconIsShown
        },
        zoomIsShown () {
            return this.$store.getters.getZoomIconIsShown
        }
    }
}
</script>

<style scoped>
#icon-bar {
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    height: 30px;
    background-color: black;
    z-index: 20;
}

#optional-icons {
	position: absolute;
    top: 0px;
    left: 0;
    right: 220px;
    height: 30px;
	text-align: right;
}
</style>
