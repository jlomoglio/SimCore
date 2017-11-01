<template>
    <div class="video-buttons">
        <a id="btnUseSimulation" @click="loadVideo('UseSimulation')" v-if="this.$store.getters.getActiveButton === 'usimulation'">
            <div id="vbtnUseSimulation" title="Using the Simulation">
                <div class="vbtnUseSimulationImage"></div>
                <div class="vbtnUseSimulationText">Using the <br> Simulation</div>
            </div>
        </a>

        <a id="btnUnderstandConcepts" @click="loadVideo('UnderstandConcepts')" v-if="this.$store.getters.getActiveButton === 'uconcepts'">
            <div id="vbtnUnderstandConcepts" title="Understanding the Concepts">
                <div class="vbtnUnderstandConceptsImage"></div>
                <div class="vbtnUnderstandConceptsText">Understanding <br> the Concepts</div>
            </div>
        </a>

        <a id="btnUnderstandEquipment" @click="loadVideo('UnderstandEquipment')" v-if="this.$store.getters.getActiveButton === 'uequipment'">
            <div id="vbtnUnderstandEquipment" title="Understanding the Equipment">
                <div class="vbtnUnderstandEquipmentImage"></div>
                <div class="vbtnUnderstandEquipmentText">Understanding <br> the Equipment</div>
            </div>
        </a>

        <a @click="setView('HomePage')">
            <div id="vbtnHome" title="Home">
                <div class="vbtnHomeImage"></div>
                <div class="vbtnHomeText">Home</div>
            </div>
        </a>

        <a @click="setView('SimPage')">
            <div id="vbtnSimulation" title="Enter Simulation">
                <div class="vbtnSimulationImage"></div>
                <div class="vbtnSimulationText">Enter <br> Simulation</div>
            </div>
        </a>
    </div>
</template>

<script>
import { setModuleStartTime } from '../../core/reporting'
import { startModuleWithLTIData } from '../../core/lti'
export default {
    name: 'ButtonsVideo',
    methods: {
        setView (view) {
            if (view === 'SimPage') {
                setModuleStartTime()
                startModuleWithLTIData(view)
            } else {
                this.$store.commit('setCurrentView', view)
            }
        },
        loadVideo (clickedButton) {
            // Button: Using the Simulation
            if (clickedButton === 'UseSimulation') {
                this.$store.commit('setVideoSource', '../assets/video/intro_video.html')
                this.$store.commit('setLoadedVideo', 'usimulation')
                this.$store.commit('setActivityName', 'Using the Simulation')

                // Set the activeButton based on moduleType
                if (this.$store.getters.getModuleType === 'concepts') {
                    this.$store.commit('setActiveButton', 'uconcepts')
                } else {
                    this.$store.commit('setActiveButton', 'uequipment')
                }
            }
            else if (clickedButton === 'UnderstandConcepts') {
                this.$store.commit('setVideoSource', '../assets/video/concepts_video.html')
                this.$store.commit('setLoadedVideo', 'uconcepts')
                this.$store.commit('setActivityName', 'Understanding the Concepts')
                this.$store.commit('setActiveButton', 'usimulation')
            }
            else if (clickedButton === 'UnderstandEquipment') {
                this.$store.commit('setVideoSource', '../assets/video/equipment_video.html')
                this.$store.commit('setLoadedVideo', 'uequipment')
                this.$store.commit('setActivityName', 'Understanding the Equipment')
                this.$store.commit('setActiveButton', 'usimulation')
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-buttons {
    position: absolute;
	top: 492px;
	left: 240px;
	width: 500px;
	height: 160px;
	color: #fff;
	line-height: 18px;
}


/* Using the Simulation *********************************************************/
#vbtnUseSimulation {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 120px;
	height: 115px;
	background: none;
	text-align: center;
	position: absolute;
}
.vbtnUseSimulationImage {
	position: absolute;
	width: 76px;
	height: 76px;
	left:22px;
	cursor: pointer;
	background: url('/assets/img/buttons/hand_small_icon.png') no-repeat transparent;
	background-size:100%;
}
.vbtnUseSimulationImage:active {
	background: url('/assets/img/buttons/hand_small_icon_over.png') no-repeat;
	background-size: 100%;
}
.vbtnUseSimulationText {
	position: absolute;
	width: 100%;
	bottom: 0px;
}
#btnUseSimulationText:active {
	color: #FFEF00;
}

/* Understanding the Concepts **************************************************/
#vbtnUnderstandConcepts {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 120px;
	height: 115px;
	background: none;
	text-align: center;
	position: absolute;
}
.vbtnUnderstandConceptsImage {
	position:absolute;
	width: 76px;
	height: 76px;
	left:22px;
	cursor: pointer;
	background: url('/assets/img/buttons/bulb_small_icon.png') no-repeat transparent;
	background-size:100%;
}
.vbtnUnderstandConceptsImage:active {
	background: url('/assets/img/buttons/bulb_small_icon_over.png');
	background-size:100%;
}
.vbtnUnderstandConceptsText {
	position:absolute;
	width: 100%;
	bottom: 0px;
}
#vbtnUnderstandConceptsText:active {
	color: #FFEF00;
}

/* Understanding the Equipment ************************************************/
#vbtnUnderstandEquipment {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 120px;
	height: 115px;
	background: none;
	text-align: center;
	position: absolute;
}
.vbtnUnderstandEquipmentImage {
	position:absolute;
	width: 76px;
	height: 76px;
	left:22px;
	cursor: pointer;
	background: url('/assets/img/buttons/bulb_small_icon.png') no-repeat transparent;
	background-size:100%;
}
.vbtnUnderstandEquipmentImage:active {
	background: url('/assets/img/buttons/bulb_small_icon_over.png');
	background-size:100%;
}
.vbtnUnderstandEquipmentText {
	position:absolute;
	width: 100%;
	bottom: 0px;
}
#vbtnUnderstandEquipmentText:active {
	color: #FFEF00;
}

/* Home **********************************************************************/
#vbtnHome {
	font-family: Roboto-Regular;
	font-size: 16px;
	position: absolute;
	width: 120px;
	height: 115px;
	left: 176px;
	background: none;
	text-align: center;
}
.vbtnHomeImage {
	position: absolute;
	width: 76px;
	height: 76px;
	left: 22px;
	cursor: pointer;
	background: url('/assets/img/buttons/home_1_icon.png') no-repeat transparent;
	background-size: 100%;
}
.vbtnHomeImage:active {
	background: url('/assets/img/buttons/home_icon_1_hover.png') no-repeat;
	background-size: 100%;
}
.vbtnHomeText {
	position: absolute;
	width: 120px;
	bottom: 10px;
}

/* Enter Simulation ****************************************************************/
#vbtnSimulation {
	font-family: Roboto-Regular;
	font-size: 16px;
	width: 120px;
	height: 115px;
	background: none;
	text-align: center;
	position: absolute;
	left: 351px;
}
.vbtnSimulationImage {
	position:absolute;
	width: 76px;
	height: 76px;
	left:22px;
	cursor: pointer;
	background: url('/assets/img/buttons/car_small_icon.png') no-repeat transparent;
	background-size: 100%;
}
.vbtnSimulationImagee:active {
	background: url('/assets/img/buttons/car_small_icon_hover.png') no-repeat;
	background-size: 100%;
}
.vbtnSimulationText {
	position: absolute;
	width: 100%;
	bottom: 0px;
}
#vbtnSimulationTextn:active {
	color: #FFEF00;
}
</style>
