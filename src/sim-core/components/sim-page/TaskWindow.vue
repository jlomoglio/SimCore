<template>
	<div id="task-window" v-if="this.$store.getters.getTaskWindowIsShown">
		<div id="task-header">
            <img id="close-task-window" src="/assets/img/icons/close_task.png" title="Close" @click="closeTaskWindow()"/>
            <p class="activity-title">{{ this.$store.getters.getActivityName }}</p>
        </div>
        <div id="task-content">
			<div id="scrollme">
	            <div id="task-list-description" v-if="isShown">{{ description }}</div>
	            <br><br>
				<ol id="task-list">
					<li class="task-list-item" v-for="task in tasks">{{ task }}</li>
	            </ol>
			</div>
        </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import TweenMax from 'gsap/TweenMax'
import Draggable from 'gsap/Draggable'
import TaskData from '../../../data/task-list-data'
import { unPause, unMute } from '../../core/audio-player'

export default {
    name: 'TaskWindow',
    data() {
        return {
            isShown: null,
            tasks: [],
            description: ''
        }
    },
    computed: mapGetters({
        activityId: 'getCurrentActivityId'
    }),
    mounted() {
        this.getTaskWindowData(this.$store.getters.getCurrentActivityId)
    },
    updated() {
        var taskWindow = document.getElementById('task-window')
        Draggable.create(taskWindow, {
            type: 'x,y',
            trigger: '#task-header',
            bounds: '#activity-area',
            onDrag: function() {
                this.applyBounds({
                    minY: -20,
                    maxY: 110,
                    minX: -750,
                    maxX: 14
                })
            }
        })
    },
    methods: {
        getTaskWindowData (activityId) {
            for (let task in TaskData) {
                if (task === activityId) {
                    this.tasks = TaskData[task].tasks
                    this.description = TaskData[task].description
                    this.start = TaskData[task].startNum

                    if (TaskData[task].description === '') {
                        this.isShown = false
                    } else {
                        this.isShown = true
                    }
                }
            }
        },
        closeTaskWindow () {
            this.$store.commit('closeTaskWindow')
            // Resets task window to original position
            TweenMax.set(document.getElementById('task-window'), {x: 0, y: 0})
            unMute()
            unPause()
        }
    },
    watch: {
        activityId (newVal) {
            this.getTaskWindowData(newVal)
        }
    }
}
</script>


<style scoped>
#task-window {
	position: absolute;
	width: 230px;
   	background:#FDF7B6;
	border: 2px solid #fff;
    top: 96px;
	left: 750px;
	float: right;
	z-index: 15;
	-webkit-box-shadow: 3px 3px 10px;
	-moz-box-shadow: 3px 3px 10px;
	box-shadow: 3px 3px 10px;
}

#task-header {
	background: url(/assets/img/module/activity_bar.jpg) no-repeat transparent;
	width: 230px;
	height: 80px;
	cursor: move;
}

#task-header > .activity-title {
	position: absolute;
	font-family: Roboto-Bold;
	font-size: 14px;
	font-weight: bold;
	color:#FDF7B6;
	width: 100%;
	top: 29px;
    left: 0px;
    right: 0px;
	margin: 0 auto;
	display :block;
	text-align: center;
}

#task-content {
	width: 205px;
	height: 250px;
	padding: 16px;
    line-height: 16px;
	cursor: default;
	margin-left: -4px;
}

#scrollme {
	width: 210px;
	height: 248px;
	overflow-y: auto;
}

::-webkit-scrollbar {
    background: lightgrey;
	width: 10px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  	background-color: dimgrey;
  	outline: 0px solid dimgrey;
  	cursor: pointer;
	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	height: 80px;

}

#task-list-description {
	font-family: Roboto-Light;
	font-size: 14px;
	margin-top: 0px;
	text-align: left;
	padding-left: 4px;
	width: 95%;
}

#task-list {
	margin-top: -20px;
	margin-left: -15px;
}

.task-list-item {
	font-family: Roboto-Light;
	font-size: 14px;
	padding-left: 4px;
	padding-right: 10px;
	line-height: 16px;
	text-align: left;
	margin-bottom: 10px;
}

#close-task-window {
	width: 30px;
	height: 30px;
	float: right;
	cursor: pointer;
}
</style>
