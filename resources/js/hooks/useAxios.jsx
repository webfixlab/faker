import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import axios from "axios"
import { useEffect } from "react"

const useAxios = () => {
    const app = useAppBridge()
    const navigate = useNavigate()

    useEffect(() => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        const interceptors = axios.interceptors.request.use( function(config){
            return getSessionToken( app ).then(token => {
                config.headers.Authorization = `Bearer ${token}`

                config.params = { ...config.params, host: window.__SHOPIFY_HOST }
                return config
            })
        })

        const responseInterceptor = axios.interceptors.response.use( response => {
            // console.log( 'useAxios.jsx :: response', response )
            return response
        }, error => {
            // console.error( 'useAxios.jsx :: error', error )

            if( error.response.status === 403 && error.response?.data?.forceRedirectUrl ){
                navigate( error.response.data.forceRedirectUrl )
            }

            return Promise.reject( error )
            // return error
        })

        return () => {
            axios.interceptors.request.eject( interceptors )
            axios.interceptors.response.eject( responseInterceptor )
        }
    }, [])

    return { axios }
}

export default useAxios