// import { TweenLite, TweenMax, Draggable } from 'gsap'
import { TweenMax, Draggable } from 'gsap'
import store from '../store/store'

export function zoomIn ({target, percent}) {
    if (store.getters.getZoomPercent < 2) {
        store.commit('zoomPercent', (store.getters.getZoomPercent + percent))
    }

    return zoom(
        store.state.iconBar.icons.zoom.zoomPercent, {
            target: target, percent: store.getters.getZoomPercent
        }
    )
}

export function zoomOut ({target, percent}) {
    // If statement checks if zoomPercent is in zoom state,
    // not default zoomPercent of 1 i.e. the target is being zoomed
    // else don't update the zoomPercent with percent
    if (store.getters.getZoomPercent > 1) {
        store.commit('zoomPercent', (store.getters.getZoomPercent - percent))
    }

    return zoom(
        store.state.iconBar.icons.zoom.zoomPercent, {
            target: target, percent: store.getters.getZoomPercent
        }
    )
}

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
    // TweenLite.to(target, 0.2, {zoom: state})
    TweenMax.set(target, {x: 0, y: 0})
    target.style.zoom = (percent * 100) + '%'
    target.style.width = (percent * 100) + '%'
    target.style.height = (percent * 100) + '%'

    // Checks if zoomed, then enable gsap draggable plugin
    // else if not zoomed and is at default then disable draggable
    let zoomPercent = store.getters.getZoomPercent
    let dragMinY = null
    let dragMaxY = null
    let dragMinX = null
    let dragMaxX = null

    if (zoomPercent === 1.5) {
        dragMinY = -180
        dragMaxY = 0
        dragMinX = -240
        dragMaxX = 0
    } else if (zoomPercent === 2) {
        dragMinY = -260
        dragMaxY = 0
        dragMinX = -480
        dragMaxX = 0
    }

    let zoomDraggable = Draggable.create(target, {
        type: 'x,y',
        edgeResistance: 1,
        zIndexBoost: false,
        onDrag: function () {
            this.applyBounds({
                minY: dragMinY,
                maxY: dragMaxY,
                minX: dragMinX,
                maxX: dragMaxX
            })
        }
    })

    if (state > 1) {
        zoomDraggable[0].enable()
    } else {
        zoomDraggable[0].disable()
    }

    return zoomDraggable
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
