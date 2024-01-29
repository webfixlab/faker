import { BlockStack, Button, ButtonGroup, Card, FormLayout, InlineGrid, Layout, List, Page, Text, TextField } from "@shopify/polaris"
import { useCallback, useState } from "react";

const Lockify = () => {
    const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

    const handleFirstButtonClick = useCallback(() => {
        if (isFirstButtonActive) return;
        setIsFirstButtonActive(true);
    }, [isFirstButtonActive]);

    const handleSecondButtonClick = useCallback(() => {
        if (!isFirstButtonActive) return;
        setIsFirstButtonActive(false);
    }, [isFirstButtonActive]);


    return (
        <Page fullWidth>
            <Layout>
                <Layout.AnnotatedSection
                id="storeDetails"
                title="Store details"
                description="Shopify and your customers will use this information to contact you."
                >
                    <Card>
                        <FormLayout>
                            <TextField
                            type="email"
                            label="Account email"
                            onChange={() => {}}
                            autoComplete="email"
                            />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection>
                    <Card roundedAbove="sm">
                        <BlockStack gap="400">
                            <BlockStack gap="200">
                            <Text as="h2" variant="headingSm">
                                Customer
                            </Text>
                            
                            </BlockStack>
                            <BlockStack gap="200">
                                <InlineGrid columns="1fr auto">
                                    <ButtonGroup variant="segmented">
                                        <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
                                            First button
                                        </Button>
                                        <Button pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
                                            Second button
                                        </Button>
                                    </ButtonGroup>
                                    <Text as="h3" variant="headingSm" fontWeight="medium">
                                    Contact Information
                                    </Text>
                                    <ButtonGroup>
                                        <Button
                                            variant="plain"
                                            tone="critical"
                                            onClick={() => {}}
                                            accessibilityLabel="Delete"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="plain"
                                            onClick={() => {}}
                                            accessibilityLabel="Edit"
                                        >
                                            Edit
                                        </Button>
                                    </ButtonGroup>
                                </InlineGrid>
                                <Text as="p" variant="bodyMd">
                                    john.smith@example.com
                                </Text>
                            </BlockStack>
                        </BlockStack>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
            <Layout>
            </Layout>
        </Page>
    )
}

export default Lockify