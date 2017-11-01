<template>
    <div id="devBox">
        <div id="titlebar">
            <div id="title">Developer ToolBox</div>
            <div id="tabBar">
                <div @click="loadTab('general')" id="general" class="tab active">General</div>
            </div>
            <div @click="close" id="close">&#x25BC;</div>
            <div @click="open" id="open">&#x25B2;</div>
        </div>
        <div id="tabContainer_General">
            <div id="col1">
                <div id="mainViewField">
                    <label>Set Module View:</label>
                    <select id="pageName" class="dbox" v-model="currentPage">
                        <option
                            v-for="option in pageOptions"
                            :selected="option.value === currentPage"
                            :value="option.value"
                        >
                            {{ option.text }}
                        </option>
                    </select>

                    <select id="activityName" class="dbox" v-model="currentActivity" v-if="currentPage === 'SimPage'">
                        <option
                            v-for="activity in activityOptions"
                            :selected="activity.id === currentActivity ? 'selected' : null"
                            :value="activity.id"
                        >
                            {{ activity.id }}
                        </option>
                    </select>

                    <select id="activityViewName" class="dbox" v-model="currentActivityView" v-if="currentPage === 'SimPage'">
                        <option
                            v-for="av in getActivityViews(currentActivity)"
                            :selected="av.id === currentActivityView ? 'selected' : null"
                            :value="av.id"
                        >
                            {{ av.id }}
                        </option>
                    </select>

                    <button @click="loadView()">Go</button>

                    <label id="useLTIData" for="chkUseLTIData">
                        <input type="checkbox" id="chkUseLTIData" v-model="useLTIData" />
                        Use LTI data on restart
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import ToolBoxData from '../../data/dev-toolbox-data.json'
import localStorage from 'localStorage'
import { activityViewChangeReset } from '../core/activity'
import { pause } from '../core/audio-player'

export default {
    name: 'DevBox',
    data() {
        return {
            // Hardcoded Page values used for Page View Menu
            pageOptions: [
                { value: 'HomePage', text: 'Home Page' },
                { value: 'SimPage', text: 'Simulation Page' },
                { value: 'ReviewQuestions', text: 'Review Questions' },
                { value: 'ViewScoreCard', text: 'View Score Card' },
                { value: 'PerformanceReport', text: 'Performance Report' }
            ],
            activityOptions: ToolBoxData.activities,
            activityViewOptions: ToolBoxData.views,
            currentPage: 'HomePage',
            currentActivity: 'A1',
            currentActivityView: 'V1',
            useLTIData: false
        }
    },
    mounted() {
        this.useLTIData = (Boolean(localStorage.getItem('useLTIData') === 'true') || false)
        this.$store.commit('setUseLTIData', this.useLTIData)
        this.currentPage = (localStorage.getItem('currentView') || 'HomePage')

        if (!this.useLTIData) {
            this.$store.commit('setCurrentView', this.currentPage)

            if (this.currentPage === 'SimPage') {
                this.currentActivity = (localStorage.getItem('currentActivityId') || 'A1')
                this.currentActivityView = (localStorage.getItem('currentActivityView') || 'V1')
                activityViewChangeReset()
                this.$store.commit('setCurrentActivityId', (this.currentActivity))
                this.$store.commit('setCurrentActivityView', (this.currentActivity + this.currentActivityView))
            }
        }
    },
    computed: {
        moduleCurrentPage() {
            return this.$store.getters.getCurrentView
        },
        moduleCurrentActivity() {
            return this.$store.getters.getCurrentActivityId
        },
        moduleCurrentActivityView() {
            return this.$store.getters.getCurrentActivityView
        }
    },
    watch: {
        moduleCurrentPage (newVal) {
            localStorage.setItem('currentView', newVal)
            return this.currentPage = newVal
        },
        moduleCurrentActivity (newVal) {
            localStorage.setItem('currentActivityId', newVal.substring(0, 2))
            return this.currentActivity = newVal.substring(0, 2)
        },
        moduleCurrentActivityView (newVal) {
            localStorage.setItem('currentActivityView', newVal.substring(2, 4))
            return this.currentActivityView = newVal.substring(2, 4)
        },
        useLTIData (newVal) {
            localStorage.setItem('useLTIData', Boolean(newVal))
            this.$store.commit('setUseLTIData', Boolean(newVal))
        }
    },
    methods: {
        /** DEV TOOLBOX MAIN FUNCTIONS ****************************
         *
         * There are 2 functions available for closing and opening
         */
        close() {
            document.getElementById('devBox').style.height = '30px'
            document.getElementById('close').style.display = 'none'
            document.getElementById('open').style.display = 'block'
            document.getElementById('tabBar').style.display = 'none'
        },
        open() {
            document.getElementById('devBox').style.height = '100px'
            document.getElementById('close').style.display = 'block'
            document.getElementById('open').style.display = 'none'
            document.getElementById('tabBar').style.display = 'block'
        },
        getActivityViews(activityId) {
            return _.find(ToolBoxData.activities, {id: this.currentActivity}).views
        },
        loadView() {
            pause()
            localStorage.setItem('currentView', this.currentPage)
            localStorage.setItem('currentActivityId', this.currentActivity)
            localStorage.setItem('currentActivityView', this.currentActivityView)

            this.$store.commit('setCurrentView', this.currentPage)

            if (this.currentPage === 'SimPage') {
                activityViewChangeReset()
                this.$store.commit('setCurrentActivityId', (this.currentActivity))
                this.$store.commit('setCurrentActivityView', (this.currentActivity + this.currentActivityView))
            }
        }
    }

}
</script>

<style>
#devBox {
    position: fixed;
    left: 20%;
    right: 20%;
    bottom: 0;
    height: 30px;
    background: black;
    color: white;
    z-index: 100000;
}

#titlebar {
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ccc;
    height: 30px;
}

#titlebar  > #tabBar {
    position: absolute;
    left: 180px;
    bottom: 0;
    width: 600px;;
    height: 25px;
	display: none;
}

#titlebar  > #tabBar > .tab {
    position: absolute;
    bottom: -1px;
    height: 25px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: 1px solid white;
    text-align: center;
    color: white;
    margin: 0 auto;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
}

#titlebar  > #tabBar > #general.tab {
    left: 0;
}

#titlebar  > #tabBar > .tab.active {
    border-bottom: 1px solid black;
}

#title {
    position: absolute;
    left: 10px;
    margin-top: 4px;
}

#close {
    width: 20px;
    height: 20px;
    border: 1px solid #fff;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 4px;
    cursor: pointer;
	display: none;
}

#open {
    width: 20px;
    height: 20px;
    border: 1px solid #fff;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 4px;
    cursor: pointer;
    display: block;
}

#tabContainer_General {
    display: block;
}



#col1 {
    float: left;
    width: 100%;
}

#col1 #mainViewField {
	width: 90%;
    color: white;
    text-align: left;
    position: absolute;
    top: 50px;
    left: 10px;
	padding: 5px;
	border: 1px solid #000;
}

#col1 #mainViewField > label {
	position: relative;
	float: left;
}

#col1 #mainViewField > #pageName {
	width: 160px;
    color: white;
    text-align: left;
	margin-left: 20px;
	position: relative;
	float: left;
}

#col1 #mainViewField > #activityName {
	width: 80px;
    color: white;
    text-align: left;
	float: left;
	position: relative;
	margin-left: 5px;
}

#col1 #mainViewField > #activityViewName {
	width: 100px;
    color: white;
    text-align: left;
	float: left;
	position: relative;
	margin-left: 5px;
}



#col1 .dbox {
    background: black;
    border: 1px solid white;
    color: lightgreen;
	position: relative;
}

#col1 #mainViewField > button {
	margin-left: 5px;
	position: relative;
	float: left;
}
</style>
