import axios from 'axios'

export default function setupInterceptors(store) {
    axios.interceptors.request.use(
        function(config) {
            const userToken = store.getters['hue/getUser']
            const bridge = store.getters['hue/getActiveBridge']

            config.url = config.url
                .replace('##usertoken##', userToken)
                .replace('##internalipaddress##', bridge.internalipaddress)

            return config
        },
        function(err) {
            return Promise.reject(err)
        }
    )
}
