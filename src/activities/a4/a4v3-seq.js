// Required to import Data file and Vue
import ResponseData from '../../data/a4/a4-response-data.json'
import TaskData from '../../data/a4/a4-task-data.json'
import Vue from 'vue'
import { TweenMax } from 'gsap'

// Incorrect Response function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.response(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}

// NARRATIVE
const narrative = function() {
    // Show the lightbox
    this.$core.Activity.showLightBox()
    // Update LCD screen
    this.screenTxt1 = 'DISCONNECT HS HOSE'
    this.screenTxt2 = 'OPEN PANEL VALVES'
    this.screenTxt3 = 'AND START A/C MAX'
    this.screenTxt4 = 'START TO CONTINUE'
    // Rotate low-side needle to 70 psi
    TweenMax.to('#needle-low', 0, {
        rotation: 143
    })
    // Rotate needle to 70 psi
    TweenMax.to('#needle-high', 0, {
        rotation: -4
    })
    this.$core.Activity.Audio.play(
        TaskData.narrative1.vo,
        TaskData.narrative1.cc,
        () => { this.t1() }
    )
}

// TASK 1: Constructor
// Select the Charge button.
const t1 = function() {
    // Set current task
    this.currentTask = 't1'
    // Play task audio
    this.$core.Activity.Audio.play(
        TaskData.t1.vo,
        TaskData.t1.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
        }
    )
}

// TASK 1: Action 1 (Click Charge Button)
const t1a1 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide hint
    this.t1ShowHint = false
    // Adjust LCD Display
    this.screenTxt1 = 'DISCONNECT HS HOSE'
    this.screenTxt2 = 'OPEN PANEL VALVES'
    this.screenTxt3 = 'AND START A/C MAX'
    this.screenTxt4 = 'START TO CONTINUE'
    // Call task complete
    this.t1Completed()
}

const t1Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t1.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 0
    // Call next view
    this.transitionToView()
}

// End Activity 4 (Required)
// This is called to end the activity
const endActivity = function() {
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        this.$core.Activity.Assessment.hide()
        Vue.core.ContinueButton.hide()
        Vue.core.Activity.end()
    })
}

// Required to export all functions created in this file.
export default {
    incorrectResponse,
    narrative,
    t1,
    t1a1,
    t1Completed,
    endActivity
}
