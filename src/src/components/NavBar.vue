<template>
	<b-navbar>
		<b-navbar-brand>{{ pageTitle }}</b-navbar-brand>
	</b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {
	@Prop() private pageTitle!: string
}
</script>

<style scoped lang="scss"></style>
