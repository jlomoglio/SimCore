import { TweenLite, TweenMax, Draggable } from 'gsap'
import store from '../store/store'

export function siZoomIn (state, {target, percent}) {
    if (state < 2) {
        state += percent
    }

    return zoom(state, {target: target, percent: percent})
}

export function siZoomOut (state, {target, percent}) {
    if (state > 1) {
        state -= percent
    }

    return zoom(state, {target: target, percent: percent})
}

export function zoom (state, {target, percent}) {
    // TweenLite and Draggable plugins from GSAP to zoom and pan
    TweenLite.to(target, 0.2, {zoom: state})
    TweenMax.set(target, {x: 0, y: 0})
    // Checks if zoomed, then enable gsap draggable plugin
    // else if not zoomed and is at default then disable draggable
    let draggable = Draggable.create(target, {type: 'x,y', edgeResistance: 1, zIndexBoost: false})
    if (state > 1) {
        draggable[0].enable()
    } else {
        draggable[0].disable()
    }

    return draggable
}

export default {
    /**
     * A quite wonderful function.
     * @param {object} - privacy gown
     * @param {object} - security
     * @returns {survival}
     */
    increaseZoom: (zoomObj) => {
        store.commit('increaseZoom', zoomObj)
    },
    decreaseZoom: (zoomObj) => {
        store.commit('decreaseZoom', zoomObj)
    },
    enableZoom: () => {
        // store.commit('enableZoom', true);
        store.commit('enableIconBarIcon', 'zoom')
    },
    disableZoom: () => {
        // store.commit('enableZoom', false);
        store.commit('disableIconBarIcon', 'zoom')
    }
}
