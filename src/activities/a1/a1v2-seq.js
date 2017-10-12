// Required to import Data file and Vue
import ResponseData from '../../data/a1/a1-response-data.json'
import TaskData from '../../data/a1/a1-task-data.json'
import { Draggable, TweenMax, SteppedEase } from 'gsap'

// IncorrectResponse function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.response(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}

// TASK 3: Constructor
const t3 = function() {
    this.currentTask = 't3'
    this.$core.Activity.Audio.play(
        TaskData.t3.vo,
        TaskData.t3.cc,
        () => {
            this.isClickable = true
            this.t3a1()
        }
    )
}

// TASK 3 Action 1:
// Connect the low side hose to the low side service port.
const t3a1 = function() {
    let vm = this
    this.isClickable = false
    // Blue Connectors
    Draggable.create('#blue-connector-container', {
        type: 'x,y',
        bounds: '#wireContainer',
        zIndexBoost: false,
        onDrag: function () {
            vm.t3ShowHint = false

            let blueWire = document.querySelector('#blueWire')
            let blueConnector = document.querySelector('#blue-connector')
            let blueConnectorContainer = document.querySelector('#blue-connector-container')
            let rotation = '25deg'
            let parentPos = document.getElementById('content').getBoundingClientRect()
            let childPos = blueConnectorContainer.getBoundingClientRect()

            let relativePos = {}
            relativePos.top = childPos.top - parentPos.top
            relativePos.right = childPos.right - parentPos.right
            relativePos.bottom = childPos.bottom - parentPos.bottom
            relativePos.left = childPos.left - parentPos.left

            let mX = parseInt(relativePos.left + 37)
            let mY = parseInt(relativePos.top + 37)

            let qX = 609
            let qY = 507
            let tX = 951
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

                    console.log('Column (x): ', rows[i].xMin, ' - ', rows[i].xMax, ' (y): ' + rows[i].yMin + ' - ' + rows[i].yMax + ' | Rotation: ', rotation)
                    console.log('rPosLeft: ', relativePos.left, ' rPosTop: ', relativePos.top)
                    console.log('mX (Left): ', mX, ' mY (Top): ', mY)

                    TweenMax.to(blueConnector, 0, {
                        rotation: rotation
                    })
                }
            }

            qX = 609
            qY = 507 // 507

            // End Points (X,Y)
            tX = 951
            tY = 581

            blueWire.setAttribute('d', 'm ' +
                mX + ' ' +
                mY + ' Q ' +
                qX + ', ' +
                qY + ', ' +
                tX + ' ' +
                tY
            )
        },
        onRelease: function() {
            if (this.hitTest('#blue-service-port', this.threshold)) {
                this.snapMade = true
                this.disable()
                vm.t3a2()
            } else {
                TweenMax.set('#blue-connector-container', { x: 0, y: 0 })
                document.getElementById('blue-connector').style.transform = ('rotate(-4deg)')
                document.getElementById('blueWire').setAttribute('d', 'M 588 485 Q 609 507 643 581')
                vm.incorrect('t3')
            }
        }
    })
}
// TASK 3 Action 2: Correct
const t3a2 = function() {
    this.$core.Activity.correct(
        ResponseData.correct.t3.vo,
        ResponseData.correct.t3.cc,
        () => {
            this.t3ShowHint = false
            // this.isClickable = true
            this.t3Completed()
        }
    )
}

// TASK 3: Completed (Required)
const t3Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t3.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    this.currentPoints = 3
    this.currentAttempts = 1
    this.t4()
}

// Task 4: Constructor
const t4 = function() {
    this.currentTask = 't4'
    this.$core.Activity.Audio.play(
        TaskData.t4.vo,
        TaskData.t4.cc,
        () => {
            this.isClickable = true
            this.t4a1()
        }
    )
}

// TASK 4:
// Connect the high side hose to the high side service port.
const t4a1 = function() {
    this.isClickable = false
    let vm = this
    // Red Connectors
    Draggable.create('#red-connector-container', {
        type: 'x,y',
        bounds: '#wireContainer',
        zIndexBoost: false,
        onDrag: function () {
            vm.t4ShowHint = false

            let redWire = document.querySelector('#redWire')
            let redConnector = document.querySelector('#red-connector')
            let redConnectorContainer = document.querySelector('#red-connector-container')
            let rotation = '25deg'
            let parentPos = document.getElementById('content').getBoundingClientRect()
            let childPos = redConnectorContainer.getBoundingClientRect()

            let relativePos = {}
            relativePos.top = childPos.top - parentPos.top
            relativePos.right = childPos.right - parentPos.right
            relativePos.bottom = childPos.bottom - parentPos.bottom
            relativePos.left = childPos.left - parentPos.left

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

                    console.log('Column (x): ', rows[i].xMin, ' - ', rows[i].xMax, ' (y): ' + rows[i].yMin + ' - ' + rows[i].yMax + ' | Rotation: ', rotation)
                    console.log('rPosLeft: ', relativePos.left, ' rPosTop: ', relativePos.top)
                    console.log('mX (Left): ', mX, ' mY (Top): ', mY)

                    TweenMax.to(redConnector, 0, {
                        rotation: rotation
                    })
                }
            }

            qX = 609
            qY = 507 // 507

            // End Points (X,Y)
            tX = 851
            tY = 581

            redWire.setAttribute('d', 'm ' +
                mX + ' ' +
                mY + ' Q ' +
                qX + ', ' +
                qY + ', ' +
                tX + ' ' +
                tY
            )
        },
        onRelease: function() {
            vm.isClickable = false
            if (this.hitTest('#red-service-port', this.threshold)) {
                this.snapMade = true
                this.disable()
                vm.t4a2()
            } else {
                TweenMax.set('#red-connector-container', { x: 0, y: 0 })
                document.getElementById('red-connector').style.transform = ('rotate(-4deg)')
                document.getElementById('redWire').setAttribute('d', 'M 516 483 Q 607 529 643 581')
                vm.incorrect('t4')
            }
        }
    })
}

// TASK 4 Action 2: Correct
const t4a2 = function() {
    this.$core.Activity.correct(
        ResponseData.correct.t4.vo,
        ResponseData.correct.t4.cc,
        () => {
            this.t4ShowHint = false

            this.t4Completed()
        }
    )
}

// TASK 4: Completed (Required)
const t4Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t4.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    this.currentPoints = 3
    this.currentAttempts = 1
    this.t5()
}

// Task 5: Constructor
const t5 = function() {
    this.currentTask = 't5'
    this.$core.Activity.Audio.play(
        TaskData.t5.vo,
        TaskData.t5.cc,
        () => {
            this.isClickable = true
            this.t5Clickable = true
        }
    )
}

// TASK 5 Action 1: Correct
const t5a1 = function() {
    this.isClickable = false
    this.t5Clickable = false
    this.$core.Activity.correct(
          ResponseData.correct.t5.vo,
          ResponseData.correct.t5.cc,
          () => {
              this.t5ShowHint = false
              this.isClickable = false
              this.t5ShowHint = false
              this.t5Completed()
          }
      )
}

// TASK 3 Action 2: Correct
const t5Completed = function() {
    this.$core.Activity.taskComplete(
      TaskData.t5.reportLabel,
      this.currentAttempts,
      this.currentPoints
  )
    this.currentPoints = 3
    this.currentAttempts = 1
    this.t6()
}

// Task 4: Constructor
const t6 = function() {
    this.currentTask = 't6'
    this.$core.Activity.Audio.play(
        TaskData.t6.vo,
        TaskData.t6.cc,
        () => {
            this.isClickable = true
            this.t6Clickable = true
        }
    )
}

// TASK 6 Action 1: Correct
const t6a1 = function() {
    this.isClickable = false
    this.t6Clickable = false
    this.$core.Activity.correct(
        ResponseData.correct.t6.vo,
        ResponseData.correct.t6.cc,
        () => {
            this.t6ShowHint = false
            this.isClickable = false
            this.t6ShowHint = false
            this.t6a2()
        }
    )
}

// TASK 6 Action 2: Animation
const t6a2 = function() {
    this.aniIsShown = true

    TweenMax.to('#t6a2-ani', 6.0, {
        backgroundPosition: '-59600px 0px',
        ease: SteppedEase.config(149)
    })

    setTimeout(() => {
        this.t6Completed()
    }, 8000)
}

// TASK 3 Action 2: Correct
const t6Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t6.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    this.transitionToView()
}

// TransToView (Required)
// This is called to transistion to next view
const transitionToView = function() {
    const vm = this
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        vm.$core.ContinueButton.hide()
        vm.$core.Activity.nextView('A1V3')
    })
}

// Required to export all functions created in this file.
export default {
    incorrectResponse,
    t3,
    t3a1,
    t3a2,
    t3Completed,
    t4,
    t4a1,
    t4a2,
    t4Completed,
    t5,
    t5a1,
    t5Completed,
    t6,
    t6a1,
    t6a2,
    t6Completed,
    transitionToView
}
