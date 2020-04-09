<template>
	<div id="sidebar">
		<div id="brand">
			<router-link to="/">
				<span @click="navItemClicked()">
					<span class="logo">
						<img alt="CoreVue" src="../assets/images/lightbulb.svg" />
					</span>
					<span class="title">HueVue</span>
				</span>
			</router-link>
		</div>
		<nav>
			<router-link to="/home" class="nav-item">
				<span @click="navItemClicked()">
					<b-icon icon="house-fill"></b-icon>
					<span>Home</span>
				</span>
			</router-link>
			<router-link to="/about" class="nav-item">
				<span @click="navItemClicked()">
					<b-icon icon="info-circle-fill"></b-icon>
					<span>About</span>
				</span>
			</router-link>
		</nav>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {
	navItemClicked() {
		this.$store.commit('changeSideBarState', false);
	}
}
</script>

<style scoped lang="scss">
</style>
