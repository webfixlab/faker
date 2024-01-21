import { useState } from "react"
import useAxios from "../hooks/useAxios"
import { Button, Icon, Toast } from "@shopify/polaris"
import { useNavigate } from "@shopify/app-bridge-react"
import { StarFilledIcon } from "@shopify/polaris-icons"

const ManagePremiumButton = ( hasPremium ) => {
    const [ loading, setLoading ]   = useState( false )
    const [ toastMsg, setToastMsg ] = useState( '' )
    const { axios }                 = useAxios()
    const navigate                  = useNavigate()

    const togglePremium = () => {
        setLoading( true )

        const promise = hasPremium ? axios.delete( '/premium' ) : axios.post( '/premium' )

        promise.then( response => {
            if( response.data.redirectUrl ){
                navigate( response.data.redirectUrl )
            }
        }).catch( () => {
            setLoading( false )
            setToastMsg( 'Failed to upgrade to premium' )
        })
    }

    return (
        <>
            <Button dataPrimaryLink={ ! hasPremium }
                onClick={ togglePremium } loading={ loading } icon={ StarFilledIcon }>
                { hasPremium ? 'Downgrade to FREE' : 'Upgrade to Premium' }
            </Button>
            { toastMsg &&
                <Toast content={ toastMsg }
                    onDismiss={ () => setToastMsg( '' ) } />}
        </>
    )
}

export default ManagePremiumButton