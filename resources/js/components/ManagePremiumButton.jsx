import { useState } from "react"
import useAxios from "../hooks/useAxios"
import { Button, Toast } from "@shopify/polaris"
import { StarFilledIcon } from "@shopify/polaris-icons"
import { useNavigate } from "@shopify/app-bridge-react"

const ManagePremiumButton = ( hasPremium ) => {
    const [ loading, setLoading ]   = useState( false )
    const [ toastMsg, setToastMsg ] = useState( '' )
    const { axios }                 = useAxios()
    const navigate                  = useNavigate()
    
    const togglePremium = () => {
        setLoading( true )
        
        const promise = hasPremium === true ? axios.delete( '/premium' ) : axios.post( '/premium' )
        
        promise.then( response => {
            console.log( 'mpb : response', response )
            if( response.data.redirectUrl ){
                navigate( response.data.redirectUrl )
            }
            setLoading( false )
        }).catch( ( whatever ) => {
            console.error( 'mpb : error ', whatever )
            setLoading( false )
            setToastMsg( 'Failed to upgrade to premium' )
        })
    }
    
    const btnLabel = hasPremium === true ? 'Downgrade to FREE' : 'Upgrade to Premium'
    console.log( 'managing premium : ', hasPremium, 'btnLabel', btnLabel )

    return (
        <>
            <Button dataPrimaryLink={ hasPremium === true ? false : true } onClick={ togglePremium } loading={ loading } icon={ StarFilledIcon }>
                { btnLabel }
            </Button>
            { toastMsg &&
                <Toast content={ toastMsg }
                    onDismiss={ () => setToastMsg( '' ) } />}
        </>
    )
}

export default ManagePremiumButton