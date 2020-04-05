<template>
	<div class="page-body">
		<NavBar page-title="Home" class="page-header" />
		<div class="page-content">Home</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import NavBar from '@/components/NavBar.vue'

@Component({
	components: {
		NavBar,
	},
})
export default class Home extends Vue {}
</script>
