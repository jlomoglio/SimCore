<template>
    <div id="view-score-card">
        <module-header></module-header>
        <div id="view-score-card-container">
            <div id="congratulations" v-if="moduleData.passed">
                <h2 class="congrats-title">Congratulations!</h2>
                <p class="congrats-message">You have successfully completed<br />the simulation on {{ this.convertToPascalCase(this.moduleData.moduleName) }}.</p>
            </div>
            <div id="no-congratulations" v-else>
                <p class="congrats-message">Sorry. You have not successfully completed<br />the simulation on {{ this.convertToPascalCase(this.moduleData.moduleName) }}.</p>
            </div>
            <div id="results-score">
                Here is Your Score: {{ this.moduleData.totalScorePercent }}%
            </div>
            <div id="time-elapsed">
                Time elapsed: {{ this.moduleData.totalTimeElapsed }}
            </div>
            <div id="view-score-card-btns">
                <div class="view-report-btn" @click="viewProgressReport"></div>
                <div class="close-window-btn" @click="closeWindow"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { playAudio } from '../../core/audio-player'
    import { closeModuleWindow } from '../../core/lti'
    import ModuleHeader from '../module-shell/ModuleHeader'
    export default {
        name: 'ViewScoreCard',
        components: {
            ModuleHeader
        },
        data () {
            return {
                moduleData: this.$store.getters.getModuleData
            }
        },
        mounted () {
            console.log(this.moduleData.passed)
            this.$store.commit('setActivityName', null)
            const scoreCardVO = '/assets/audio/' + (this.moduleData.passed ? 'Congratulations.mp3' : 'Sorry.mp3')
            playAudio(scoreCardVO, null)
        },
        methods: {
            viewProgressReport () {
                this.$store.commit('setCurrentView', 'PerformanceReport')
            },
            closeWindow () {
                closeModuleWindow()
            },
            convertToPascalCase (string) {
                return string.replace(/\w+/g,
                    function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase() })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #view-score-card {
        position: absolute;
        width: 1000px;
        height: 625px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        background: url('/assets/img/activities/engine_compartment_without_AC_machine.png');

        #view-score-card-container {
            position: absolute;
            width: 940px;
            height: 450px;
            top: 110px;
            right: 0px;
            left: 0px;
            bottom: 0px;
            margin: 0 auto;
            background-color: #fff;
            box-shadow: 3px 3px 2px 0px rgba(0, 0, 0, 0.55);

            #congratulations {
                float:left;
                width: 100%;
                margin-top: 40px;
                margin-bottom: 25px;

                h2 {
                    margin: 0;
                    font-family: RobotoSlab-Bold;
                    font-size: 52px;
                    color: #8e191b;
                }
            }

            #no-congratulations {
                float:left;
                width: 100%;
                margin-top: 100px;
                margin-bottom: 25px;
            }

            .congrats-message {
                font-family: Roboto-Medium;
                font-size: 24px;
                line-height: 38px;
                color: #d20014;
            }

            #results-score {
                float:left;
                width: 100%;
                font-family: Roboto-Medium;
                font-size: 48px;
                color: #000000;
                margin-bottom: 20px;
            }

            #time-elapsed {
                font-family: Roboto-Medium;
                font-size: 24px;
                line-height: 38px;
                color: #d20014;
            }

            #view-score-card-btns {
                width: 100%;
                position:absolute;
                bottom: 20px;

                .view-report-btn {
                    display: inline-block;
                    width:200px;
                    height:43px;
                    background: url(/assets/img/buttons/horizontal/progress_report.png) no-repeat;
                    background-size:100%;

                    &:active {
                        background: url(/assets/img/buttons/horizontal/progress_report_over.png) no-repeat;
                        background-size:100%;
                    }
                }

                .close-window-btn {
                    display: inline-block;
                    width:200px;
                    height:43px;
                    background: url(/assets/img/buttons/horizontal/close_window.png) no-repeat;
                    background-size:100%;
                    margin-left: 60px;

                    &:active {
                        background: url(/assets/img/buttons/horizontal/close_window_over.png) no-repeat;
                        background-size:100%;
                    }
                }

            }

        }
    }
</style>
