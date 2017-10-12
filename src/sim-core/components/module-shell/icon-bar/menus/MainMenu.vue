<template>
    <ul id="menu-main-menu" v-if="this.$store.getters.getMainMenuOpen">
        <li id="tasks" class="hover" @click="loadTaskWindow()">
            <span class="noarrow"></span><span>Tasks</span>
        </li>
        <li id="videos" class="hover" @click="toggleVideoSubMenu()">
            <span class="rarrow"></span><span>Videos</span>
            <video-sub-menu></video-sub-menu>
        </li>
        <li id="activities" class="hover" @click="toggleActivitySubMenu()">
            <span class="rarrow"></span><span>Activities</span>
            <activity-sub-menu></activity-sub-menu>
        </li>
        <li id="version">
			<span id="versionText">Version: {{ version }}</span>
		</li>
    </ul>
</template>

<script>
import VideoSubMenu from './VideoSubMenu'
import ActivitySubMenu from './ActivitySubMenu'
import AudioPlayer from '../../../../core/audio-player'

export default {
    name: 'MenuMainMenu',
    components: {
        VideoSubMenu,
        ActivitySubMenu
    },
    data () {
        return {
            version: this.$store.getters.getModuleVersion,
            taskActive: null,
            videoActive: null,
            activityActive: null
        }
    },
    methods: {
        loadTaskWindow () {
            this.$store.commit('openTaskWindow')
            this.$store.commit('toggleMainMenu')
            AudioPlayer.mute()
        },
        toggleVideoSubMenu () {
            this.$store.commit('toggleVideoSubMenu')
        },
        toggleActivitySubMenu () {
            this.$store.commit('toggleActivitySubMenu')
        }
    }
}
</script>


<style scoped>
ul#menu-main-menu {
	position: absolute;
    right: 50px;
    top: 59px;
    width: 155px;
    height: auto;
    background: #fff;
    list-style: none;
	z-index: 13;
	-webkit-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
}

ul#menu-main-menu li {
    margin-left: -40px;
    padding-top: 9px;
    padding-bottom: 9px;
	text-align: left;
	font-family: "Roboto-Medium";
    font-size: 14px;
}

.task-active, .video-active, .activity-active {
	background-color: #9a9c9e;
}

.task-active:hover, .video-active:hover, .activity-active:hover {
	background-color: #9a9c9e;
}

ul#menu-main-menu li.hover:hover {
	background-color: #dee0e2;
	color: #202021;
	cursor: pointer;
}

ul#menu-main-menu li#version {
    font-family: "Roboto-Medium";
    font-size: 14px;
    padding-left: 29px;
}

ul#menu-main-menu li ul.submenuVideos {
    position: absolute;
    right: 170px;
    top: 34px;
    width: 245px;
    height: auto;
    background: #fff;
    display: none;
    list-style: none;
	-webkit-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
}

ul#menu-main-menu li span.rarrow {
    height: 16px;
    width: 8px;
    float: left;
    margin-left: 12px;
    margin-right: 10px;
	margin-top: 2px;
    background: url(/assets/img/icons/rarrow.png);
}

ul#menu-main-menu li span.noarrow {
    height: 16px;
    width: 8px;
    float: left;
    margin-left: 12px;
    margin-right: 10px;
}
</style>
