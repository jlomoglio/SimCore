export const Hint = {
    bind(el, binding) {
        if (binding.value === true) {
            el.style.animationDuration = '1s'
            el.style.animationIterationCount = 'infinite'
            el.style.animationName = 'blinker'
            el.style.animationTimingFunction = 'linear'
            el.style.background = 'transparent none repeat scroll 0 0'
            el.style.border = '3px solid rgba(239, 249, 47, 1)'
            el.style.boxShadow = '0 0 27px #ffeb3b'
        }
    },
    update(el, binding) {
        if (binding.value === true) {
            el.style.animationDuration = '1s'
            el.style.animationIterationCount = 'infinite'
            el.style.animationName = 'blinker'
            el.style.animationTimingFunction = 'linear'
            el.style.background = 'transparent none repeat scroll 0 0'
            el.style.border = '3px solid rgba(239, 249, 47, 1)'
            el.style.boxShadow = '0 0 27px #ffeb3b'
        } else {
            el.style.animationDuration = null
            el.style.animationIterationCount = null
            el.style.animationName = null
            el.style.animationTimingFunction = null
            el.style.background = null
            el.style.border = null
            el.style.boxShadow = null
        }
    }
}

export default Hint
