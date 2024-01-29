import { Provider } from "@shopify/app-bridge-react";
import { AppProvider} from "@shopify/polaris";
import { useState } from "react";

import enTranslation from '@shopify/polaris/locales/en.json';
import MissingApiKey from "./components/MissingApiKey";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Support from "./components/Support";
import Settings from "./components/Settings";
import Lockify from "./components/Lockify";

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
        <AppProvider i18n={enTranslation}>
            <Router>
                <Routes>
                    <Route path="/support" element={
                        <Provider config={appBridgeconfig}>
                            <Support />
                        </Provider>
                    } />
                    <Route path="/settings" element={
                        <Provider config={appBridgeconfig}>
                            <Settings />
                        </Provider>
                    } />
                    <Route path="/" element={
                        <Provider config={appBridgeconfig}>
                            <Lockify />
                        </Provider>
                    } />
                </Routes>
            </Router>
        </AppProvider>
    )
}

export default App;