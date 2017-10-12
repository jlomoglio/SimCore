// Required to import Data file and Vue
import ResponseData from '../../data/a4/a4-response-data.json'
import TaskData from '../../data/a4/a4-task-data.json'
import Vue from 'vue'
import { Draggable, TweenMax } from 'gsap'

// IncorrectResponse function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.response(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}

// Task 2: Constructor
const t2 = function() {
    this.currentTask = 't2'
    this.$core.Activity.Audio.play(
        TaskData.t2.vo,
        TaskData.t2.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
            // Enable click on high-side connector
            this.t2Clickable = true
            // Call task Action
            this.t2a1()
        }
    )
}

// TASK 2: Action 1
// Disconnect the high side hose from the high side service port.
const t2a1 = function() {
    // Disable incorrect
    this.isClickable = false
    // Reassign this
    let vm = this
    // Red Connectors
    Draggable.create('#red-connector-container', {
        type: 'x,y',
        bounds: '#wireContainer',
        zIndexBoost: false,
        onDrag: function () {
            this.t2ShowHint = false

            let redWire = document.querySelector('#redWire')
            let redConnector = document.querySelector('#red-connector')
            let redConnectorContainer = document.querySelector('#red-connector-container')
            let rotation = '25deg'
            let parentPos = document.querySelector('.content-box').getBoundingClientRect()
            let childPos = redConnectorContainer.getBoundingClientRect()

            let relativePos = {}
            relativePos.top = childPos.top - parentPos.top
            relativePos.right = childPos.right - parentPos.right
            relativePos.bottom = childPos.bottom - parentPos.bottom
            relativePos.left = childPos.left - parentPos.left

            // Initial Values
            let mX = parseInt(relativePos.left + 37)
            let mY = parseInt(relativePos.top + 37)
            let qX = 609
            let qY = 507
            let tX = 851
            let tY = 581

            let rows = [
                /* ROW 1 */
                { xMin: 0, xMax: 65, yMin: 0, yMax: 65, rotation: '-6deg', left: 38, top: 40 },
                { xMin: 65, xMax: 130, yMin: 0, yMax: 65, rotation: '-6deg', left: 38, top: 40 },
                { xMin: 130, xMax: 195, yMin: 0, yMax: 65, rotation: '-6deg', left: 39, top: 40 },
                { xMin: 195, xMax: 227, yMin: 0, yMax: 65, rotation: '2deg', left: 37, top: 40 },
                { xMin: 227, xMax: 260, yMin: 0, yMax: 65, rotation: '3deg', left: 45, top: 50 },
                { xMin: 260, xMax: 325, yMin: 0, yMax: 65, rotation: '4deg', left: 45, top: 50 },
                { xMin: 325, xMax: 390, yMin: 0, yMax: 65, rotation: '11deg', left: 42, top: 50 },
                { xMin: 390, xMax: 455, yMin: 0, yMax: 65, rotation: '17deg', left: 40, top: 50 },
                { xMin: 455, xMax: 520, yMin: 0, yMax: 65, rotation: '25deg', left: 38, top: 50 },
                { xMin: 520, xMax: 585, yMin: 0, yMax: 65, rotation: '35deg', left: 35, top: 50 },
                { xMin: 585, xMax: 650, yMin: 0, yMax: 65, rotation: '45deg', left: 32, top: 50 },
                { xMin: 650, xMax: 715, yMin: 0, yMax: 65, rotation: '55deg', left: 30, top: 50 },
                { xMin: 715, xMax: 780, yMin: 0, yMax: 65, rotation: '65deg', left: 26, top: 50 },
                { xMin: 780, xMax: 845, yMin: 0, yMax: 65, rotation: '70deg', left: 25, top: 50 },
                { xMin: 845, xMax: 910, yMin: 0, yMax: 65, rotation: '75deg', left: 23, top: 50 },
                { xMin: 910, xMax: 975, yMin: 0, yMax: 65, rotation: '78deg', left: 35, top: 32 },

                /* ROW 2 */
                { xMin: 0, xMax: 65, yMin: 65, yMax: 130, rotation: '-8deg', left: 38, top: 42 },
                { xMin: 65, xMax: 130, yMin: 65, yMax: 130, rotation: '-6deg', left: 38, top: 41 },
                { xMin: 130, xMax: 195, yMin: 65, yMax: 130, rotation: '-6deg', left: 39, top: 41 },
                { xMin: 195, xMax: 227, yMin: 65, yMax: 130, rotation: '2deg', left: 36, top: 41 },
                { xMin: 227, xMax: 260, yMin: 65, yMax: 130, rotation: '3deg', left: 45, top: 50 },
                { xMin: 260, xMax: 325, yMin: 65, yMax: 130, rotation: '4deg', left: 45, top: 50 },
                { xMin: 325, xMax: 390, yMin: 65, yMax: 130, rotation: '11deg', left: 42, top: 50 },
                { xMin: 390, xMax: 455, yMin: 65, yMax: 130, rotation: '17deg', left: 40, top: 50 },
                { xMin: 455, xMax: 520, yMin: 65, yMax: 130, rotation: '25deg', left: 38, top: 50 },
                { xMin: 520, xMax: 585, yMin: 65, yMax: 130, rotation: '35deg', left: 35, top: 50 },
                { xMin: 585, xMax: 650, yMin: 65, yMax: 130, rotation: '45deg', left: 32, top: 50 },
                { xMin: 650, xMax: 715, yMin: 65, yMax: 130, rotation: '55deg', left: 30, top: 50 },
                { xMin: 715, xMax: 780, yMin: 65, yMax: 130, rotation: '65deg', left: 26, top: 50 },
                { xMin: 780, xMax: 845, yMin: 65, yMax: 130, rotation: '70deg', left: 25, top: 50 },
                { xMin: 845, xMax: 910, yMin: 65, yMax: 130, rotation: '75deg', left: 23, top: 50 },
                { xMin: 910, xMax: 975, yMin: 65, yMax: 130, rotation: '78deg', left: 35, top: 32 },

                /* ROW 3 */
                { xMin: 0, xMax: 65, yMin: 130, yMax: 195, rotation: '-16deg', left: 38, top: 41 },
                { xMin: 65, xMax: 130, yMin: 130, yMax: 195, rotation: '-12deg', left: 38, top: 41 },
                { xMin: 130, xMax: 195, yMin: 130, yMax: 195, rotation: '-10deg', left: 39, top: 41 },
                { xMin: 195, xMax: 227, yMin: 130, yMax: 195, rotation: '-7deg', left: 36, top: 40 },
                { xMin: 227, xMax: 260, yMin: 130, yMax: 195, rotation: '0deg', left: 45, top: 51 },
                { xMin: 260, xMax: 325, yMin: 130, yMax: 195, rotation: '4deg', left: 45, top: 50 },
                { xMin: 325, xMax: 390, yMin: 130, yMax: 195, rotation: '11deg', left: 42, top: 50 },
                { xMin: 390, xMax: 455, yMin: 130, yMax: 195, rotation: '17deg', left: 40, top: 50 },
                { xMin: 455, xMax: 520, yMin: 130, yMax: 195, rotation: '25deg', left: 38, top: 50 },
                { xMin: 520, xMax: 585, yMin: 130, yMax: 195, rotation: '35deg', left: 35, top: 50 },
                { xMin: 585, xMax: 650, yMin: 130, yMax: 195, rotation: '45deg', left: 32, top: 50 },
                { xMin: 650, xMax: 715, yMin: 130, yMax: 195, rotation: '60deg', left: 28, top: 50 },
                { xMin: 715, xMax: 780, yMin: 130, yMax: 195, rotation: '65deg', left: 27, top: 50 },
                { xMin: 780, xMax: 845, yMin: 130, yMax: 195, rotation: '77deg', left: 23, top: 49 },
                { xMin: 845, xMax: 910, yMin: 130, yMax: 195, rotation: '83deg', left: 22, top: 49 },
                { xMin: 910, xMax: 975, yMin: 130, yMax: 195, rotation: '83deg', left: 22, top: 49 },

                /* ROW 4 */
                { xMin: 0, xMax: 65, yMin: 195, yMax: 260, rotation: '-18deg', left: 38, top: 41 },
                { xMin: 65, xMax: 130, yMin: 195, yMax: 260, rotation: '-16deg', left: 38, top: 41 },
                { xMin: 130, xMax: 195, yMin: 195, yMax: 260, rotation: '-14deg', left: 39, top: 41 },
                { xMin: 195, xMax: 227, yMin: 195, yMax: 260, rotation: '-12deg', left: 36, top: 40 },
                { xMin: 227, xMax: 260, yMin: 195, yMax: 260, rotation: '-10deg', left: 45, top: 51 },
                { xMin: 260, xMax: 325, yMin: 195, yMax: 260, rotation: '-8deg', left: 46, top: 47 },
                { xMin: 325, xMax: 390, yMin: 195, yMax: 260, rotation: '-6deg', left: 42, top: 43 },
                { xMin: 390, xMax: 455, yMin: 195, yMax: 260, rotation: '1deg', left: 42, top: 45 },
                { xMin: 455, xMax: 520, yMin: 195, yMax: 260, rotation: '27deg', left: 36, top: 50 },
                { xMin: 520, xMax: 585, yMin: 195, yMax: 260, rotation: '35deg', left: 34, top: 50 },
                { xMin: 585, xMax: 650, yMin: 195, yMax: 260, rotation: '47deg', left: 32, top: 50 },
                { xMin: 650, xMax: 715, yMin: 195, yMax: 260, rotation: '64deg', left: 26, top: 50 },
                { xMin: 715, xMax: 780, yMin: 195, yMax: 260, rotation: '75deg', left: 25, top: 47 },
                { xMin: 780, xMax: 845, yMin: 195, yMax: 260, rotation: '85deg', left: 22, top: 46 },
                { xMin: 845, xMax: 910, yMin: 195, yMax: 260, rotation: '95deg', left: 20, top: 44 },
                { xMin: 910, xMax: 975, yMin: 195, yMax: 260, rotation: '95deg', left: 20, top: 44 },

                /* ROW 5 */
                { xMin: 0, xMax: 65, yMin: 260, yMax: 325, rotation: '-30deg', left: 38, top: 38 },
                { xMin: 65, xMax: 130, yMin: 260, yMax: 325, rotation: '-26deg', left: 38, top: 39 },
                { xMin: 130, xMax: 195, yMin: 260, yMax: 325, rotation: '-20deg', left: 39, top: 41 },
                { xMin: 195, xMax: 227, yMin: 260, yMax: 325, rotation: '-17deg', left: 36, top: 40 },
                { xMin: 227, xMax: 260, yMin: 260, yMax: 325, rotation: '-10deg', left: 45, top: 51 },
                { xMin: 260, xMax: 325, yMin: 260, yMax: 325, rotation: '-16deg', left: 46, top: 45 },
                { xMin: 325, xMax: 390, yMin: 260, yMax: 325, rotation: '-10deg', left: 42, top: 43 },
                { xMin: 390, xMax: 455, yMin: 260, yMax: 325, rotation: '-5deg', left: 40, top: 42 },
                { xMin: 455, xMax: 520, yMin: 260, yMax: 325, rotation: '9deg', left: 43, top: 50 },
                { xMin: 520, xMax: 585, yMin: 260, yMax: 325, rotation: '35deg', left: 34, top: 50 },
                { xMin: 585, xMax: 650, yMin: 260, yMax: 325, rotation: '47deg', left: 32, top: 50 },
                { xMin: 650, xMax: 715, yMin: 260, yMax: 325, rotation: '64deg', left: 26, top: 50 },
                { xMin: 715, xMax: 780, yMin: 260, yMax: 325, rotation: '75deg', left: 25, top: 47 },
                { xMin: 780, xMax: 845, yMin: 260, yMax: 325, rotation: '85deg', left: 22, top: 46 },
                { xMin: 845, xMax: 910, yMin: 260, yMax: 325, rotation: '95deg', left: 20, top: 44 },
                { xMin: 910, xMax: 975, yMin: 260, yMax: 325, rotation: '110deg', left: 20, top: 39 },

                /* ROW 6 */
                { xMin: 0, xMax: 65, yMin: 325, yMax: 390, rotation: '-34deg', left: 38, top: 38 },
                { xMin: 65, xMax: 130, yMin: 325, yMax: 390, rotation: '-30deg', left: 38, top: 40 },
                { xMin: 130, xMax: 195, yMin: 325, yMax: 390, rotation: '-28deg', left: 39, top: 41 },
                { xMin: 195, xMax: 227, yMin: 325, yMax: 390, rotation: '-26deg', left: 36, top: 40 },
                { xMin: 227, xMax: 260, yMin: 325, yMax: 390, rotation: '-26deg', left: 45, top: 43 },
                { xMin: 260, xMax: 325, yMin: 325, yMax: 390, rotation: '-24deg', left: 46, top: 43 },
                { xMin: 325, xMax: 390, yMin: 325, yMax: 390, rotation: '-20deg', left: 44, top: 43 },
                { xMin: 390, xMax: 455, yMin: 325, yMax: 390, rotation: '-18deg', left: 40, top: 39 },
                { xMin: 455, xMax: 520, yMin: 325, yMax: 390, rotation: '3deg', left: 38, top: 45 },
                { xMin: 520, xMax: 585, yMin: 325, yMax: 390, rotation: '30deg', left: 33, top: 46 },
                { xMin: 585, xMax: 650, yMin: 325, yMax: 390, rotation: '60deg', left: 29, top: 50 },
                { xMin: 650, xMax: 715, yMin: 325, yMax: 390, rotation: '75deg', left: 26, top: 50 },
                { xMin: 715, xMax: 780, yMin: 325, yMax: 390, rotation: '75deg', left: 25, top: 47 },
                { xMin: 780, xMax: 845, yMin: 325, yMax: 390, rotation: '85deg', left: 22, top: 46 },
                { xMin: 845, xMax: 910, yMin: 325, yMax: 390, rotation: '95deg', left: 20, top: 44 },
                { xMin: 910, xMax: 975, yMin: 325, yMax: 390, rotation: '110deg', left: 20, top: 39 },

                /* ROW 7 */
                { xMin: 0, xMax: 65, yMin: 390, yMax: 480, rotation: '-36deg', left: 38, top: 39 },
                { xMin: 65, xMax: 130, yMin: 390, yMax: 480, rotation: '-36deg', left: 38, top: 39 },
                { xMin: 130, xMax: 195, yMin: 390, yMax: 480, rotation: '-36deg', left: 39, top: 39 },
                { xMin: 195, xMax: 227, yMin: 390, yMax: 480, rotation: '-36deg', left: 36, top: 39 },
                { xMin: 227, xMax: 260, yMin: 390, yMax: 480, rotation: '-36deg', left: 45, top: 39 },
                { xMin: 260, xMax: 325, yMin: 390, yMax: 480, rotation: '-36deg', left: 46, top: 39 },
                { xMin: 325, xMax: 390, yMin: 390, yMax: 480, rotation: '-36deg', left: 44, top: 39 },
                { xMin: 390, xMax: 430, yMin: 390, yMax: 480, rotation: '-36deg', left: 40, top: 39 },
                { xMin: 430, xMax: 455, yMin: 390, yMax: 480, rotation: '-34deg', left: 40, top: 42 },

                { xMin: 455, xMax: 550, yMin: 390, yMax: 480, rotation: '-12deg', left: 48, top: 44 },

                { xMin: 550, xMax: 560, yMin: 390, yMax: 480, rotation: '12deg', left: 37, top: 37 },
                { xMin: 560, xMax: 570, yMin: 390, yMax: 480, rotation: '12deg', left: 37, top: 37 },
                { xMin: 570, xMax: 580, yMin: 390, yMax: 480, rotation: '12deg', left: 37, top: 37 },
                { xMin: 580, xMax: 585, yMin: 390, yMax: 480, rotation: '12deg', left: 37, top: 37 },

                { xMin: 585, xMax: 650, yMin: 390, yMax: 480, rotation: '70deg', left: 25, top: 54 },

                { xMin: 650, xMax: 715, yMin: 390, yMax: 480, rotation: '75deg', left: 26, top: 50 },
                { xMin: 715, xMax: 780, yMin: 390, yMax: 480, rotation: '75deg', left: 25, top: 47 },
                { xMin: 780, xMax: 845, yMin: 390, yMax: 480, rotation: '85deg', left: 22, top: 46 },
                { xMin: 845, xMax: 910, yMin: 390, yMax: 480, rotation: '95deg', left: 20, top: 44 },
                { xMin: 910, xMax: 975, yMin: 390, yMax: 480, rotation: '110deg', left: 20, top: 39 }
            ]

            for (let i = 0; i < rows.length; i++) {
                if ((relativePos.left >= rows[i].xMin && relativePos.left <= rows[i].xMax) && (relativePos.top >= rows[i].yMin && relativePos.top <= rows[i].yMax)) {
                    mX = parseInt(relativePos.left + rows[i].left)
                    mY = parseInt(relativePos.top + rows[i].top)
                    rotation = rows[i].rotation

                    // console.log('Column (x): ', rows[i].xMin, ' - ', rows[i].xMax, ' (y): ' + rows[i].yMin + ' - ' + rows[i].yMax + ' | Rotation: ', rotation)
                    // console.log('rPosLeft: ', relativePos.left, ' rPosTop: ', relativePos.top)
                    // console.log('mX (Left): ', mX, ' mY (Top): ', mY)

                    TweenMax.to(redConnector, 0, {
                        rotation: rotation
                    })
                }
            }

            // Curve (X,Y)
            qX = 609
            qY = 507

            // End Points (X,Y)
            tX = 851
            tY = 581

            // Update red wire element
            redWire.setAttribute('d', 'M ' +
                mX + ' ' +
                mY + ' Q ' +
                qX + ', ' +
                qY + ', ' +
                tX + ' ' +
                tY
            )
        },
        onRelease: function() {
            // Disable incorrect
            vm.isClickable = false
            // Place hose at bottom of screen
            TweenMax.set('#red-connector-container', { x: -60, y: 100 })
            document.querySelector('#red-connector').style.transform = ('rotate(-16deg)')
            document.querySelector('#redWire').setAttribute('d', 'M 483 477 Q 607 529 851 581')
            // Call next Action
            vm.t2a2()
        }
    })
}

// TASK 4 Action 2: Correct
const t2a2 = function() {
    this.$core.Activity.correct(
        ResponseData.correct.t2.vo,
        ResponseData.correct.t2.cc,
        () => {
            // Hide hint
            this.t2ShowHint = false
            // Call complete task
            this.t2Completed()
        }
    )
}

// TASK 2: Completed (Required)
const t2Completed = function() {
    this.$core.Activity.taskComplete(
        ResponseData.correct.t2.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t3()
}

// Task 3: Constructor
const t3 = function() {
    this.currentTask = 't3'
    this.$core.Activity.Audio.play(
        TaskData.t3.vo,
        TaskData.t3.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
        }
    )
}

// TASK 3: Action 1 (Turn ignition on)
const t3a1 = function() {
    // Disable incorrect
    this.isClickable = false
    // Call correct
    this.$core.Activity.correct(
        ResponseData.correct.t3.vo,
        ResponseData.correct.t3.cc,
        () => {
            // Call next view
            this.transitionToView()
        }
    )
}

// TransToView (Required)
// This is called to transistion to next view
const transitionToView = function() {
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        Vue.core.ContinueButton.hide()
        Vue.core.Activity.nextView('A4V3')
    })
}

// Required to export all functions created in this file.
export default {
    incorrectResponse,
    t2,
    t2a1,
    t2a2,
    t2Completed,
    t3,
    t3a1,
    transitionToView
}
