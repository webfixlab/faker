import { Button, FormLayout, Frame, Icon, InlineGrid, InlineStack, Layout, Page, RangeSlider, SkeletonDisplayText, Text, Toast, Tooltip } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import ValidationErrorBanner from "./ValidationErrorBanner";
import DeleteFakeDataButton from "./DeleteFakeDataButton";
import useGenerateFakeData from "../hooks/useGenerateFakeData";
import useAxios from "../hooks/useAxios";
import ManagePremiumButton from "./ManagePremiumButton";
import { StarFilledIcon } from "@shopify/polaris-icons";

const ProductCreator = () => {
    const [ options, setOptions ] = useState( {
        productsCount: 0,
        customersCount: 0
    } )

    const {
        generate,
        loading : creatingProducts,
        toastMsg,
        errors,
        dismissErrors,
        dismissToast
    } = useGenerateFakeData()

    const [ hasPremium, setHasPremium ] = useState( null )
    const { axios } = useAxios()

    useEffect(() => {
        axios.get( '/premium' ).then( response => {
            setHasPremium( response.data.hasPremium )
        })
    }, [])

    const handleOnChange = useCallback(
        ( value, name ) => setOptions( prevOptions => ( { ...prevOptions, [ name ]: value } ) ), []
    )

    const primaryActionButtons = (
        <>
            <InlineGrid gap="400" columns={2}>
                { hasPremium === null 
                    ? <SkeletonDisplayText size="extraLarge" />
                    : <ManagePremiumButton hasPremium={ hasPremium } />
                }
                <DeleteFakeDataButton />
            </InlineGrid>
        </>
    )

    const customerLabel = (
        <InlineStack wrap={false}>
            Number of Customers { options.customersCount > 0 ? '(' + options.customersCount + ')' : '' }
            { hasPremium ? null : (
                <Tooltip dismissOnMouseOut content="This feature is only available for premium plan.">
                    <Text fontWeight="bold" as="span">
                        <Icon source={ StarFilledIcon } tone="success" />
                    </Text>
                </Tooltip>
            )}
        </InlineStack>
    )

    return (
        <Frame>
            <Page
                title="Generate Fake Data"
                primaryAction={ primaryActionButtons }
            >    
                <Layout>
                    <Layout.Section>
                        <FormLayout>
                            <RangeSlider
                                output
                                label={ `Number of Products ${ options.productsCount > 0 ? '(' + options.productsCount + ')' : '' }` }
                                min={0}
                                max={10}
                                step={1}
                                value={ options.productsCount }
                                onChange={ handleOnChange }
                                id="productsCount"
                            />
                            <RangeSlider
                                output
                                disabled={ ! hasPremium }
                                label={ customerLabel }
                                min={0}
                                max={10}
                                step={1}
                                value={ options.customersCount }
                                onChange={ handleOnChange }
                                id="customersCount"
                            />
                            <Button variant="primary" size="large" loading={ creatingProducts }
                                onClick={ () => generate( options ) }>Generate</Button>

                            { toastMsg &&
                                <Toast content={ toastMsg } onDismiss={ dismissToast } />}

                            { errors.length &&
                                <ValidationErrorBanner
                                    title="Failed to Create Fake Products"
                                    errors={ errors }
                                    onDismiss={ dismissErrors } />}

                        </FormLayout>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    )
}

export default ProductCreator
