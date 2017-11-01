<template>
    <div id="moduleHeader">
        <div class="series">
			{{ this.$store.getters.getSeriesName1 }} {{ this.$store.getters.getSeriesName2 }}
		</div>
        <div id="module-activity-1" class="module-activity-names" v-if="this.getHeaderOneLine">
            <span class="module-name">{{ this.$store.getters.getModuleName }}</span>
         	<span class="divider" v-if="this.activityName && !this.startUpScreensPlaying"> /</span>
          	<span class="activity-name" v-if="this.activityName && !this.startUpScreensPlaying">
				{{ this.activityName }}
			</span>
        </div>
        <div id="module-activity-2" class="module-activity-names" v-else>
            <span class="module-name">{{ this.$store.getters.getModuleName }}</span>
            <span class="divider" v-if="this.activityName && !this.startUpScreensPlaying">:</span>
            <br />
          	<span class="activity-name" v-if="this.activityName && !this.startUpScreensPlaying">
				{{ this.activityName }}
			</span>
        </div>
        <div id="headerLogo"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ModuleHeader',
    data () {
        return {
            getHeaderOneLine: true
        }
    },
    mounted () {
        this.setActivityName(this.activityName)
    },
    computed: mapGetters({
        activityName: 'getActivityName',
        startUpScreensPlaying: 'getStartUpScreensPlaying'
    }),
    methods: {
        setActivityName (activityName) {
            const wrapCharCount = 56
            const moduleHeaderText = this.$store.getters.getModuleName + ' / ' + activityName
            if (moduleHeaderText.length > wrapCharCount) {
                this.getHeaderOneLine = false
            } else {
                this.getHeaderOneLine = true
            }
        }
    },
    watch: {
        activityName(newVal) {
            this.setActivityName(newVal)
        },
        startUpScreenCompleted (newVal) {
            this.showAfterStartUpScreen = newVal
        }
    }
}
</script>

<style scoped>
#moduleHeader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    background-color: white;
}

#moduleHeader .series {
	font-family: RobotoSlab-Bold;
	position: absolute;
	float: left;
	color: #D22027;
	font-size: 19px;
	line-height: 44px;
	top: 0px;
	left: 40px;
}

#moduleHeader .module-activity-names {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: absolute;
	float: left;
	top: 0px;
	left: 290px;
	margin-bottom: 10px;
}

#moduleHeader #module-activity-1 .module-name {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: relative;
	margin-top: 10px;
	margin-right: 5px;
    padding-left: 15px;
	float: left;
}

#moduleHeader #module-activity-1 .divider {
	margin-top: 10px;
    margin-left: 0px;
	position: relative;
	float: left;
}

#moduleHeader #module-activity-1 .activity-name {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: relative;
	float: left;
	margin-top: 10px;
	margin-left: 5px;
	margin-bottom: 10px;
}

#moduleHeader #module-activity-2 {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: absolute;
	float: left;
	top: -5px;
	left: 290px;
	margin-bottom: 4px;
}

#moduleHeader #module-activity-2 .module-name {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: relative;
	margin-top: 7px;
	margin-right: 5px;
    margin-left: 15px;
	float: left;
}

#moduleHeader #module-activity-2 .divider {
	margin-top: 6px;
    margin-left: -5px;
	position: relative;
	float: left;
}

#moduleHeader #module-activity-2 > .activity-name {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: relative;
	float: left;
	margin-top: -6px;
	margin-left: 15px;
	margin-bottom: 0px;
}



#moduleHeader #headerLogo {
	position: absolute;
	float: right;
	top:2px;
	right: 40px;
	width: 100px;
	height: 45px;
	background: url(/assets/img/module/hlogo.png);
	display: block;
}
</style>
