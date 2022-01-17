import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Table } from "react-bootstrap";
import Link from "next/link";

// function PriceSocket(props) {
//   //Public API that will echo messages sent to it back to the client
//
//   const [socketUrl, setSocketUrl] = useState(
//     "wss://streamer.cryptocompare.com/v2?api_key=54c69a67adfc783963d3589c5a08a40a5d619b0f22b94b1c79df9acc9129c5ff"
//   );
//   const [messagePriceHistory, setMessagePriceHistory] = useState([]);
//   const [priceData, setPriceData] = useState();
//
//   const { sub } = props;
//
//   const { sendMessage, lastMessage, readyState, lastJsonMessage } =
//     useWebSocket(socketUrl, {
//       onOpen: () => {
//         console.log("onOpen fired in priceSocket");
//         sendMessage(
//           JSON.stringify({
//             action: "SubAdd",
//             subs: sub,
//           })
//         );
//       },
//
//       onMessage: (mess) => {
//         //This is the message
//         console.log();
//       },
//       onUpdate: (e) => {
//         console.log("onUpdate, e", e);
//       },
//       onClose: () => {
//         sendMessage(
//           JSON.stringify({
//             action: "SubRemove",
//             subs: sub,
//           })
//         );
//       },
//       //Will attempt to reconnect on all close events, such as server shutting down
//       shouldReconnect: (closeEvent) => true,
//       reconnectInterval: 1000,
//       onError: (err) => {
//         console.log("error connecting in webSocket", err);
//       },
//     });
//
//   useEffect(() => {
//     if (lastMessage !== null) {
//       setMessagePriceHistory((prev) => prev.concat(lastMessage));
//     }
//   }, [lastMessage, setMessagePriceHistory]);
//
//   const connectionStatus = {
//     [ReadyState.CONNECTING]: "Connecting",
//     [ReadyState.OPEN]: "Open",
//     [ReadyState.CLOSING]: "Closing",
//     [ReadyState.CLOSED]: "Closed",
//     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
//   }[readyState];
//
//   return <div>This is the priceSocket</div>;
// }

export default function LandingTable() {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    "wss://streamer.cryptocompare.com/v2/?api_key=54c69a67adfc783963d3589c5a08a40a5d619b0f22b94b1c79df9acc9129c5ff"
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const [marketCapData, setMarketCapData] = useState([]);
  const [subs, setSubs] = useState([]);

  let tempSubs = [];

  const selectAndCompare = async () => {
    let lastTwo = await messageHistory.slice(
      Math.max(messageHistory.length - 2, 0)
    );
    let first = JSON.parse(lastTwo[0]?.data)?.TIMEMS;
    let second = JSON.parse(lastTwo[1]?.data)?.TIMEMS;
    if (second - first > 120) {
      return true;
    }
  };

  const fetchMarketCap = async () => {
    let data = await fetch(
      "https://min-api.cryptocompare.com/data/top/mktcap?limit=5&tsym=USD&api_key=54c69a67adfc783963d3589c5a08a40a5d619b0f22b94b1c79df9acc9129c5ff"
    ).then((r) => {
      return r.json();
    });
    for (let i of data.Data) {
      tempSubs.push(i?.ConversionInfo?.SubsNeeded);
    }
    console.log("this is data.Data in fetchMarketCap", data.Data);
    console.log("this is the tempsSubs in fetchmarketCap", tempSubs);

    if (marketCapData !== data.Data) {
      setMarketCapData(data.Data);
    } else {
      addSubs(subs);
    }
  };

  const addSubs = async (subs) => {
    console.log("this is the subs in addSubs", subs);
    setSubs(subs);
  };

  const { sendMessage, lastMessage, readyState, lastJsonMessage } =
    useWebSocket(socketUrl, {
      onOpen: () => {
        sendMessage(
          JSON.stringify({
            action: "SubAdd",
            subs: subs,
          })
        );
        console.log("this is the onOpen function subs ----", subs);
      },
      onMessage: (mess) => {},
      onUpdate: (e) => {
        console.log("onUpdate, e", e);
      },
      onClose: () => {
        // sendMessage(JSON.stringify(({
        //     "action": "SubRemove",
        //     "subs": ["5~CCCAGG~ETH~USD"]
        // })))
      },
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 1000,
      onError: (err) => {
        console.log("error connecting in webSocket", err);
      },
    });

  useEffect(() => {
    if (lastMessage == null) {
      fetchMarketCap();
    }

    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
    if (messageHistory?.length > 1) {
      let shouldFetch = selectAndCompare();
      if (shouldFetch) {
        fetchMarketCap();
      }
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Asset Symbol</th>
            <th>Asset Name</th>
            <th>Data</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/*{data.length >= 1 &&*/}
          {/*data?.map((y, idx) => {*/}
          {/*    const exploreLink = `/assets/${y.symbol}`;*/}
          {marketCapData?.length > 2 && (
            <>
              {marketCapData?.map((y, idx) => {
                return (
                  <tr key={y.CoinInfo.Id}>
                    <td>
                      <img
                        style={{ height: "60px" }}
                        src={
                          "https://www.cryptocompare.com/" +
                          y?.CoinInfo?.ImageUrl
                        }
                      />
                    </td>
                    <td>{y?.CoinInfo?.Name}</td>
                    <td>{y?.CoinInfo?.FullName}</td>
                    <td>
                      <th>Algorithm</th>
                      <tr>{y?.CoinInfo?.Algorithm}</tr>
                      <th>Launch Date</th>
                      <tr>{y?.CoinInfo?.AssetLaunchDate}</tr>
                      {y?.CoinInfo?.BlockReward > 0 && (
                        <div>
                          <th>Block Reward</th>
                          {y?.CoinInfo?.BlockReward}
                        </div>
                      )}
                      {y?.CoinInfo?.MaxSupply > 0 && (
                        <>
                          <b>Max Supply: </b>
                          {y?.CoinInfo?.MaxSupply}
                          {"  /  "}
                        </>
                      )}

                      {y?.ConversionInfo?.Supply > 0 && (
                        <>
                          <b>Current Supply: </b>
                          {y?.ConversionInfo?.Supply}
                        </>
                      )}

                      {y?.CoinInfo?.Rating && (
                        <div>
                          <tr>
                            <td>
                              <th>Market Performance Rating</th>
                              {
                                y?.CoinInfo?.Rating.Weiss
                                  .MarketPerformanceRating
                              }
                            </td>
                            <td>
                              <th>Weiss Rating</th>
                              {y?.CoinInfo?.Rating.Weiss.Rating}
                            </td>
                            <td>
                              <th>Weiss Rating</th>
                              {y?.CoinInfo?.Rating.Weiss.Rating}
                            </td>
                          </tr>
                        </div>
                      )}
                    </td>
                    <td>
                      {/*<PriceSocket sub={y?.ConversionInfo?.SubNeeded} />*/}
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
}
