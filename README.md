# TON Wallet Dashboard 🌐

A modern, real-time blockchain analytics dashboard for The Open Network (TON). This application provides a comprehensive overview of any TON wallet address, displaying current balance, transaction history, jetton token holdings, and NFT collections. Built with React and integrated with TON API, it offers a seamless and intuitive user experience for exploring on-chain data.

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Git

### Installation

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/pablo-codes/tonapi-comp.git
    cd tonapi-comp
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory of the project. This project uses `process.env.REACT_APP_TON_API_KEY` for accessing the TON API.
    You will need to obtain an API key from [TON API](https://tonapi.io/).

    ```
    REACT_APP_TON_API_KEY=your_tonapi_key_here
    ```

    Replace `your_tonapi_key_here` with your actual TON API key.

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The application will typically open in your browser at `http://localhost:3000`.

## 💡 Usage

Once the application is running, you can interact with it in two primary ways:

1.  **Connect Your Wallet**:
    Click the "Connect TON Wallet" button. This uses `tonconnect/ui-react` to securely connect your preferred TON wallet (e.g., Tonkeeper, MyTonWallet). Once connected, your wallet's address will be automatically loaded, and its dashboard data will be displayed.

2.  **Enter a Wallet Address Manually**:
    In the "Enter Wallet Address" input field, you can paste any valid TON wallet address. Press "Search" to fetch and display the blockchain data for that specific address. This is useful for exploring public addresses without connecting your own wallet.

Upon successful input or connection, the dashboard will populate with:

- **Real-time Balance**: Your current TON balance and account status.
- **Recent Transactions**: A list of the latest transactions, including incoming/outgoing transfers, fees, and timestamps.
- **Jetton Assets**: An overview of all fungible tokens (Jettons) held by the wallet, with their balances and USD values where available.
- **NFT Collection**: A gallery of non-fungible tokens (NFTs) owned by the address, with interactive previews for details.

You can refresh the data at any time by clicking the refresh icon on the Balance Card.

## ✨ Features

This dashboard comes packed with features designed to give you a comprehensive view of TON blockchain data:

- **Wallet Connectivity**: Seamlessly connect your TON wallet using `@tonconnect/ui-react` for secure and direct data access.
- **Manual Address Lookup**: Explore any TON wallet address by simply pasting it into the input field, no connection required.
- **Real-time Balance Overview**: Get an instant update on your TON balance and account status (active, uninitialized, frozen).
- **Detailed Transaction History**: View a sortable list of recent transactions with clear indicators for incoming/outgoing transfers, amounts, fees, and links to TONScan.
- **Jetton Assets Display**: Keep track of all your fungible tokens (Jettons) with their balances, symbols, and estimated USD values.
- **NFT Gallery**: Browse your NFT collections with image previews and access detailed information for each token.
- **Responsive Design**: A sleek and modern user interface built with Tailwind CSS, optimized for various screen sizes.
- **Data Fetching with Loading States**: Provides clear loading indicators and error handling for a smooth user experience.

## 🛠️ Technologies Used

The project leverages a powerful stack to deliver a robust and responsive experience:

| Technology               | Description                                         | Link                                                                                                           |
| :----------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| **React**                | A JavaScript library for building user interfaces.  | [react.dev](https://react.dev/)                                                                                |
| **Vite**                 | Next-generation frontend tooling.                   | [vitejs.dev](https://vitejs.dev/)                                                                              |
| **Tailwind CSS**         | A utility-first CSS framework for rapid styling.    | [tailwindcss.com](https://tailwindcss.com/)                                                                    |
| **@ton-api/client**      | Official client for interacting with TON API.       | [tonapi.io](https://tonapi.io/)                                                                                |
| **@tonconnect/ui-react** | React hooks for TON Connect UI.                     | [tonconnect.github.io](https://tonconnect.github.io/)                                                          |
| **Lucide React**         | Beautiful and customizable open-source icons.       | [lucide.dev](https://lucide.dev/)                                                                              |
| **TON (JS SDK)**         | JavaScript SDK for interacting with TON blockchain. | [ton.org/docs/develop/dapps/blockchain-interaction](https://ton.org/docs/develop/dapps/blockchain-interaction) |

## 📜 License

This project is open-source and available under an unspecified license. Feel free to use and modify the code.

## ✍️ Author

This project was developed by:

**pablo-codes**

- GitHub: [@pablo-codes](https://github.com/pablo-codes)
- YouTube: [@Fwpoder](https://www.youtube.com/@Fwpoder)

---

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![TON API Integration](https://img.shields.io/badge/Integration-TON%20API-0098EA?logo=ton&logoColor=white&style=for-the-badge)](https://tonapi.io/)
