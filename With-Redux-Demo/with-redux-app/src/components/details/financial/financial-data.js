import classes from "./financial-data.module.css";
import Link from "next/link";
import fetch from "unfetch";
import { useState, useEffect } from "react";

import useSWR from "swr";
import { Col, Accordion } from "react-bootstrap";

function FinancialData(props) {
  const { supply, one, seven, thirty } = props;
  let responseData;
  const id = props.id;
  let key = "688o9wuzvzst3uybpg6eh";
  // https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest/
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=90&interval=day`,
    fetcher
  );

  useEffect(() => {}, []);

  if (data) {
    responseData = data;
    console.log(responseData);
    //   console.log(responseData)
  }

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Daily Changes</Accordion.Header>
          <Accordion.Body
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Col style={{ margin: "2% 0 2% 0" }}>
              <p className={classes.datapoint}>
                Max Supply: <span>{supply}</span>
              </p>
              <p className={classes.datapoint}>
                Circulating Supply:{" "}
                <span style={{ color: "darkgold" }}>{supply}</span>
              </p>
              <p className={classes.datapoint}>
                Daily Volume in:{" "}
                <span style={{ color: "darkgold" }}>{supply}</span>
              </p>
            </Col>
            <Col style={{ margin: "2% 0 2% 0" }}>
              <p className={classes.datapoint}>
                Percent Change 24Hr:{" "}
                <span style={{ color: one <= 0 ? "red" : "green" }}>{one}</span>
              </p>
              <p className={classes.datapoint}>
                Percent Change 7D:{" "}
                <span style={{ color: seven <= 0 ? "red" : "green" }}>
                  {seven}
                </span>
              </p>
              <p className={classes.datapoint}>
                Percent Change 30D:{" "}
                <span style={{ color: thirty <= 0 ? "red" : "green" }}>
                  {thirty}
                </span>
              </p>
            </Col>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/*<div className={classes.row}>*/}
      {/*<p className={classes.datapoint}>Max Supply: <span style={{color: 'gold' }}>{supply}</span></p>*/}
      {/*<p className={classes.datapoint}>Circulating Supply: <span style={{color: 'darkgold' }}>{supply}</span></p>*/}
      {/*<p className={classes.datapoint}>Daily Volume in: <span style={{color: 'darkgold' }}>{supply}</span></p>*/}

      {/*</div>*/}
      {/*<div className={classes.row}>*/}
      {/*<p className={classes.datapoint}>Percent Change 24Hr: <span style={{color: one <= 0 ? 'red' : 'green' }}>{one}</span></p>*/}
      {/*<p className={classes.datapoint}>Percent Change 7D: <span style={{color: seven <= 0 ? 'red' : 'green' }}>{seven}</span></p>*/}
      {/*<p className={classes.datapoint}>Percent Change 30D: <span style={{color: thirty <= 0 ? 'red' : 'green' }}>{thirty}</span></p>*/}
      {/*</div>*/}
    </div>
  );
}

export default FinancialData;
