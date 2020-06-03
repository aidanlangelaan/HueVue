<template>
	<div class="page-body">
		<NavBar page-title="About" class="page-header" />
		<div class="page-content">About</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import NavBar from '@/components/NavBar.vue'

@Component({
	components: {
		NavBar,
	},
})
export default class About extends Vue {}
</script>
