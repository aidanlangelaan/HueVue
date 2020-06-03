import { Vue } from 'vue-property-decorator'

export default class Bridge extends Vue {
	id!: string
	internalipaddress!: string
	validated?: boolean
}
