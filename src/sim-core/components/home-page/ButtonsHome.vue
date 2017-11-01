<template>
    <div class="home-buttons">
        <a @click="setView('VideoPage','usimulation')">
            <div id="btnUseSimulation" title="Using the Simulation">
                <div class="btnUseSimulationImage"></div>
                <div class="btnUseSimulationText">Using the <br> Simulation</div>
            </div>
        </a>

        <a @click="setView('VideoPage','uconcepts')" v-if="this.$store.getters.getModuleType === 'concepts'">
            <div id="btnUnderstandConcepts" title="Understanding the Concepts">
                <div class="btnUnderstandConceptsImage"></div>
                <div class="btnUnderstandConceptsText">Understanding <br> the Concepts</div>
            </div>
        </a>

		<a @click="setView('VideoPage','uequipment')" v-else-if="this.$store.getters.getModuleType === 'equipment'">
            <div id="btnUnderstandEquipment" title="Understanding the Equipment">
                <div class="btnUnderstandEquipmentImage"></div>
                <div class="btnUnderstandEquipmentText">Understanding <br> the Equipment</div>
            </div>
        </a>

        <a @click="setView('SimPage')">
            <div id="btnSimulation" title="Enter Simulation">
                <div class="btnSimulationImage"></div>
                <div class="btnSimulationText">Enter <br> Simulation</div>
            </div>
        </a>
    </div>
</template>

<script>
import { setModuleStartTime } from '../../core/reporting'
import { startModuleWithLTIData } from '../../core/lti'
export default {
    name: 'ButtonsHome',
    methods: {
        setView (view, btnClicked) {
            // Change the view
            if (view === 'SimPage') {
                setModuleStartTime()
                startModuleWithLTIData(view)
            } else {
                this.$store.commit('setCurrentView', view)

                // Button: Using the Simulation
                if (btnClicked === 'usimulation') {
                    // Set the Video Page Activity Tile to: Using the Simulation
                    this.$store.commit('setActivityName', 'Using the Simulation')

                    // Set the loaded video based on the module type
                    if (this.$store.getters.getModuleType === 'concepts') {
                        this.$store.commit('setActiveButton', 'uconcepts')
                    } else if (this.$store.getters.getModuleType === 'equipment') {
                        this.$store.commit('setActiveButton', 'uequipment')
                    }
                }

                // Button: Understanding the Concepts
                else if (btnClicked === 'uconcepts') {
                    // Set the Video Page Activity Tile to: Understanding the Concepts
                    this.$store.commit('setLoadedVideo', 'uconcepts')
                    this.$store.commit('setActivityName', 'Understanding the Concepts')
                    this.$store.commit('setActiveButton', 'usimulation')
                    this.$store.commit('setVideoSource', '../assets/video/concepts_video.html')
                }

                // Button: Understanding the Equipment
                if (btnClicked === 'uequipment') {
                    // Set the Video Page Activity Tile to: Understanding the Equipment
                    this.$store.commit('setLoadedVideo', 'uequipment')
                    this.$store.commit('setActivityName', 'Understanding the Equipment')
                    this.$store.commit('setActiveButton', 'usimulation')
                    this.$store.commit('setVideoSource', '../assets/video/equipment_video.html')
                }
            }
        }
    }
}
</script>


<style scoped>
.home-buttons {
    position: absolute;
	top: 397px;
	left: 240px;
	width: 500px;
	height: 160px;
	color: #fff;
	line-height: 18px;
}

/* Using the Simulation ******************************************************/
#btnUseSimulation {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 150px;
	height: 150px;
	background: none;
	text-align: center;
	position: absolute;
}
.btnUseSimulationImage {
	position: absolute;
	width: 109px;
	height: 109px;
	left: 22px;
	cursor: pointer;
	background: url(/assets/img/buttons/hand_icon.png) no-repeat transparent;
	background-size:100%;
}
.btnUseSimulationImage:active {
	background: url(/assets/img/buttons/hand_icon_hover.png) no-repeat;
	background-size: 100%;
}
.btnUseSimulationText {
	position: absolute;
	width: 100%;
	bottom: 0px;
}
#btnUseSimulationText:active {
	color: #FFEF00;
}

/* Understanding the Concepts *************************************************/
#btnUnderstandConcepts {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 150px;
	height: 150px;
	background: none;
	text-align: center;
	position: absolute;
	left: 187px;
}
.btnUnderstandConceptsImage {
	position:absolute;
	width: 109px;
	height: 109px;
	left:22px;
	cursor: pointer;
	background: url(/assets/img/buttons/light_icon.png) no-repeat transparent;
	background-size:100%;
}
.btnUnderstandConceptsImage:active {
	background: url(/assets/img/buttons/light_icon_hover.png);
	background-size:100%;
}
.btnUnderstandConceptsText {
	position:absolute;
	width: 100%;
	bottom: 0px;
}
#btnUnderstandConceptsText:active {
	color: #FFEF00;
}

/* Understanding the Equipment ************************************************/
#btnUnderstandEquipment {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 150px;
	height: 150px;
	background: none;
	text-align: center;
	position: absolute;
	left: 187px;
}
.btnUnderstandEquipmentImage {
	position:absolute;
	width: 109px;
	height: 109px;
	left:22px;
	cursor: pointer;
	background: url(/assets/img/buttons/light_icon.png) no-repeat transparent;
	background-size:100%;
}
.btnUnderstandEquipmentImage:active {
	background: url(/assets/img/buttons/light_icon_hover.png);
	background-size:100%;
}
.btnUnderstandEquipmentText {
	position:absolute;
	width: 100%;
	bottom: 0px;
}
#btnUnderstandEquipmentText:active {
	color: #FFEF00;
}

/* Enter Simulation ***********************************************************/
#btnSimulation {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 150px;
	height: 150px;
	background: none;
	text-align: center;
	position: absolute;
	left: 372px;
}
.btnSimulationImage {
	position:absolute;
	width: 109px;
	height: 109px;
	left:22px;
	cursor: pointer;
	background: url(/assets/img/buttons/car_icon.png) no-repeat transparent;
	background-size: 100%;
}
.btnSimulationImage:active {
	background: url(/assets/img/buttons/car_icon_hover.png) no-repeat;
	background-size: 100%;
}
.btnSimulationText {
	position: absolute;
	width: 100%;
	bottom: 0px;
}
#btnSimulationText:active {
	color: #FFEF00;
}
</style>
