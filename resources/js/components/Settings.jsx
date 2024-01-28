import { BlockStack, Button, Card, FormLayout, Layout, List, Page, Text, TextField } from "@shopify/polaris"
import { useCallback, useState } from "react";

const Settings = () => {
    const [value, setValue] = useState('1776 Barnes Street\nOrlando, FL 32801');

    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );

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
        </Layout>
        <Layout>
            <Layout.AnnotatedSection
            id="storeDetails"
            >
                <Card background="bg-surface-secondary">
                    <BlockStack gap="200">
                        <Text as="h3" variant="headingSm" fontWeight="medium">
                        Deactivated staff accounts
                        </Text>
                        <List>
                            <List.Item>Felix Crafford</List.Item>
                            <List.Item>Ezequiel Manno</List.Item>
                        </List>
                        <Button variant="primary">Save theme</Button>
                    </BlockStack>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>
        <Layout>
            <Layout.AnnotatedSection
            id="storeDetails"
            title="Store details"
            description="Shopify and your customers will use this information to contact you."
            >
                <Card>
                    <FormLayout>
                        <TextField
                            label="Shipping address"
                            value={value}
                            onChange={handleChange}
                            multiline={4}
                            autoComplete="off"
                            />
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        </Layout>
    </Page>
    )
}

export default Settings