<template>
	<ul id="activity-sub-menu" v-if="this.$store.getters.getActivitySubMenuOpen">
		<li :class="{ 'active': activity.id === currentActivityId }"
			class="activity-sub-menu-item"
			v-for="(activity, index) in filterActivity(activities)"
			@click="loadActivity(activity.id)"
		>
			<div class="activity-tick-container" v-if="activity.completed">
				<img src="/assets/img/icons/tick.png" class="activity-tick">
			</div>
			<div class="activity-tick-container" v-else></div>
			<span class="activity-title">{{ activity.title }}</span>
			<span class="darrow" v-if="index === 0"></span>
		</li>
	</ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ActivitySubMenu',
    methods: {
        filterActivity(activities) {
            activities.filter((activity) => {
                if (activity.id === this.currentActivityId) {
                    this.isActive = true
                }
            })
            return activities
        },
        loadActivity (activityId) {
            if (activityId !== this.currentActivityId) {
                this.$store.commit('setSkipToActivityId', activityId)
                this.$store.commit('showSkipActivityAlertIsShown')
            }
        }
    },
    computed: {
        ...mapGetters({
            activities: 'getActivitySubMenuItems',
            currentActivityId: 'getCurrentActivityId'
        })
    }
}
</script>


<style scoped>
ul#activity-sub-menu {
	position: absolute;
    right: 168px;
    top: 74px;
    width: 220px;
    height: auto;
    background: #fff;
    list-style: none;
	-webkit-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.5);
}

ul#activity-sub-menu li.activity-sub-menu-item {
	margin-left: -40px;
	text-indent: -11px;
	padding-left: 30px;
	padding-top: 9px;
    padding-bottom: 9px;
	z-index: 11;
}

ul#activity-sub-menu li.activity-sub-menu-item.active {
	background-color: #9a9c9e;
	color: #202021;
	cursor: pointer;
}

ul#activity-sub-menu li.activity-sub-menu-item:hover {
	background-color: #dee0e2;
	color: #202021;
	cursor: pointer;
}

ul#activity-sub-menu li > span.activity-title {
	font-family: "Roboto-Medium";
    font-size: 14px;
}

ul#activity-sub-menu li > span.darrow {
	height: 8px;
	width: 16px;
	float: right;
	margin-right: 5px;
	margin-top: 8px;
	background: url(/assets/img/icons/darrow.png);
	z-index: 10;
}

.activity-tick-container {
	float: left;
	margin-left: -20px;
	margin-right: 15px;
	width: 17px;
    height: 22px;
}

.activity-tick {
	width: 17px;
    height: 17px;
	margin-left: 7px;
}
</style>
