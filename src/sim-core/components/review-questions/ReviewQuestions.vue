<template>
    <div id="review-questions">
        <module-header></module-header>
        <icon-bar></icon-bar>
        <div id="review-questions-container">
            <div class="header" v-if="currentRQViewId === 1">Review Questions</div>
            <div class="no-header" v-if="currentRQViewId > 1"></div>
            <review-questions-template></review-questions-template>
        </div>
        <module-footer></module-footer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import ModuleHeader from '../module-shell/ModuleHeader'
    import ModuleFooter from '../module-shell/module-footer/ModuleFooter'
    import ReviewQuestionsTemplate from '../../../review-questions/ReviewQuestionsTemplate'
    import IconBar from '../module-shell/icon-bar/IconBar'

    export default {
        name: 'ReviewQuestions',
        components: {
            ModuleHeader,
            ModuleFooter,
            ReviewQuestionsTemplate,
            IconBar
        },
        computed: mapGetters({
            currentRQViewId: 'getCurrentReviewQuestionsViewId'
        })
    }
</script>

<style lang="scss">

    #review-questions {
        position: absolute;
        width: 1000px;
        height: 625px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        background: url('/assets/img/module/car.jpg');

        #review-questions-container {
            position: absolute;
            width: 940px;
            height: 450px;
            top: 110px;
            right: 0px;
            left: 0px;
            bottom: 0px;
            margin: 0 auto;
            background-color: #fff;
            box-shadow: 3px 3px 2px 0px rgba(0,0,0,0.55);

            .header {
                float:left;
                width: 100%;
                color: #8e0007;
                font-family: RobotoSlab-Bold;
                font-size: 34px;
                text-align: center;
                line-height: 30px;
                margin-top: 20px;
            }

            .no-header {
                float:left;
                width: 100%;
                height: 40px;
            }

            #review-questions-template {
                position: relative;
                float:left;
                width: 100%;
                box-sizing: border-box;
                text-align: left;
                margin-top: 25px;
                padding: 0px 25px;

                .column {
                    float:left;
                    width: 435px;

                    &:first-child {
                        margin-left: 0px;
                    }
                }

                .question {
                    float:left;
                    font-family: Roboto-Medium;
                    font-size: 15px;
                    line-height: 22px;
                    color: #111111;
                    margin-top: 20px;

                    .question-title {
                        display:table-row;
                        position: relative;
                        line-height: 17px;

                        span {
                            display: table-cell;

                            &:first-child {
                                width: 25px;
                            }
                        }
                    }

                    .answers {
                        float: left;
                        width: 100%;
                        margin-top: 5px;

                        .option {
                            position: relative;
                            width: 100%;
                            padding-left: 30px;
                            text-align: left;

                            .tickmark {
                                float: left;
                                width: 26px;
                                height: 26px;
                                margin-left: -18px;
                            }
                            &.correct {
                                background: url(/assets/img/icons/tick.png) no-repeat 2px -3px;
                            }
                            &.incorrect {
                                background: url(/assets/img/icons/cross.png) no-repeat 2px 1px;
                            }

                            input[type="radio"],
                            input[type="checkbox"] {
                                opacity:0;
                                pointer-events: all;
                            }

                            input[type="radio"]:not(old) + label {
                                display: inline-block;
                                margin-left: -25px;
                                padding-left: 25px;
                                min-height: 18px;
                                line-height: 22px;
                                background: url(/assets/img/icons/radio.png) no-repeat 0 4px;
                                pointer-events: all;
                            }
                            input[type=radio]:not(old):checked + label {
                                background: url(/assets/img/icons/radio-selected.png) no-repeat 0 4px;
                                pointer-events: all;
                            }
                            input[type="checkbox"]:not(old) + label {
                                display: inline-block;
                                margin-left: -25px;
                                padding-left: 25px;
                                min-height: 18px;
                                vertical-align: bottom;
                                background: url(/assets/img/icons/checkbox.png) no-repeat 0 0;
                                pointer-events: all;
                            }
                            input[type=checkbox]:not(old):checked + label {
                                background: url(/assets/img/icons/checkbox_select.png) no-repeat 0 0;
                            }
                        }
                    }
                }

                .column .question:first-child {
                    margin-top: 0;
                }

                .btn-submit {
                    position: absolute;
                    margin: auto;
                    width: 150px;
                    height: 32px;
                    background: url(/assets/img/buttons/horizontal/submit.png);
                    background-size: 100% 100%;
                    cursor: pointer;
                    top: 320px;
                    right: 25px;

                    &:active {
                        background: url(/assets/img/buttons/horizontal/submit_over.png);
                        background-size: 100% 100%;
                    }
                }

                @-moz-document url-prefix() {
                    .btn-submit {
                        top: 335px;
                    }
                }   

                .btn-continue {
                    position: absolute;
                    margin: auto;
                    width: 150px;
                    height: 32px;
                    background: url(/assets/img/buttons/horizontal/continue.png);
                    background-size: 100% 100%;
                    cursor: pointer;
                    top: 320px;
                    right: 25px;

                    &:active {
                        background: url(/assets/img/buttons/horizontal/continue_over.png);
                        background-size: 100% 100%;
                    }
                }

                .btn-view-scorecard {
                    position: absolute;
                    margin: auto;
                    width: 150px;
                    height: 32px;
                    background: url(/assets/img/buttons/horizontal/view_socrecard_small.png);
                    background-size: 100% 100%;
                    cursor: pointer;
                    top: 320px;
                    right: 25px;

                    &:active {
                        background: url(/assets/img/buttons/horizontal/view_socrecard_over_small.png);
                        background-size: 100% 100%;
                    }
                }

                @-moz-document url-prefix() {
                    .btn-view-scorecard {
                        top: 335px;
                    }  
                }   
            }
        }

    }
</style>
