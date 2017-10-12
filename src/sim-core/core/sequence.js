import waterfall from 'async-waterfall'

const sequencer = (sequence, callback) => {
    return waterfall([
        ...sequence
    ], function (err, result) {
        if (err) {
            return true
        }
        if (callback) {
            callback()
        }
    })
}

export default sequencer
