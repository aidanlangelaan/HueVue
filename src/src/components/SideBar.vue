<template>
	<div id="sidebar">
		<div id="brand">
			<router-link to="/">
				<span class="logo">
					<img alt="CoreVue" src="../assets/images/lightbulb.svg" />
				</span>
				<span class="title">HueVue</span>
			</router-link>
		</div>
		<nav>
			<router-link to="/home" class="nav-item">
				<b-icon icon="house-fill"></b-icon>
				<span>Home</span>
			</router-link>
			<router-link to="/about" class="nav-item">
				<b-icon icon="info-circle-fill"></b-icon>
				<span>About</span>
			</router-link>
		</nav>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {}
</script>

<style scoped lang="scss"></style>
