import Link from "next/link";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
// import LandingExplainer from "../components/landing/landing-explainer";
// import SignUpOrIn from "../components/landing/sign-up-or-in";
import { useSession, getSession } from "next-auth/client";
// import { useMediaQuery } from "react-responsive";
import clientPromise from "../lib/mongodb";
// import { initializeStore, useStore } from "../store";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import LandingTable from '../components/landing/landingTable';

function App({ isConnected, initialReduxState }) {
  const [session, loading, status] = useSession();

  // const { dispatch } = useStore();

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 620px)`,
  });

  return (
    <div>
      <TradingViewEmbed
        widgetType={widgetType.TICKER_TAPE}
        widgetConfig={{
          showSymbolLogo: true,
          isTransparent: false,
          displayMode: "adaptive",
          colorTheme: "dark",
          autosize: true,
          symbols: [
            {
              proName: "BITSTAMP:ETHUSD",
              title: "ETH/USD",
            },
            {
              proName: "BITSTAMP:BTCUSD",
              title: "BTC/USD",
            },
            {
              proName: "BINANCE:BNBUSDT",
              title: "BNB/USDT",
            },
            {
              proName: "BINANCE:ADAUSD",
              title: "ADA/USD",
            },
            {
              proName: "BINANCE:DOTUSDT",
              title: "DOT/USDT",
            },
            {
              proName: "BINANCE:UNIUSDT",
              title: "UNI/USDT",
            },
          ],
        }}
      />

      <div className="explainer">{/*<LandingExplainer />*/}</div>

      <div className="screener">
        <div style={{ marginLeft: "5%" }}>Hello</div>
        {isConnected ? "True" : "False"}
      </div>
        <div>
            <LandingTable />
        </div>
    </div>
  );
}
export async function getServerSideProps(context, req) {
  const client = await clientPromise;
  const session = await getSession({ req });

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}

export default App;
