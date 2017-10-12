<template>
    <div id="icon-parts-department" :class="{ active: isActive }" @click="show()"></div>
</template>

<script>
export default {
    name: 'IconPartsDepartment',
    computed: {
        isActive () {
            return this.$store.getters.getPartsDepartmentIconIsEnabled
        }
    },
    methods: {
        show () {
            this.$store.commit('showPartsDepartment')
        }
    }
}
</script>


<style scoped>
#icon-parts-department.active {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 20px;
    float: right;
    cursor: pointer;
	pointer-events: all;
    background: url(/assets/img/icons/parts_dep_active.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
#icon-parts-department {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 20px;
    float: right;
    cursor: pointer;
	pointer-events: none;
    background: url(/assets/img/icons/parts_dep_inactive.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
</style>
