import { Provider } from "@shopify/app-bridge-react";
import { AppProvider} from "@shopify/polaris";
import { useState } from "react";

import enTranslation from '@shopify/polaris/locales/en.json';
import MissingApiKey from "./components/MissingApiKey";
import FakeDataCreator from "./components/FakeDataCreator";

const App = () => {

    const [ appBridgeconfig ] = useState( () => {
        const host = new URLSearchParams( location.search ).get( 'host' ) || window.__SHOPIFY_HOST

        window.__SHOPIFY_HOST = host

        return{
            host,
            apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
            forceRedirect: true
        }
    })

    if( ! appBridgeconfig.apiKey ){
        return (
            <Provider i18n={ enTranslation }>
                <MissingApiKey />
            </Provider>
        )
    }

    return (
        <AppProvider i18n={ enTranslation }>
            <Provider config={ appBridgeconfig }>
                <FakeDataCreator />
            </Provider>
        </AppProvider>
    );
};

export default App;