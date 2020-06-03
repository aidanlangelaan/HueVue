<template>
	<div class="page-body">
		<NavBar
			page-title="Hue Bridge Detection"
			hide-menu-button="true"
			class="page-header"
		/>
		<div class="page-content">
			<div
				v-if="(detectingBridges = true && validatedBridges.length == 0)"
			>
				Searching for Hue Bridges...
			</div>

			<div
				v-if="
					(detectingBridges = false && validatedBridges.length == 0)
				"
			>
				No Hue Bridges found.
			</div>

			<div v-if="validatedBridges.length > 0">
				<span v-if="validatedBridges.length == 1">
					The following bridge was found:
				</span>
				<span v-if="validatedBridges.length > 1">
					The following bridges were found:
				</span>

				<ul>
					<li v-for="bridge in validatedBridges" :key="bridge.id">
						ID: {{ bridge.id }}
						<br />
						IP address: {{ bridge.internalipaddress }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios, { AxiosResponse } from 'axios'

import NavBar from '@/components/NavBar.vue'

@Component({
	components: {
		NavBar,
	},
})
export default class HueBridgeDetection extends Vue {
	rawBridges: any = []
	validatedBridges = []
	detectingBridges = false

	mounted() {
		this.checkBridge()
	}

	checkBridge() {
		if (!this.$store['hue/bridge']) {
			// no existing bridge found so try and detect
			this.detectingBridges = true
			axios.get('https://discovery.meethue.com/').then(this.setupBridge)
		} else {
			// try and connect to bridge
			this.checkConnection()
		}
	}

	checkConnection() {
		return true
	}

	setupBridge(response: any) {
		if (response.data) {
			this.rawBridges = response.data
			this.rawBridges.forEach(this.validateBridge)
		} else {
			// no bridges found!
			this.detectingBridges = false
		}
	}

	validateBridge(bridge) {
		// try fetching the description
		axios
			.get(`http://${bridge.internalipaddress}/api/tmp/config`)
			.then((response: AxiosResponse<any>) => {
				if (response.status == 200 && response.data) {
					// const validatedBridge = that.rawBridges.find(
					// 	element => element.id == response.bridgeid.toLowerCase()
					// )
					// if (validatedBridge) {
					// 	that.validatedBridges.push(validatedBridge)
					// }
				}
			})
			.catch(err => {
				// failed to validate bridge so ignoring it
				console.log('bugger it')
			})
	}
}
</script>
