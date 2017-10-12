<template>
    <div id="ignition-switch"
        :style="{ left: left, top: top, right: right, bottom: bottom }"
    >
        <div id="ignition-switch-plate" :class="ignitionOn ? 'on' : 'off'">
            <div id="ignition-key"></div>
        </div>

        <hint-box id="lock-hint" v-hint="lockShowHint"></hint-box>
        <hint-box id="acc-hint" v-hint="accShowHint"></hint-box>
        <hint-box id="on-start-hint" v-hint="onShowHint"></hint-box>

        <div id="lock-hotspot" @click="setMode('lock')"></div>
        <div id="acc-hotspot" @click="setMode('acc')"></div>
        <div id="on-hotspot" @click="setMode('on')"></div>
        <div id="start-hotspot" @click="setMode('start')"></div>
    </div>
</template>

<script>
import { TweenMax, Draggable } from 'gsap'
import HintBox from '../HintBox'

export default {
    name: 'IgnitionSwitch',
    props: [
        'left',
        'top',
        'right',
        'bottom',
        'lockHint',
        'accHint',
        'onHint'
    ],
    components: {
        HintBox
    },
    data() {
        return {
            ignitionOn: false,
            lockShowHint: this.lockHint,
            accShowHint: this.accHint,
            onShowHint: this.onHint
        }
    },
    mounted() {
        // Reassign this
        let vm = this
        // Setup Draggable
        Draggable.create('#ignition-key', {
            type: 'rotation',
            throwProps: true,
            zIndexBoost: false,
            bounds: {
                minRotation: 55,
                maxRotation: 160
            },
            onDrag: function() {

            },
            onRelease: function() {
                // LOCK Mode
                if (this.rotation >= 55 && this.rotation < 70) {
                    TweenMax.set('#ignition-key', {
                        rotation: 55
                    })
                    vm.lockShowHint = false
                    vm.ignitionOn = false
                    vm.$emit('lock')
                }
                // ACC Mode
                else if (this.rotation > 80 && this.rotation < 112) {
                    TweenMax.set('#ignition-key', {
                        rotation: 95
                    })
                    vm.accShowHint = false
                    vm.ignitionOn = false
                    vm.$emit('acc')
                }
                // ON Mode
                else if (this.rotation > 115 && this.rotation < 125) {
                    TweenMax.set('#ignition-key', {
                        rotation: 122
                    })
                    vm.onShowHint = false
                    vm.ignitionOn = true
                    vm.$emit('on')
                }
                // START Mode
                else if (this.rotation > 135 && this.rotation <= 160) {
                    TweenMax.to('#ignition-key', 1.0, {
                        rotation: 122
                    })
                    vm.onShowHint = false
                    vm.ignitionOn = true
                    vm.$emit('start')
                }
            }
        })
    },
    watch: {
        lockHint(newVal) {
            return this.lockShowHint = newVal
        },
        accHint(newVal) {
            return this.accShowHint = newVal
        },
        onHint(newVal) {
            return this.onShowHint = newVal
        }
    },
    methods: {
        // Rotates Key based on mode that is clicked
        setMode(mode) {
            // Reassign this
            let vm = this

            // LOCK mode
            if (mode === 'lock') {
                TweenMax.to('#ignition-key', 1.0, {
                    rotation: 55
                })
                vm.lockShowHint = false
                this.ignitionOn = false
                this.$emit('lock')
            }
            // ACC Mode
            else if (mode === 'acc') {
                TweenMax.to('#ignition-key', 1.0, {
                    rotation: 95
                })
                vm.accShowHint = false
                this.ignitionOn = false
                this.$emit('acc')
            }
            // ON Mode
            else if (mode === 'on') {
                TweenMax.to('#ignition-key', 1.0, {
                    rotation: 122
                })
                this.onShowHint = false
                this.ignitionOn = true
                this.$emit('on')
            }
            // START mode
            else if (mode === 'start') {
                TweenMax.to('#ignition-key', 1.0, {
                    rotation: 160,
                    onComplete: function() {
                        vm.setToOn()
                    }
                })
                this.onShowHint = false
                this.ignitionOn = true
                this.$emit('start')
            }
        },

        // Rotates key back to ON position
        setToOn() {
            TweenMax.to('#ignition-key', 1.0, {
                rotation: 122
            })
            this.ignitionOn = true
            this.$emit('on')
        }
    }
}
</script>

<style scoped>
#ignition-switch {
    position: absolute;
    width: 150px;
    height: 150px;
}

#lock-hotspot {
    position: absolute;
    top: 25px;
    left: 35px;
    width: 25px;
    height: 25px;
    border-radius: 12px;
    z-index: 15px;
}

#lock-hint {
    position: absolute;
    top: 25px;
    left: 35px;
    width: 25px;
    height: 25px;
    border-radius: 12px;
    z-index: 14px;
}

#acc-hotspot {
    position: absolute;
    top: 20px;
    left: 68px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    z-index: 7px;
}

#acc-hint {
    position: absolute;
    top: 20px;
    left: 66px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    z-index: 7px;
}

#on-hotspot {
    position: absolute;
    top: 26px;
    left: 87px;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    z-index: 7px;
}

#on-hint {
    position: absolute;
    top: 26px;
    left: 85px;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    z-index: 7px;
}

#start-hotspot {
    position: absolute;
    top: 40px;
    left: 100px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    z-index: 10px !important;
}

#start-hint {
    position: absolute;
    top: 40px;
    left: 96px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    z-index: 10px !important;
}

#on-start-hint {
    position: absolute;
    top: 38px;
    left: 78px;
    width: 55px;
    height: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    transform: rotate(50deg);
    z-index: 10px !important;
}

#ignition-switch-plate {
    width: 150px;
    height: 150px;
}

#ignition-switch-plate.on {
    background: url('./ignition_key_switch_on.png');
    background-size: 100%;
}

#ignition-switch-plate.off {
    background: url('./ignition_key_switch_off.png');
    background-size: 100%;
}

#ignition-key {
    margin: 0 auto;
    width: 150px;
    height: 150px;
    background: url('./key_use.png') no-repeat;
    background-size: 105%;
    background-position: -320% 280%;
    transform: rotate(0deg); /* lock: 55deg, acc: 100, on: 120, start: 155 */
}
</style>
