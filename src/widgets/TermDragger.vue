<template>
  <div class="termContainer">
     <div class="termTagContainer">
        <div class="termTag" id="draggable1">
          <p class="txt-row2">{{this.termObj[0].termTag}}</p>
        </div>
       <div class="divider-h-1"></div>
        <div class="termTag" id="draggable2">
          <p>{{this.termObj[1].termTag}}</p>
        </div>
       <div class="divider-h-1"></div>
        <div class="termTag" id="draggable3">
          <p>{{this.termObj[2].termTag}}</p>
        </div>
     </div>
     <div class="term-definition-container">
     <div class="activity-col col-width-sm">
        <div class="termDefinition">
         {{this.termObj[0].termDefinition}}
         </div>
         <!--
         <div class="termTag showhint" id="draggable-showHint3">
              <p class="txt-row2">British thermal unit<br> (Btu)</p>
          </div>
          -->
         <div class="termDropZone droppable" id="droppable1"></div>
          <div id="drop3Check"></div>
     </div>

     <div class="activity-col divider-v">
        <div class="termDefinition">
         {{this.termObj[1].termDefinition}}
         </div>
         <!--
         <div class="termTag showhint" id="draggable-showHint2">
              <p>Latent heat</p>
          </div>
          -->
         <div class="termDropZone droppable" id="droppable2" style=""></div>
          <div id="drop2Check"></div>
     </div>

     <div class="activity-col divider-v">
       <div class="termDefinition">
          {{this.termObj[2].termDefinition}}
        </div>
        <!--
        <div class="termTag showhint" id="draggable-showHint1">
            <p>Sensible heat</p>
        </div>
        -->
        <div class="termDropZone droppable" id="droppable3"></div>
        <div id="drop1Check"></div>

     </div>
     </div>


   </div>
</template>

<script>
import { Draggable, TweenLite } from 'gsap'
export default {
    name: 'TermDragger',
    props: ['termObj'],
    mounted () {
        let vm = this
        vm.snapMade = false
        let threshold = '90%'
        Draggable.create(document.getElementById('draggable1'), {
            type: 'x,y',
            bounds: '#content-area-inner',
            onRelease: function () {
                if (this.hitTest('#droppable1', threshold)) {
                    vm.snapMade = true
                    this.disable()
                    // let p = document.getElementById('droppable1').getBoundingClientRect()
                    // console.log('top',p.top, 'right',p.right, 'bottom',p.bottom, 'left',p.left)
                    TweenLite.to(this.target, 1, {left: 400, top: 200})
                } else {
                    TweenLite.to(this.target, 1, {x: 0, y: 0})
                }
            }
        })
        Draggable.create(document.getElementById('draggable2'), {
            type: 'x,y',
            bounds: '#content-area-inner',
            onRelease: function () {
                if (this.hitTest('#droppable2', threshold)) {
                    vm.snapMade = true
                    this.disable()
                    let p = document.getElementById('droppable2').getBoundingClientRect()
                    // console.log('top',p.top, 'right',p.right, 'bottom',p.bottom, 'left',p.left)
                    TweenLite.to(this.target, 0.1, {x: p.left, y: p.top})
                } else {
                    TweenLite.to(this.target, 1, {x: 0, y: 0})
                }
            }
        })
        Draggable.create(document.getElementById('draggable3'), {
            type: 'x,y',
            bounds: '#content-area-inner',
            onRelease: function () {
                if (this.hitTest('#droppable3', threshold)) {
                    vm.snapMade = true
                    this.disable()
                    let p = document.getElementById('droppable3').getBoundingClientRect()
                    // console.log('top',p.top, 'right',p.right, 'bottom',p.bottom, 'left',p.left)
                    TweenLite.to(this.target, 0.1, {x: p.left, y: p.top})
                } else {
                    TweenLite.to(this.target, 1, {x: 0, y: 0})
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.termContainer {
    margin-top: 50px;
}

.termTagContainer {
    background-color:#DAE7EC;
    border-bottom:2px solid #519DC1;
    border-image:initial;
    border-left:none;
    border-right:2px solid #519DC1;
    border-top:2px solid #519DC1;
    height:230px;
    left:-9px;
    position:absolute;
    width:188px;
}

.termTag {
    background-color: #8e191b;
    border-radius: 5px;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.75);
    color: #fff;
    cursor: pointer;
    height: 45px;
    margin: 15px 16px 16px;
    text-align: center;
    width: 155px;
    font-weight: bold;
    font-size: 14px;

     p {
       padding: 12px;
     }

     .txt-row2 {
      padding: 6px;
      line-height: 16px;
     }
}

.divider-h-1 {
  border-top:1px solid #FFFFFF;
}

#testDrop {
  background-color: red;
  height: 45px;
  width: 155px;
  margin-left: 350px;
  border-radius: 5px;
}

.activity-col {
    float: left;
    margin: 0 15px 0 0;
    width: 200px;
}

.col-width-sm {
    width: 180px;
}

.termDefinition {
    font-size: 15px;
    height: 125px;
    line-height: 21px;
    text-align: left;
}

.term-definition-container {
    float: left;
    margin-left: 210px;
}

.divider-v {
    border-left: 2px solid #ccc;
    padding: 0 0 0 23px;
}

.termDropZone {
    background-color: #fff;
    border: 1px dashed #404041;
    border-radius: 5px;
    height: 40px;
    width: 150px;
}
</style>
