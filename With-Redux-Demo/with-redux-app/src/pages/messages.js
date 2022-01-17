import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function Messages(){
    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('wss://streamer.cryptocompare.com/v2?api_key=54c69a67adfc783963d3589c5a08a40a5d619b0f22b94b1c79df9acc9129c5ff');
    const [messageHistory, setMessageHistory] = useState([]);

    const {
        sendMessage,
        lastMessage,
        readyState,
        lastJsonMessage,
    } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log('opened');
            console.log("Sending user id");
            // sendMessage(JSON.stringify({ action: "sendmessage", data: {event: "open_connect", userId: "eduranperez@ucdavis.edu"} })
            // sendMessage("auth:"+key)
            sendMessage(JSON.stringify(({
                "action": "SubAdd",
                "subs": ["5~CCCAGG~ETH~USD"]
            })))
        },
        onMessage: (mess) => {
            console.log('this is the message in onMessage', mess)
        },
        onUpdate: (e) => {
            console.log('onUpdate, e', e)
        },
        onClose: () => {
            sendMessage(JSON.stringify(({
                "action": "SubRemove",
                "subs": ["5~CCCAGG~ETH~USD"]
            })))
        },
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 1000,
        onError: (err) => {
            console.log('error connecting in webSocket', err)
        },
    });

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory(prev => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickChangeSocketUrl = useCallback(() =>
        setSocketUrl('wss://stream.lunarcrush.com/v2?subscribe:btc,ltc:close/social_volume'), []);

    const handleClickSendMessage = useCallback(() =>
    {
        sendMessage(JSON.stringify({"action": "subscribe", "symbols": "ETH-USD"}))
        console.log('sendMessage has been fired')
    }

        , []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            {/*<button*/}
            {/*    onClick={handleClickChangeSocketUrl}*/}
            {/*>*/}
            {/*    Click Me to change Socket Url*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={handleClickSendMessage}*/}
            {/*    disabled={readyState !== ReadyState.OPEN}*/}
            {/*>*/}
            {/*    Click Me to send 'Hello'*/}
            {/*</button>*/}
            <span>The WebSocket is currently {connectionStatus}</span>
            {/*{lastMessage ? <span>Last message: {lastMessage.data}</span> : null}*/}
            {/*<ul>*/}
            {/*    {messageHistory*/}
            {/*        .map((message, idx) => <span key={idx}>{message ? message.data : null}</span>)}*/}
            {/*</ul>*/}

            <ul>
                {messageHistory.map((message, idx) => {
                    return (
                        <li key={idx}>
                            <div>
                                {JSON.parse(message?.data).PRICE}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};


