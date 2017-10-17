<template>
    <div id="performance-report">
        <module-header></module-header>
        <div id="performance-report-container">
            <div id="report-data">
                <div id="main-heading" class="bar-bg">
                    Performance Report: {{this.fullName}}
                </div>
                <div id="summary">
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
                <div id="activity-data-heading">
                    <div id="number">Activity<br />Number</div>
                    <div id="module-name">{{ this.moduleData.moduleName}}</div>
                    <div id="steps">Steps</div>
                    <div id="attempts">Attempts</div>
                    <div id="your-score">Your<br />Score</div>
                </div>
                <div id="activity-data">
                    <div class="row" v-for="activity in this.moduleData.activities">
                        <div class="activity-heading bar-bg">
                            <div class="activity-id">
                                <p>{{ activity.id.replace('A', '') }}</p>
                            </div>
                            <div class="activity-title">
                                <p>{{ activity.title}}</p>
                            </div>
                            <div class="activity-steps"></div>
                            <div class="activity-attempts"></div>
                            <div class="activity-score"></div>
                        </div>
                        <div class="completed-tasks" v-for="completedTask in activity.completedTasks">
                            <div class="blank"></div>
                            <div class="task">
                                <p>{{ completedTask.label }}</p>
                            </div>
                            <div class="attempts">
                                <p>{{ completedTask.attempts }}</p>
                            </div>
                            <div class="score">
                                <p>{{ completedTask.score }}</p>
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
    import ModuleHeader from '../module-shell/ModuleHeader'
    export default {
        name: 'PerformanceReport',
        components: {
            ModuleHeader
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
                window.close()
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

        #performance-report-container {
            float:left;
            width: 100%;
            height: 500px;
            margin-top: 50px;
            padding-top: 25px;
            border-top: 2px solid #000;

            #report-data {
                position: relative;
                width: 900px;
                height: 471px;
                font-family: RobotoCondensed-Regular;
                font-size: 15px;
                text-align: left;
                border: 1px solid #000;
                margin: 0 auto;
                overflow: auto;

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

                    & > div {
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
                        width: 315px;
                    }
                    #steps {
                        width: 390px;
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

                        & > div {
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
                            width: 103px;
                        }
                        .activity-title {
                            width: 305px;
                        }
                        .activity-steps {
                            width: 372px;
                        }
                        .activity-attempts {
                            width: 71px;
                        }
                        .activity-score {
                            width: 70px;
                        }
                    }

                    .completed-tasks {
                        display: table;
                        width: 100%;
                        border-collapse: collapse;

                        & > div {
                            display: table-cell;
                            height: 45px;
                            vertical-align: middle;
                            text-align: center;
                            border: 1px solid #000;
                            border-top: 0;
                            color: #2c3e50;
                            box-sizing: border-box;

                            &:first-child {
                                border-left: 0;
                            }
                        }

                        .blank {
                            width: 405px;
                        }
                        .task {
                            width: 365px;
                            text-align: left;
                            padding: 0px 10px;
                        }
                        .attempts {
                            width: 70px;
                        }
                        .score {
                            width: 69px;
                        }
                    }
                }

                #review-questions-data {
                    display: table-cell;
                    padding: 0px 10px;
                    height: 40px;
                    vertical-align: middle;
                }

            }

            #performance-report-btns {
                float:left;
                width: 100%;
                margin-top: 45px;

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
