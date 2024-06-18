import React from 'react';
import ReactDOM from 'react-dom/client';
import Saidbar from './components/saidbar'; // Assuming your component file is named Saidbar
import Connect from './components/connect';
import Deshbord from './components/deshbord';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {
  ThirdwebProvider,

  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

import { ChainId } from "@thirdweb-dev/sdk";

const chainId = ChainId.BinanceSmartChainTestnet;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain={97}

      clientId="822efe6a485010b66f2584a2572377d8"
    >
        <App />
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);

 