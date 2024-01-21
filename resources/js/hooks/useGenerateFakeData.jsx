import { useState } from "react"
import useAxios from "./useAxios"

const useGenerateFakeData = () => {

    const {axios} = useAxios()
    const [ loading, setLoading ] = useState( false )
    const [ errors, setErrors ] = useState( [] )
    const [ toastMsg, setToastMsg ] = useState( '' )

    const generate = options => {
        setLoading( true )

        axios.post( '/fake-data', options ).then( ( response ) => {
            setLoading( false )
            setErrors( [] )
            setToastMsg( 'Started Generating Fake Data' )
        }).catch( error => {
            setLoading( false )
            if( error?.response?.status === 422 ){
                setErrors( Object.values( error.response.data.errors  || {} ).flatMap( errors => errors ) )
            }else{
                setErrors( [ 'Oops! Something went wrong. Please try again later.' ] )
            }
        })
    }

    const dismissToast = () => setToastMsg( '' )
    const dismissErrors = () => setErrors( [] )

    return {
        generate,
        loading,
        toastMsg,
        errors,
        dismissToast,
        dismissErrors,
    }
}

export default useGenerateFakeData