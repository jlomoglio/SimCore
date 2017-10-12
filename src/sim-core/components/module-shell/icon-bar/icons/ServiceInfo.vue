<template>
	<div id="si-wrapper">
		<div id="icon-service-info" :class="{ active: isActive }" @click="toggleMenu()"></div>
        <ul id="si-main-menu" v-if="this.$store.getters.getSiMenuOpen">
            <li class="hover"
    			v-for="item in menuItems"
    			@click="getAction({type:item.type, content:item.content, width:item.width, height:item.height})"
                v-show="(item.activeActivity <= activityIdNum) ? true : false"
    		>
                <span>{{ item.title }}</span>
            </li>
        </ul>
	</div>
</template>

<script>
import { pause } from '../../../../core/audio-player'
import MenuData from '../../../../../data/service-info-data.json'

export default {
    name: 'IconServiceInfo',
    data() {
        return {
            menuItems: MenuData,
            currentActivityView: this.$store.getters.getCurrentActivityView,
            currentActivityId: this.$store.getters.getCurrentActivityId,
            activityIdNum: this.$store.getters.getCurrentActivityId.slice(1)
        }
    },
    computed: {
        isActive() {
            return this.$store.getters.getServiceInfoIconIsEnabled
        }
    },
    methods: {
        toggleMenu() {
            pause()
            this.$store.commit('toggleSiMenu')
        },
        getAction (options) {
            this.$store.commit('showSiWindow', options)
            this.$store.commit('toggleSiMenu')
        }
    }
}
</script>


<style scoped>
#icon-service-info.active {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 20px;
    float: right;
    cursor: pointer;
	pointer-events: all;
    background: url(/assets/img/icons/si_active.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
#icon-service-info {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 20px;
    float: right;
    cursor: pointer;
	pointer-events: none;
    background: url(/assets/img/icons/si_inactive.png) 0% 0% / 100% 100%;
    background-origin: top center;
}

ul#si-main-menu {
	position: absolute;
    right: 0px;
    top: 15px;
    width: auto;
	min-width: 155px;
    height: auto;
    background: #fff;
    list-style: none;
	z-index: 13;
	-webkit-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
}

ul#si-main-menu li {
    margin-left: -40px;
    padding-top: 9px;
	padding-left: 10px;
	padding-right: 20px;
    padding-bottom: 9px;
	text-align: left;
	font-family: "Roboto-Medium";
    font-size: 14px;
}

ul#si-main-menu li.hover:hover {
	background-color: #dee0e2;
	color: #202021;
	cursor: pointer;
}
</style>
