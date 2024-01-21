import { Button, Toast } from "@shopify/polaris"
import { useState } from "react"
import useAxios from "../hooks/useAxios"

const DeleteFakeDataButton = () => {

    const { axios } = useAxios()
    const [ loading, setLoading ] = useState( false )
    const [ toastMsg, setToastMsg ] = useState( '' )

    const deleteFakeData = () => {
        setLoading( true )

        axios.delete( '/fake-data' ).then( () => {
            setLoading( false )
            setToastMsg( 'Deleting Fake Data' )
        }).catch( () => {
            setLoading( false )
        })
    }
    
    return (
        <>
            <Button destructive onClick={deleteFakeData} loading={ loading }>Delete Fake Products</Button>
            { toastMsg && <Toast content={ toastMsg } onDismiss={() => { setToastMsg( '' ) }} />}
        </>
    )
}

export default DeleteFakeDataButton