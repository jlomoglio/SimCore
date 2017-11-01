<template>
    <div id="performance-report">
        <module-header></module-header>
        <div id="performance-report-container">
            <div id="report-data-container">
                <div id="main-heading" class="bar-bg">
                    Performance Report: {{this.fullName}}
                </div>
                <div id="summary">
                    <div class="row">
                        <div id="total-activities">
                            <span>Total Activities<br /> {{ this.moduleData.activities.length}}</span>
                        </div>
                        <div id="total-score">
                            Total Score<br /> {{ this.moduleData.totalScore}}/{{ this.moduleData.totalPossibleScore}}
                        </div>
                        <div id="percentage">
                            Percentage<br />{{ this.moduleData.totalScorePercent}}%
                        </div>
                        <div id="time-elapsed">
                            Time Elapsed<br />{{ this.moduleData.totalTimeElapsed}}
                        </div>
                    </div>
                </div>
                <div id="activity-data-heading">
                    <div class="row">
                        <div id="number">Activity<br />Number</div>
                        <div id="module-name">{{ this.moduleData.moduleName}}</div>
                        <div id="total-activity-score">Total Activity Score</div>
                        <div id="steps">Steps</div>
                        <div id="attempts">Attempts</div>
                        <div id="your-score">Your<br />Score</div>
                    </div>
                </div>
                <div id="activity-data">
                    <div class="list" v-for="activity in this.moduleData.activities">
                        <div class="activity-heading bar-bg">
                            <div class="row">
                                <div class="activity-id">
                                    <p>{{ activity.id.replace('A', '') }}</p>
                                </div>
                                <div class="activity-title">
                                    <p>{{ activity.title}}</p>
                                </div>
                                <div class="total-activity-score">
                                    <p>{{ activity.totalPossibleScore }}</p>
                                </div>
                                <div class="activity-steps"></div>
                                <div class="activity-attempts"></div>
                                <div class="activity-score"></div>
                            </div>
                        </div>
                        <div class="completed-tasks" v-for="completedTask in activity.completedTasks">
                            <div class="row">
                                <div class="blank"></div>
                                <div class="task" v-html="completedTask.label"></div>
                                <div class="attempts">
                                    {{ completedTask.attempts }}
                                </div>
                                <div class="total-score">
                                    {{ completedTask.score }}
                                </div>
                            </div>
                        </div>
                        <div class="completed-tasks">
                            <div class="row">
                                <div class="blank"></div>
                                <div class="task your-score">Your Score:</div>
                                <div class="attempts"></div>
                                <div class="total-score">
                                    {{ activity.totalScore }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="review-questions-data">
                    Review Questions: {{this.moduleData.reviewQuestions.totalScore}}
                    out of {{this.moduleData.reviewQuestions.totalPossibleScore}}
                </div>
            </div>

            <div id="performance-report-btns">
                <a class="download-report-btn" @click="downloadPDF"></a>
                <a class="close-window-btn" @click="closeWindow"></a>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import { downloadReportAsPDF } from '../../core/reporting'
    import { closeModuleWindow } from '../../core/lti'
    import ModuleHeader from '../module-shell/ModuleHeader'
    export default {
        name: 'PerformanceReport',
        components: {
            ModuleHeader
        },
        mounted () {
            this.$store.commit('setActivityName', null)
        },
        computed: {
            ...mapGetters({
                moduleData: 'getModuleData'
            }),
            fullName () {
                return this.moduleData.firstName + ' ' + this.moduleData.lastName
            }
        },
        methods: {
            downloadPDF () {
                downloadReportAsPDF()
            },
            closeWindow () {
                closeModuleWindow()
            }
        }
    }
</script>

<style lang="scss" scoped>
    #performance-report {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        background: #fff;

        #performance-report-container {
            float:left;
            width: 100%;
            height: 500px;
            color: #000;
            margin-top: 50px;
            padding-top: 25px;
            border-top: 2px solid #000;

            #report-data-container {
                position: relative;
                width: 900px;
                height: 471px;
                font-family: RobotoCondensed-Regular;
                font-size: 15px;
                text-align: left;
                border: 1px solid #000;
                margin: 0 auto;
                overflow-y: auto;

                & ::-webkit-scrollbar {
                    background: lightgrey;
                    width: 10px;
                    border-radius: 5px;
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                }

                & ::-webkit-scrollbar-thumb {
                    background-color: dimgrey;
                    outline: 0px solid dimgrey;
                    cursor: pointer;
                    border-radius: 5px;
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                    height: 80px;

                }

                #main-heading {
                    float:left;
                    width: 100%;
                    height: 40px;
                    padding: 10px;
                    border-bottom: 1px solid #000;
                    box-sizing: border-box;
                }

                #summary {
                    display: table;
                    width: 100%;
                    height: auto;
                    text-align: center;
                    padding: 2px 8px;
                    box-sizing: border-box;

                    #total-activities {
                        display: table-cell;
                        width: 35%;
                        text-align: left;

                        span {
                            display: block;
                            width: 90px;
                            text-align: center;
                        }
                    }
                    #total-score {
                        display: table-cell;
                        width: 20%;
                    }
                    #percentage {
                        display: table-cell;
                        width: 20%;
                    }
                    #time-elapsed {
                        display: table-cell;
                        width: 30%;
                    }
                }

                #activity-data-heading {
                    display: table;
                    width: 100%;
                    border-top: 1px solid #000;
                    border-collapse: collapse;

                    & > div > div {
                        display: table-cell;
                        height: 60px;
                        font-family: RobotoCondensed-Bold;
                        vertical-align: middle;
                        text-align: center;
                        border: 1px solid #000;

                        &:first-child {
                            border-left: 0;
                        }
                    }

                    #number {
                        width: 105px;
                    }
                    #module-name {
                        width: 290px;
                    }
                    #total-activity-score {
                        width: 65px;
                    }
                    #steps {
                        width: 350px;
                    }
                    #attempts {
                        width: 70px;
                    }
                    #your-score {
                        width: 70px;
                    }
                }

                #activity-data {
                    float:left;
                    width: 100%;

                    .activity-heading {
                        display: table;
                        width: 100%;
                        border-collapse: collapse;

                        & > div > div {
                            display: table-cell;
                            height: 40px;
                            vertical-align: middle;
                            text-align: center;
                            border: 1px solid #000;
                            border-top: 0;
                            box-sizing: border-box;

                            &:first-child {
                                border-left: 0;
                            }
                        }
                        .activity-id {
                            width: 100px;
                        }
                        .activity-title {
                            width: 276px;
                        }
                        .total-activity-score {
                            width: 65px;
                        }
                        .activity-steps {
                            width: 325px;
                        }
                        .activity-attempts {
                            width: 70px;
                        }
                        .activity-score {
                            width: 68px;
                        }
                    }

                    .completed-tasks {
                        display: table;
                        width: 100%;
                        border-collapse: collapse;

                        & > div > div {
                            display: table-cell;
                            height: 45px;
                            vertical-align: middle;
                            text-align: center;
                            border: 1px solid #000;
                            border-top: 0;
                            box-sizing: border-box;

                            &:first-child {
                                border-left: 0;
                            }
                        }

                        .blank {
                            width: 440px;
                            border: 0;
                        }
                        .task {
                            width: 324px;
                            text-align: left;
                            padding: 0px 10px;

                            &.your-score {
                                text-align: right;
                            }
                        }
                        .attempts {
                            width: 70px;
                        }
                        .total-score {
                            width: 68px;
                        }

                        &:last-child {
                            .blank {
                                border-bottom: 1px solid #000;
                            }
                        }
                    }
                }

                #review-questions-data {
                    display: table-cell;
                    padding: 0px 10px;
                    height: 40px;
                    vertical-align: middle;
                }

                .row {
                    display: table-row;
                    width: 100%;
                }

            }

            #performance-report-btns {
                float:left;
                width: 100%;
                margin-top: 32px;

                .download-report-btn {
                    display: inline-block;
                    width: 200px;
                    height: 43px;
                    background: url(/assets/img/buttons/horizontal/download.png) no-repeat;
                    background-size: 100%;

                    &:active {
                        background: url(/assets/img/buttons/horizontal/download_over.png) no-repeat;
                        background-size: 100%;
                    }
                }

                .close-window-btn {
                    display: inline-block;
                    width: 200px;
                    height: 43px;
                    background: url(/assets/img/buttons/horizontal/close_window.png) no-repeat;
                    background-size: 100%;
                    margin-left: 60px;

                    &:active {
                        background: url(/assets/img/buttons/horizontal/close_window_over.png) no-repeat;
                        background-size: 100%;
                    }
                }
            }

            .bar-bg {
                background: #A6B6BE;
            }
        }
    }
</style>
