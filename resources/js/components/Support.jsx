import React from 'react'
import { BlockStack, Button, Card, Grid, InlineGrid, List, Page, Text } from "@shopify/polaris"
import { ExternalIcon } from '@shopify/polaris-icons'

const Support = () => {
    
    return (
        <Page
        title="Support 24/7"
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[
        {
            content: 'Promote',
            external: true,
            icon: ExternalIcon,
            url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
        ]}
    >
        <Card background="bg-surface-secondary" padding="400">
            <BlockStack gap="200">
                <Text as="h3" variant="headingSm" fontWeight="medium">
                Deactivated staff accounts
                </Text>
                <List>
                    <List.Item>Felix Crafford</List.Item>
                    <List.Item>Ezequiel Manno</List.Item>
                </List>
            </BlockStack>
        </Card>
        <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
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
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                <Card background="bg-surface-secondary">
                    <BlockStack gap="200">
                        <Text as="h3" variant="headingSm" fontWeight="medium">
                        Deactivated staff accounts
                        </Text>
                        <List>
                            <List.Item>Felix Crafford</List.Item>
                            <List.Item>Ezequiel Manno</List.Item>
                        </List>
                        <Button variant="primary" tone="critical">
                        View shipping settings
                        </Button>
                    </BlockStack>
                </Card>
            </Grid.Cell>
        </Grid>
    </Page>
    )
}

export default Support