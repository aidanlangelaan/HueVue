<template>
  <div id="app" class="container-fluid h-100">
    <div class="row h-100">
      <div id="left" class="col-2 h-100">
        <SideBar class="h-100" />
      </div>
      <div id="right" class="col-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import SideBar from '@/components/SideBar.vue';

@Component({
	components: {
		SideBar
	}
})
export default class App extends Vue {}
</script>
