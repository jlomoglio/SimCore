<template>
    <view-box id="a1v1" :background="backgroundImg">
        <!-- INTRO & SAFETY SCREENS -->
        <intro-screen></intro-screen>
        <safety-screen
            @isClosed="narrative()"
            v-if="this.$core.Activity.safetyIsShown()"
        >
        </safety-screen>

        <!-- Content container required only for A1V1 -->
        <content-box :clickable="isClickable" @action="incorrect(currentTask)">
            <!-- ACTIVITY HTML GOES HERE -->
        </content-box>
    </view-box>
</template>

<script>
import A1V1Seq from './a1v1-seq.js'
import ViewBox from '../../widgets/ViewBox'
import ContentBox from '../../widgets/ContentBox'
import IntroScreen from '../../widgets/IntroScreen'
import SafetyScreen from '../../widgets/SafetyScreen'
import HintBox from '../../widgets/HintBox'

export default {
    name: 'A1V1',

    // This is a required list of imported components (Widgets)
    components: {
        ViewBox,
        ContentBox,
        IntroScreen,
        SafetyScreen,
        HintBox
    },

    // Data contains properties that manage the state of the views
    // Typical usage is for boolean properties and view text and
    // properties used for scoring.
    data() {
        return {
            // Required Properties //////////////////
            isClickable: false,
            currentTask: 'narrative',
            currentAttempts: 1,
            currentPoints: 3,
            backgroundImg: 'engine_compartment_not_faded_with_AC_machine-a.png',
            // /////////////////////////////////////

            // View Specific properties ///////////

            // Hints must always follow this naming convention
            t1ShowHint: false,
            t2ShowHint: false
        }
    },

    // Mounted is used for things that need to be active when the
    // view first loads, such as configs and init and any icons
    mounted() {
        // Configure the view (Activity Title, View Mode[full/box], Activity ID)
        this.$core.Activity.configView('System Recovery', 'full', 'A1')
        // Initlize the activity view
        this.$core.Activity.init([this.introScreen])

        // Show and Enable IconBar Icons
    },

    // Methods imports the sequence functions. You should only add
    // helper functions here. All task logic needs to be in the
    // sequecnxe file.
    methods: {
        // Required for sequence file
        ...A1V1Seq,

        // Required for inccorect responces and scoring
        incorrect(task) {
            if (this.currentAttempts < 3) {
                this.incorrectResponse()
                this.currentAttempts = (this.currentAttempts + 1)
                this.currentPoints = (this.currentPoints - 1)
            } else if (this.currentAttempts === 3) {
                this[task + 'ShowHint'] = true
                this.currentPoints = 0
            }
        }
    },

    // Only used in A1V1 to remove these components ffrom DOM
    beforeDestroy() {
        // Delete Intro and Safety Screens
        delete document.getElementById('intro-screen')
        delete document.getElementById('safety-screen')
    }
}
</script>

<style scoped>
/** View Specific Styles ********************************/

</style>
