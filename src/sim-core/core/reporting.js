import _ from 'lodash'
import store from '../store/store'
import JSPDF from 'jspdf'

export const addReportingData = (report) => {
    let activities = store.state.moduleData.activities
    const activityIdx = _.findIndex(activities, {
        id: store.state.module.currentActivityId
    })

    activities[activityIdx].completedTasks.push(report)
    store.commit('setActivityCompleted', activities)
}

export const setModuleStartTime = () => {
    store.commit('setModuleStartTime', new Date().getTime())
}

export const setModulePass = (scorePercent) => {
    const moduleData = store.state.moduleData
    return (scorePercent > moduleData.passingScore)
}

export const getModuleTotaltime = () => {
    const endTime = new Date().getTime()
    const timeDiffInSecs = ((endTime - store.state.moduleData.startTime) / 1000)
    store.commit('addToModuleTotalTimeTaken', timeDiffInSecs)
}

export const getModulePossibleTotalScore = () => {
    let totalPossibleScore = 0
    let moduleData = store.state.moduleData
    _.forEach(moduleData.activities, (activity) => {
        totalPossibleScore += activity.totalPossibleScore
    })
    totalPossibleScore += moduleData.reviewQuestions.totalPossibleScore
    return totalPossibleScore
}

export const getModuleTotalScore = () => {
    let totalScore = 0
    let moduleData = store.state.moduleData
    _.forEach(moduleData.activities, (activity) => {
        totalScore += activity.totalScore
    })
    totalScore += moduleData.reviewQuestions.totalScore
    return totalScore
}

export const getModuleScorePercent = () => {
    const moduleData = store.state.moduleData
    if (moduleData.totalPossibleScore > 0) {
        return Math.round((moduleData.totalScore / moduleData.totalPossibleScore) * 100)
    } else {
        return 0
    }
}

export const setReviewQuestionModuleData = ({ totalScore, totalPossibleScore }) => {
    let moduleData = store.state.moduleData
    moduleData.reviewQuestions.totalScore = totalScore
    moduleData.reviewQuestions.totalPossibleScore = totalPossibleScore
    store.commit('mutateModuleData', moduleData)
}

export const convertTotalTimeToMMSS = (totalTime) => {
    const mins = Math.floor(totalTime % 3600 / 60)
    const secs = Math.floor(totalTime % 3600 % 60)
    return mins + ' mins ' + secs + ' secs'
}

export const endModuleData = () => {
    let moduleData = store.state.moduleData
    moduleData.totalPossibleScore = getModulePossibleTotalScore()
    moduleData.totalScore = getModuleTotalScore()
    moduleData.totalScorePercent = getModuleScorePercent()
    moduleData.totalTimeElapsed = convertTotalTimeToMMSS(moduleData.totalTimeTaken)
    moduleData.passed = setModulePass(moduleData.totalScorePercent)
    store.commit('mutateModuleData', moduleData)
}

export const downloadReportAsPDF = (data) => {
    let self = this
    self.numberOfLines = 1
    self.YAxis = 65
    data = store.state.moduleData
    let doc = new JSPDF('p', 'mm', [215.9, 279.4])
    const imgData = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MSA2NC4xNDA5NDksIDIwMTAvMTIvMDctMTA6NTc6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyNDFFQUYwQTdDQTExRTY5MDIyQ0NBQkQ5REMwNzIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyNDFFQUYxQTdDQTExRTY5MDIyQ0NBQkQ5REMwNzIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTI0MUVBRUVBN0NBMTFFNjkwMjJDQ0FCRDlEQzA3MjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTI0MUVBRUZBN0NBMTFFNjkwMjJDQ0FCRDlEQzA3MjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEB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'

    const pageHeight = doc.internal.pageSize.height

    doc.addImage(imgData, 'JPEG', 172, 12)
    doc.setDrawColor(120, 128, 128)
    doc.setFontSize(17)
    doc.setTextColor(231, 43, 25)
    doc.text(10, 19, data.moduleName)
    doc.setFontSize(13)
    doc.setTextColor(31, 31, 31)
    doc.text(10, 27, data.moduleName)

    doc.text(10, 35, 'Name: ' + data.firstName + ' ' + data.lastName)

    doc.setDrawColor(120, 128, 128)
    doc.setFontSize(24)
    doc.setTextColor(179, 29, 23)
    doc.text(66, 45, 'Performance Report')
    doc.line(10, 49, 200, 49)

    doc.setFontSize(14)
    doc.setTextColor(43, 46, 52)
    doc.text(10, 59, 'Total Activities ')
    doc.text(70, 59, 'Total Score ')
    doc.text(115, 59, 'Percentage')
    doc.text(160, 59, 'Time Elapsed ')
    doc.setFontSize(12)
    doc.text(25, 65, '3')

    doc.text(77, 65, data.totalScore + '/' + data.totalPossibleScore)
    doc.text(125, 65, data.totalScorePercent + '%')
    doc.text(161, 65, data.totalTimeElapsed + '')
    doc.line(10, 70, 200, 70)

    _.forEach(data.activities, (activity) => {
        // Add 15pts margin at the beginning of every
        // activity report data
        self.YAxis += 15

        // check if the YAxis in greater than the page length,
        // if so, the add a new page
        if (self.YAxis > pageHeight) {
            doc.addPage()
            self.YAxis = 15
        }

        // Activity Heading
        doc.setFontType('normal')
        doc.setFontSize(12)
        doc.setTextColor(179, 29, 23)
        doc.text(10, self.YAxis, activity.title)
        doc.text(155, self.YAxis, 'Total Activity Score: ' + activity.totalPossibleScore + '')

        // Activity task column heading
        self.YAxis += 10
        doc.text(10, self.YAxis, 'Steps')
        doc.text(155, self.YAxis, 'Attempts')
        doc.text(175, self.YAxis, 'Your Score')

        // Activity completed tasks from the
        // module data report
        _.forEach(activity.completedTasks, (completedTask) => {
            self.YAxis += 10

            // check if the YAxis in greater than the page length,
            // if so, the add a new page
            if (self.YAxis > pageHeight) {
                doc.addPage()
                self.YAxis = 15
            }

            doc.setTextColor(0, 0, 0)
            doc.setFontType('normal')

            // Task attemps and score added before title,
            // so it will be aligned at the top wit the title
            doc.text(162, self.YAxis, completedTask.attempts + '')
            doc.text(184, self.YAxis, completedTask.score + '')

            // Check if the activity task length is greater that 70 characters,
            // if so then wrap the activity task
            if (completedTask.label && completedTask.label.length > 70) {
                let task = doc.splitTextToSize(completedTask.label, 130)
                _.forEach(task, (splitText) => {
                    doc.text(10, self.YAxis, splitText)
                    self.YAxis += 5
                })
            } else {
                doc.text(10, self.YAxis, completedTask.label + '')
            }
        })

        self.YAxis += 10
        doc.text(162, self.YAxis, 'Your Score: ' + activity.totalScore + '')

        self.YAxis += 5
        doc.line(10, self.YAxis, 200, self.YAxis)
    })

    self.YAxis += 10
    doc.setTextColor(179, 29, 23)
    doc.text(10, self.YAxis, 'Review Questions: ' + data.reviewQuestions.totalScore + ' out of ' + data.reviewQuestions.totalPossibleScore)

    doc.save('Performance_Report.pdf')
}

