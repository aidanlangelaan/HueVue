<template>
	<div id="app" class="container-fluid h-100">
		<div
			class="row h-100"
			v-bind:class="{'side-bar-open': $store.getters.sideBarOpen == true}"
		>
			<div id="left" class="h-100">
				<SideBar class="h-100" />
			</div>
			<div id="right" class="h-100">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import SideBar from '@/components/SideBar.vue'

@Component({
	components: {
		SideBar,
	},
})
export default class App extends Vue {}
</script>
