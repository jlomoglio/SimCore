<template>
    <div id="icon-main-menu" @click="toggleMenu()"></div>
</template>

<script>
export default {
    name: 'IconMainMenu',
    methods: {
        toggleMenu () {
            this.$store.commit('toggleMainMenu')
        }
    }
}
</script>


<style scoped>
#icon-main-menu {
	position: absolute;
    width: 20px;
    height: 20px;
    right: 50px;
    top: 5px;
    cursor: pointer;
    background: url(/assets/img/icons/menuicon.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
</style>
