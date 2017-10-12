<template>
    <view-box id="a4v2" :background="backgroundImg">
        <content-box :clickable="isClickable" @action="incorrect(currentTask)">
            <div id="wireContainer">
                <div id="ac-machine-img"></div>

                <hint-box id="t2-hint" v-hint="t2ShowHint"></hint-box>
                <div id="red-connector-container">
                    <div id="red-connector"></div>
                </div>
                <div id="red-service-port"></div>

                <div id="blue-connector-container">
                   <div id="blue-connector"></div>
                </div>
                <div id="blue-service-port"></div>


                <svg id="hoses-svg" width="1000px" height="582px">
                    <path id="blueWire"
                        d="m457,64 Q609,507 951,581"
                        stroke="#0F093C"
                        stroke-width="7px"
                        fill="transparent"
                    />
                    <path id="redWire"
                        d="M558,385, Q607,529, 851,581"
                        stroke="#80030B"
                        stroke-width="7px"
                        fill="transparent"
                    />
                </svg>
            </div>

            <ignition-switch
                top="60px"
                right="50px"
                @lock="incorrect('t3')"
                @acc="incorrect('t3')"
                @on="t3a1()"
                @start="t3a1()"
                :lockHint="false"
                :accHint="false"
                :onHint="t3ShowHint"
            >
            </ignition-switch>
        </content-box>
    </view-box>
</template>

<script>
import A4V2Seq from './a4v2-seq.js'
import ViewBox from '../../widgets/ViewBox'
import ContentBox from '../../widgets/ContentBox'
import HintBox from '../../widgets/HintBox'
import IgnitionSwitch from '../../widgets/ignition-switch/IgnitionSwitch'

export default {
    name: 'A4V2',
    components: {
        ViewBox,
        ContentBox,
        HintBox,
        IgnitionSwitch
    },
    data() {
        return {
            // Required Properties //////////////////
            isClickable: false,
            currentTask: 't3',
            currentAttempts: 1,
            currentPoints: 3,
            backgroundImg: 'engine_compartment_not_faded_with_AC_machine-a.png',
            // /////////////////////////////////////

            // Hints should always follow this naming convention
            t2ShowHint: false,
            t3ShowHint: false,

            // Task properties
            threshold: '100%',
            snapMade: false,

            // Check for task function
            t5Clickable: false,
            t6Clickable: false
        }
    },
    mounted() {
        // Configure the view (Activity Title, View Mode[full/box], Activity ID)
        this.$core.Activity.configView('System Servicing', 'full', 'A4')
        // Initlize the activity view
        this.$core.Activity.init([this.t2])

        // Show and Enable SI Menu IconBar
        this.$core.IconBar.ServiceInfo.show()
        this.$core.IconBar.ServiceInfo.enable()
    },
    methods: {
        ...A4V2Seq,

        // Required for inccorect responces and scoring
        incorrect(task) {
            if (this.currentAttempts < 3) {
                this.incorrectResponse()
                this.currentAttempts = (this.currentAttempts + 1)
                this.currentPoints = (this.currentPoints - 1)
            } else if (this.currentAttempts === 3) {
                this.incorrectResponse()
                this[task + 'ShowHint'] = true
                this.currentPoints = 0
            }
        }
    }
}
</script>

<style scoped>
/** View Specific Styles ********************************/
#ac-machine-img {
    background: url('/assets/img/activities/AC_machine_img.png');
    height: 239px;
    width: 350px;
    bottom: 10px;
    right: 53px;
    position: absolute;
    z-index: 5;
}

#wireContainer {
    width: 100%;
    height: 500px;
}

#redWire, #blueWire {
    position: absolute;
}

#red-connector-container {
    position: absolute;
    left: 510px;
    top: 335px;
    z-index: 2;
}

#red-connector {
    background-image: url('/assets/img/activities/red-connector-sm.png');
    background-repeat: no-repeat;
    height: 65px;
    width: 65px;
    z-index: 2;
}

#blue-connector-container {
    position: absolute;
    left: 420px;
    top: 18px;
    z-index: 1;
}

#blue-connector {
    height: 65px;
    width: 65px;
    background-image: url('/assets/img/activities/blue-connector-sm.png');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
    transform: rotate(20deg);
}

#red-service-port {
    background-color: red;
    height: 20px;
    left: 524px;
    opacity: 0;
    position: absolute;
    top: 364px;
    width: 20px;
    z-index: 1;
}

#blue-service-port {
    background-color: blue;
    height: 20px;
    left: 430px;
    opacity: 0;
    position: absolute;
    top: 39px;
    width: 20px;
    z-index: 1;
}

#hoses-svg {
    top: 0px;
    left: 0px;
    position:absolute;
}


#t2-hint {
    position: absolute;
    top: 356px;
    left: 516px;
    width: 30px;
    height: 30px;
    border-radius: 10px;
}
</style>
