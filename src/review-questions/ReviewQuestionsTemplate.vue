<script type="text/javascript" src="../sim-core/components/review-questions/ReviewQuestionsTemplate.js"></script>

<template>
    <div id="review-questions-template">
        <rq-view :viewId="1">
            <rq-column>
                <rq-question questionId="1"></rq-question>
                <rq-question questionId="3"></rq-question>
            </rq-column>
            <rq-column>
                <rq-question questionId="2"></rq-question>
                <rq-question questionId="4"></rq-question>
            </rq-column>

            <rq-submit></rq-submit>
            <rq-view-score-card></rq-view-score-card>
            <!-- <rq-continue></rq-continue> -->
        </rq-view>


        <!-- <rq-view :viewId="2">
            <rq-column>
                <rq-question questionId="5"></rq-question>
            </rq-column>
            <rq-column>
                <rq-question questionId="6"></rq-question>
            </rq-column>

            <rq-submit></rq-submit>
            <rq-view-score-card></rq-view-score-card>

        </rq-view> -->
    </div>
</template>
<style>

</style>
