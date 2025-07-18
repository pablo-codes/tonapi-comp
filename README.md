# TON Wallet Dashboard 📈

Dive into the TON blockchain with this intuitive dashboard, providing real-time insights into wallet balances, transactions, jetton assets, and NFT collections. Built with modern React and a sleek interface, it's your go-to tool for exploring TON blockchain data. ✨

## Installation

Getting the TON Wallet Dashboard up and running on your local machine is straightforward. Follow these steps:

- **Clone the Repository**:
  Begin by cloning the project repository to your local system using Git:

  ```bash
  git clone https://github.com/pablo-codes/tonapi-comp.git
  ```

- **Navigate to Project Directory**:
  Change into the newly cloned project directory:

  ```bash
  cd tonapi-comp
  ```

- **Install Dependencies**:
  Install all required project dependencies using npm:

  ```bash
  npm install
  ```

- **Run the Development Server**:
  Start the development server. This will compile the project and open it in your default web browser ( `http://localhost:3000`):
  ```bash
  npm run dev
  ```

## Usage

Once the application is up and running, you can interact with the TON Wallet Dashboard in two primary ways:

1.  **Connect Your Wallet**:
    Click the "Connect TON Wallet" button. This will prompt you to connect a compatible TON wallet via the TON Connect protocol. Once your wallet is successfully linked, its address will automatically populate, and the dashboard will begin displaying your real-time balance, transactions, and assets.

2.  **Enter a Manual Address**:
    If you'd like to explore data for any TON address without connecting your own wallet, simply paste the desired address into the provided input field. After entering the address, click "Search". The dashboard will then fetch and display the corresponding blockchain data for that address.

3.  **Explore Data**:
    Once an address is loaded, you can navigate through the various sections of the dashboard. View your current TON balance, browse a comprehensive list of transactions, discover your held Jetton tokens, and explore your unique NFT collection. Remember to use the refresh button on the balance card to ensure you're always viewing the latest data!

## Features

This dashboard comes packed with features designed to give you a comprehensive view of any TON wallet:

- **Real-time TON Balance & Account Status**: Get instant updates on your TON holdings, including the precise balance and the current status of the wallet (active, uninitialized, or frozen).
- **Comprehensive Transaction History**: Dive deep into detailed logs of all incoming and outgoing transactions. Each entry provides crucial information like timestamps, transaction type, and associated fees.
- **Jetton Token Management**: Easily discover and track all fungible TON Jetton tokens associated with an address, complete with token names, symbols, current balances, and USD valuation where available.
- **NFT Collection Gallery**: Showcase and browse your unique NFT assets in an organized gallery. Each NFT view offers details and a direct link to TONScan for further exploration.
- **Seamless Wallet Integration**: Connect effortlessly with your preferred TON wallet using the secure TON Connect protocol, providing a personalized and interactive experience.
- **Manual Address Lookup**: Explore the blockchain data of any public TON address without needing to connect your own wallet, offering flexibility for research and analysis.
- **Modern & Responsive UI**: Crafted with Tailwind CSS, the dashboard offers a sleek, intuitive, and fully responsive user interface, ensuring a smooth experience across desktops, tablets, and mobile devices.

## Technologies Used

The TON Wallet Dashboard is built using a modern and robust stack, leveraging the power of React for the frontend and interacting with the TON blockchain via specialized APIs.

| Technology               | Description                                                                                  | Link                                                                |
| :----------------------- | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| **React**                | A declarative, component-based JavaScript library for building user interfaces.              | [React.dev](https://react.dev/)                                     |
| **Vite**                 | A next-generation frontend tooling that provides an extremely fast development experience.   | [Vitejs.dev](https://vitejs.dev/)                                   |
| **Tailwind CSS**         | A utility-first CSS framework for rapidly building custom designs without leaving your HTML. | [Tailwindcss.com](https://tailwindcss.com/)                         |
| **TonAPI Client**        | The official client library for interacting with the TON Blockchain API.                     | [TonAPI.io](https://tonapi.io/)                                     |
| **@tonconnect/ui-react** | A React integration for TON Connect, enabling seamless wallet connections.                   | [TonConnect.io](https://tonconnect.io/)                             |
| **Lucide React**         | A collection of beautiful and customizable open-source icons for React projects.             | [Lucide.dev](https://lucide.dev/)                                   |
| **TON (JS SDK)**         | The core JavaScript SDK for interacting with the TON blockchain.                             | [Docs.ton.org](https://docs.ton.org/develop/dapp/ton-core/overview) |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author

**Okpani Francis C. (pablo-codes)**

A passionate developer with a keen interest in blockchain technologies and building intuitive web applications.

- **GitHub**: [@pablo-codes](https://github.com/pablo-codes)
- **YouTube**: [@Fwpoder](https://www.youtube.com/@Fwpoder)

---

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TON](https://img.shields.io/badge/TON-0098EA?style=for-the-badge&logo=ton&logoColor=white)](https://ton.org/)

[![GitHub stars](https://img.shields.io/github/stars/pablo-codes/tonapi-comp?style=social)](https://github.com/pablo-codes/tonapi-comp/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/pablo-codes/tonapi-comp?style=social)](https://github.com/pablo-codes/tonapi-comp/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
