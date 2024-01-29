import {
    Page,
    Layout,
    FormLayout,
    Card,
    ResourceList,
    Thumbnail,
    Text,
    TextField,
    ButtonGroup,
    Button,
    Autocomplete, 
    Icon
  } from '@shopify/polaris';

import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';

const Lockify = () => {

    const PressedButton = () => {
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
            <ButtonGroup variant="segmented">
                <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
                    Enabled
                </Button>
                <Button pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
                    Disabled
                </Button>
            </ButtonGroup>
        );
    };


    // Autocomplete logic
    const deselectedOptions = useMemo(
        () => [
            {value: 'rustic', label: 'Rustic'},
            {value: 'antique', label: 'Antique'},
            {value: 'vinyl', label: 'Vinyl'},
            {value: 'vintage', label: 'Vintage'},
            {value: 'refurbished', label: 'Refurbished'},
        ],
        [],
    );
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);
    
    const updateText = useCallback(
        (value) => { // Remove the type annotation
            setInputValue(value);
    
            if (value === '') {
                setOptions(deselectedOptions);
                return;
            }
    
            const filterRegex = new RegExp(value, 'i');
            const resultOptions = deselectedOptions.filter((option) =>
                option.label.match(filterRegex),
            );
            setOptions(resultOptions);
        },
        [deselectedOptions],
    );
    
    
    const updateSelection = useCallback(
        (selected) => { // Removed type annotation
            setSelectedOptions(selected);
            const selectedValue = selected.map((selectedItem) => {
                const matchedOption = options.find((option) => option.value.match(selectedItem));
                return matchedOption && matchedOption.label;
            });
            setInputValue(selectedValue[0] || '');
        },
        [options],
    );
    
    
    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            label="Add new lock"
            value={inputValue}
            prefix={<Icon source={SearchIcon} />}
            placeholder="Search"
            autoComplete="off"
        />
    );


    return (
    <Page>
      <Layout>
      <Layout.AnnotatedSection
          id="lockify"
          title="Lockify"
          description="Restrict your content like product, page, collections etc."
        >
        <Card sectioned>
            <FormLayout>
                <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    textField={textField}
                />
            </FormLayout>
        </Card>
        </Layout.AnnotatedSection>
        <Layout.Section variant="oneHalf">
            <Card title="Locked items" sectioned>
            <Text variant="headingLg" as="h2">Locked items</Text>
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '341',
                    url: '/products/snow-bear',
                    name: 'Snow Bear',
                    media: (
                      <Thumbnail
                        source="https://klinkode.myshopify.com/cdn/shop/files/bear.jpg?v=1705332499&width=50"
                        alt="Snow bear"
                      />
                    ),
                  },
                  {
                    id: '341',
                    url: '/products/snow-bear',
                    name: 'Snow Bear',
                    media: (
                      <Thumbnail
                        source="https://klinkode.myshopify.com/cdn/shop/files/bear.jpg?v=1705332499&width=50"
                        alt="Snow bear"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>Product - {url}</div><br/>
                      <div><TextField disabled autoComplete="off" value="Passcode: 123"/></div><br/>
                      <PressedButton /><br/>
                      <Button variant="plain" tone="critical">Remove</Button>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
        </Layout.Section>
      </Layout>
    </Page>
    )
}

export default Lockify