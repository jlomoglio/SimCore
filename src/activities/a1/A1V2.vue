<template>
    <view-box id="a1v2" :background="backgroundImg">
        <div id="t6a2-ani" v-show="aniIsShown"></div>
        <div id="t6a2-ani-cone" v-show="aniIsShown"></div>

        <content-box :clickable="isClickable" @action="incorrect(currentTask)">
            <div id="wireContainer">
                <div id="ac-machine-img"></div>

                <hint-box id="t3-hint" v-hint="t3ShowHint"></hint-box>
                <div @click="t6Clickable ? t6a1() : null" id="red-connector-container">
                    <div id="red-connector"></div>
                </div>

                <hint-box id="t4-hint" v-hint="t4ShowHint"></hint-box>
                <div @click="t5Clickable ? t5a1() : null" id="blue-connector-container">
                   <div id="blue-connector"></div>
                </div>

                <hint-box id="t6-hint" v-hint="t6ShowHint"></hint-box>
                <div id="blue-service-port"></div>

                <hint-box id="t5-hint" v-hint="t5ShowHint"></hint-box>
                <div id="red-service-port"></div>

                <svg id="mysvg" width="1000px" height="582px">
                    <path id="blueWire"
                        d="m588,485 Q609,507 951,581"
                        stroke="#0F093C"
                        stroke-width="7px"
                        fill="transparent"
                    />
                    <path id="redWire"
                        d="M516,483, Q607,529, 851,581"
                        stroke="#80030B"
                        stroke-width="7px"
                        fill="transparent"
                    />
                </svg>
            </div>
        </content-box>
    </view-box>
</template>

<script>
import A1V2Seq from './a1v2-seq.js'
import ViewBox from '../../widgets/ViewBox'
import ContentBox from '../../widgets/ContentBox'
import ZoomPanel from '../../widgets/ZoomPanel'
import HintBox from '../../widgets/HintBox'

// let redWire = document.getElementById('redWire')
// let blueWire = document.getElementById('blueWire')

export default {
    name: 'A1V2',
    components: {
        ViewBox,
        ContentBox,
        ZoomPanel,
        HintBox
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
            t3ShowHint: false,
            t4ShowHint: false,
            t5ShowHint: false,
            t6ShowHint: false,

            // Task properties
            threshold: '100%',
            snapMade: false,

            // Check for task function
            t5Clickable: false,
            t6Clickable: false,

            // Show animation
            aniIsShown: false
        }
    },
    mounted() {
        // Configure the view (Activity Title, View Mode[full/box], Activity ID)
        this.$core.Activity.configView('System Recovery', 'full', 'A1')
        // Initlize the activity view
        this.$core.Activity.init([this.t3])

        // Show and Enable SI Menu IconBar
        this.$core.IconBar.ServiceInfo.show()
        this.$core.IconBar.ServiceInfo.enable()
    },
    methods: {
        ...A1V2Seq,

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
    left: 470px;
    position: absolute;
    top: 431px;
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
    left: 540px;
    top: 438px;
    z-index: 1;
}

#blue-connector {
    height: 65px;
    width: 65px;
    background-image: url('/assets/img/activities/blue-connector-sm.png');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
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

#mysvg {
    top: 0px;
    left: 0px;
    position:absolute;
}

#t3-hint {
    position: absolute;
    top: 31px;
    left: 422px;
    width: 30px;
    height: 30px;
    border-radius: 10px;
}

#t4-hint {
    position: absolute;
    top: 356px;
    left: 516px;
    width: 30px;
    height: 30px;
    border-radius: 10px;
}
#t5-hint {
    position: absolute;
    top: 29px;
    left: 426px;
    width: 30px;
    height: 30px;
    border-radius: 10px;
}

#t6-hint {
    position: absolute;
    top: 364px;
    left: 524px;
    width: 30px;
    height: 30px;
    border-radius: 10px;
}

#t6a2-ani {
    position: absolute;
    top: 60px;
    left: 310px;
    width: 400px;
    height: 400px;
    border-radius: 200px;
    background: url('/assets/img/activities/refrig_sprite.png') no-repeat;
    background-position: 0 0;
    border: 2px solid #ccc;
    box-shadow: 5px 5px 2px 0px rgba(0,0,0,0.55);
    z-index: 6;
}

#t6a2-ani-cone {
    position: absolute;
    top: 330px;
    left: 495px;
    width: 0;
    height: 0;
    opacity: .5;
    border-left: 165px solid transparent;
    border-right: 165px solid transparent;
    border-top: 280px solid #ccc;
    transform: rotate(-35deg);
    z-index: 5;
}
</style>
