import Link from "next/link";
import fetch from "unfetch";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import FinancialData from "./financial-data";

import classes from "./financial-chart.module.css";
import CardChart from "../../events/card-chart";
import { useMediaQuery } from "react-responsive";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Scatter,
  ResponsiveContainer,
  Brush,
  Label,
} from "recharts";
import { Accordion, Col } from "react-bootstrap";
import UniswapVolChart from "./uniswapVolChart";

function FinancialChart(props) {
  let responseData;
  let volume = [];
  let timeArray = [];
  let volatility = [];
  let closes = [];
  let percentChange = [];
  let maxSupply = "";
  let oneDay = "";
  let sevenDay = "";
  let thirtyDay = "";
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [chartData, setChartData] = useState();
  const [labels, setLabels] = useState();
  const [time, setTimeScale] = useState(90);

  let labelHolder = [];
  let chartHolder = [];
  let day;

  let fib1;
  let fib2;
  let fib3;
  let fib4;

  const id = props.id;
  let key = "688o9wuzvzst3uybpg6eh";
  const fetcher = (url) => fetch(url).then((r) => r.json());
  // const { data, error } = useSWR(
  //   `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=${time}&interval=day`,
  //   fetcher
  // );

  const [uniswapData, setUniswapData] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();

  let uniValues;
  useEffect(() => {
    fetchPriceData();
    fetchUniswap();
  }, [time]);

  const fetchPriceData = async () => {
    let priceData = await fetch(
      `/api/asset-details/lunardata?key=${key}&symbol=${id}&time=${time}`
    ).then((r) => r.json());
    if (priceData?.data) {
      let test = priceData?.data?.data[0]?.timeSeries.slice(time * -1);
      console.log("this is the testTime", priceData?.data);
      setData(priceData?.data);
    } else {
      console.log("unable to load data from endpoint");
      setError("unable to load data from endpoint");
    }
  };

  const fetchUniswap = async () => {
    uniValues = await fetch(
      `/api/asset-details/uniswap?id=${id}&time=${time}`
    ).then((r) => r.json());

    // for (let i of uniValues) {
    //   if (i["t"]) {
    //       i["t"] = new Date(i["t"]).getTime() / 10000
    //   } else {
    //     console.log("no time in this object")
    //   }
    // }

    if (uniValues.length > 1) {
      setUniswapData([...uniValues]);
    }
  };

  let data2 = [];
  let level1;
  let level2;
  let level3;
  let level4;
  let priceMax;
  let priceMin;
  let diff;

  if (data) {
    responseData = data.data[0].timeSeries.slice(time * -1);
    // console.log('responsedata ----', responseData)
    maxSupply = data.data[0].max_supply;
    oneDay = data.data[0].percent_change_24h;
    sevenDay = data.data[0].percent_change_7d;
    thirtyDay = data.data[0].percent_change_30d;

    let tempCloses = [];

    //Notes to calc fib levels
    for (let item of responseData) {
      tempCloses.push(item.close);
    }

    priceMax = Math.max(...tempCloses);
    priceMin = Math.min(...tempCloses);
    diff = priceMax - priceMin;

    level1 = priceMax - 0.236 * diff;
    level2 = priceMax - 0.382 * diff;
    level3 = priceMax - 0.5 * diff;
    level4 = priceMax - 0.618 * diff;

    // fib1 = new Array(time).fill(level1).flat()
    // fib2 = new Array(time).fill(level2).flat()
    // fib3 = new Array(time).fill(level3).flat()
    // fib4 = new Array(time).fill(level4).flat()

    responseData.map((y) => {
      data2.push({
        date: new Date(y.time * 1000).toLocaleDateString(),
        volatility: y.volatility,
        close: y.close,
        open: y.open,
        high: y.high,
        low: y.low,
        volume: y.volume / 1000000,
        fib1: level1,
        fib2: level2,
        fib3: level3,
        fib4: level4,
      });

      volatility.push(y.volatility * 10 * y.close);
      closes.push(y.close);
      timeArray.push(new Date(y.time * 1000).toLocaleDateString());
      percentChange.push(y.percent_change_24h * 100);
      // contribArray.push(y.social_contributors)
      // urlArray.push(y.url_shares)
    });
    // processPrice(closes, time)
  }

  function processPrice(closes, time) {
    if (closes) {
      closes.map((y) => {
        chartHolder.push(y);
      });

      console.log("this is chartHolder", chartHolder);
      // setChartData(chartHolder)
      // setLabels(labelHolder)
      let priceMax = Math.max(...chartHolder);
      let priceMin = Math.min(...chartHolder);
      let diff = priceMax - priceMin;

      let level1 = priceMax - 0.236 * diff;
      let level2 = priceMax - 0.382 * diff;
      let level3 = priceMax - 0.5 * diff;
      let level4 = priceMax - 0.618 * diff;

      fib1 = new Array(time).fill(level1).flat();
      fib2 = new Array(time).fill(level2).flat();
      fib3 = new Array(time).fill(level3).flat();
      fib4 = new Array(time).fill(level4).flat();
      // setFib1(new Array(90).fill(level1).flat());
      // setFib2(new Array(90).fill(level2).flat());
      // setFib3(new Array(90).fill(level3).flat());
      // setFib4(new Array(90).fill(level4).flat());
    }
  }

  // const data2 = {
  //   labels: timeArray,
  //
  //   datasets: [
  //     // {
  //     //   type: 'line',
  //     //   label: 'Volatility % Scaled to Price',
  //     //   // backgroundColor: 'rgba(0, 0, 0, 0.56)',
  //     //   backgroundColor: 'white',
  //     //   data: volatility,
  //     //   borderColor: 'white',
  //     //   // pointRadius: 1,
  //     //   // pointRadius: 1,
  //     //   pointBackgroundColor: 'white',
  //     //   pointBorderWidth: 1,
  //     //   pointHoverRadius: 8,
  //     //   pointHoverBackgroundColor: 'white',
  //     //   pointHoverBorderColor: 'white',
  //     //   pointHoverBorderWidth: 2,
  //     //   pointRadius: 1,
  //     //   pointHitRadius: 10,
  //     // },
  //     // {
  //     //   type: 'line',
  //     //   label: 'Percent Change * 1000',
  //     //   backgroundColor: 'red',
  //     //   data: percentChange,
  //     //   borderColor: 'red',
  //     //   // pointRadius: 1,
  //     //   pointBackgroundColor: 'red',
  //     //   pointBorderWidth: 1,
  //     //   pointHoverRadius: 8,
  //     //   pointHoverBackgroundColor: 'red',
  //     //   pointHoverBorderColor: 'red',
  //     //   pointHoverBorderWidth: 2,
  //     //   pointRadius: 1,
  //     //   pointHitRadius: 10,
  //     // },
  //     {
  //       type: 'line',
  //       label: 'Take profit 1',
  //       backgroundColor: 'rgba(265, 0, 0, 0.56)',
  //       data: fib1,
  //       borderColor: 'rgba(265, 0, 0, 0.41)',
  //       pointRadius: 2,
  //     },
  //     {
  //       type: 'line',
  //       label: 'Neutral',
  //       backgroundColor: 'rgba(0, 0, 255, 0.54)',
  //       borderColor: 'rgba(0, 0, 255, 0.54)',
  //       pointRadius: 2,
  //       data: fib2
  //     },
  //     {
  //       type: 'line',
  //       label: 'Descending 1',
  //       backgroundColor: 'rgba(0, 255, 0, 0.54)',
  //       borderColor: 'rgba(0, 255, 0, 0.54)',
  //       pointRadius: 2,
  //       data: fib3
  //     },
  //     {
  //       type: 'line',
  //       label: 'Buy Zone',
  //       backgroundColor: 'rgba(237, 255, 0, 0.70)',
  //       borderColor: 'rgba(237, 255, 0, 0.70)',
  //       pointRadius: 2,
  //       data: fib4
  //     },
  //     {
  //       type: 'bar',
  //       label: `Closing Price`,
  //       fill: false,
  //       lineTension: 0.1,
  //       // backgroundColor: 'rgba(75,192,192,0.4)',
  //       backgroundColor: 'rgba(0,264,0,0.5)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderCapStyle: 'butt',
  //       borderDash: [],
  //       borderDashOffset: 0.0,
  //       borderJoinStyle: 'miter',
  //       pointBorderColor: 'rgba(75,192,192,1)',
  //       pointBackgroundColor: '#fff',
  //       pointBorderWidth: 1,
  //       pointHoverRadius: 8,
  //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //       pointHoverBorderColor: 'rgba(220,220,220,1)',
  //       pointHoverBorderWidth: 2,
  //       pointRadius: 1,
  //       pointHitRadius: 10,
  //       data: closes
  //     },
  //   //   {
  //   //     type: 'line',
  //   //     label: 'Url Shares',
  //   //     backgroundColor: 'blue',
  //   //     data: urlArray,
  //   //     borderColor: 'blue',
  //   //     pointRadius: 1,
  //   //   }
  //   ],
  //
  // };

  // console.log("levels and time", level1, level2, level3, level4, time);

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1>Financial Metrics</h1>

      <div className={"social1"}>
        {data && (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Price & Volatility</Accordion.Header>
              <Accordion.Body style={{}}>
                {/*<Bar*/}
                {/*    data={data2}*/}
                {/*    height={isDesktopOrLaptop ? 400 : 125}*/}
                {/*    style={{backgroundColor: "black"}}*/}
                {/*    options={{ indexAxis: "x",  }}*/}
                {/*/>*/}
                <div className={classes.timeRow}>
                  {/*<button className={classes.buttons} onClick={() => setTimeScale(7)}>7D</button>*/}
                  <button
                    className={classes.buttons}
                    onClick={() => setTimeScale(14)}
                  >
                    14D
                  </button>
                  <button
                    className={classes.buttons}
                    onClick={() => setTimeScale(30)}
                  >
                    30D
                  </button>
                  <button
                    className={classes.buttons}
                    onClick={() => setTimeScale(90)}
                  >
                    90D
                  </button>
                </div>

                <ResponsiveContainer height={!isDesktopOrLaptop ? 400 : 350}>
                  <ComposedChart
                    data={data2}
                    // margin={{
                    //   top: 20,
                    //   right: 20,
                    //   bottom: 20,
                    //   left: 20,
                    // }}
                  >
                    {/*This is the background gradient*/}
                    <svg
                      x={0}
                      y={1}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id={key}
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                        >
                          {/*<stop offset="0%" stopColor={'rgb(0,159,213)'} stopOpacity={1}/>*/}
                          {/*<stop offset="50%" stopColor={'rgb(0,113,160)'} stopOpacity={1}/>*/}
                          {/*<stop offset="99%" stopColor={'rgb(0,53,137)'} stopOpacity={1}/>*/}

                          <stop
                            offset="0%"
                            stopColor={"rgb(0,0,0)"}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="50%"
                            stopColor={"rgb(0,0,0)"}
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="99%"
                            stopColor={"rgb(0,0,0)"}
                            stopOpacity={1}
                          />

                          {/*<stop offset="0%" style="stop-color:rgb(0,159,213);stop-opacity:1.00" />*/}
                          {/*<stop offset="50%" style="stop-color:rgb(0,113,160);stop-opacity:1.00" />*/}
                          {/*<stop offset="99%" style="stop-color:rgb(0,53,137);stop-opacity:1.00" />*/}
                        </linearGradient>
                      </defs>
                      <rect
                        fill={`url(#${key})`}
                        width={"100%"}
                        height={!isDesktopOrLaptop ? 400 : 350}
                      />
                    </svg>

                    {/*This is the area chart gradient*/}
                    <defs>
                      <linearGradient
                        id="areaChartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgb(12,0,220)"
                          stopOpacity={1}
                        />
                        <stop
                          offset="50%"
                          stopColor="rgb(0,131,255)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor="rgb(130,210,238)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    {/*Buy level gradient*/}
                    <defs>
                      <linearGradient id="BuyLevel" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="rgb(265,0,0)"
                          stopOpacity={1}
                        />
                        <stop
                          offset="50%"
                          stopColor="rgb(135,0,0)"
                          stopOpacity={1}
                        />
                        <stop
                          offset="100%"
                          stopColor="rgb(0,0,0)"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>

                    {/*<defs>*/}
                    {/*  <linearGradient id="MidZone" x1="0" y1="0" x2="0" y2="1">*/}
                    {/*    <stop offset="0%" stopColor="rgb(220,194,0)" stopOpacity={1}/>*/}
                    {/*    <stop offset="50%" stopColor="rgb(265,0,0)" stopOpacity={0.7}/>*/}
                    {/*    <stop offset="100%" stopColor="rgb(265,0,0)" stopOpacity={0.2}/>*/}
                    {/*  </linearGradient>*/}
                    {/*</defs>*/}

                    {/*Purple Gradient*/}
                    <defs>
                      <linearGradient id="BuyLevel" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="rgb(265,0,0)"
                          stopOpacity={1}
                        />
                        <stop
                          offset="50%"
                          stopColor="rgb(135,0,0)"
                          stopOpacity={0.7}
                        />
                        <stop
                          offset="100%"
                          stopColor="rgb(0,0,0)"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>

                    {!isDesktopOrLaptop ? (
                      <XAxis
                        dataKey="date"
                        scale="band"
                        label={"Date"}
                        tick={{ fill: "white" }}
                        height={50}
                      />
                    ) : (
                      <XAxis
                        dataKey="date"
                        scale="band"
                        label={"Date"}
                        tick={{ fill: "white" }}
                        height={0}
                      />
                    )}

                    {!isDesktopOrLaptop ? (
                      <YAxis
                        dataKey="close"
                        domain={["auto", "auto"]}
                        allowDataOverflow={true}
                        tick={{ fill: "white" }}
                        width={85}
                        tickFormatter={(value) =>
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(value)
                        }
                      />
                    ) : (
                      <YAxis
                        dataKey="close"
                        domain={["auto", "auto"]}
                        allowDataOverflow={true}
                        tick={{ fill: "white" }}
                        width={0}
                      />
                    )}

                    {/*<Brush dataKey="date" height={30} stroke="#8884d8" />*/}
                    <Tooltip
                      position={
                        isDesktopOrLaptop ? { x: 0, y: 350 } : { y: -100 }
                      }
                      offset={300}
                      wrapperStyle={
                        isDesktopOrLaptop
                          ? { zIndex: 1, minWidth: "260px" }
                          : { zIndex: 1, minWidth: "300px" }
                      }
                      labelStyle={{
                        fontSize: "1.5rem",
                        color: "white",
                      }}
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 1)",
                      }}
                      formatter={(value) =>
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(value)
                      }
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconSize={30}
                      layout={"horizontal"}
                      align={"center"}
                    />
                    <Area
                      type="monotone"
                      name="Take Profit 2"
                      dataKey="fib1"
                      fill="rgba(144, 60, 247, 1)"
                      legendType={"plainline"}
                      stroke="rgba(144, 60, 247, 1)"
                    />
                    <Area
                      type="monotone"
                      name="Take Profit 1"
                      dataKey="fib2"
                      fill="lime"
                      legendType={"plainline"}
                      stroke="lime"
                    />
                    <Area
                      type="monotone"
                      name="Mid Zone"
                      dataKey="fib3"
                      fill="yellow"
                      legendType={"plainline"}
                      stroke="yellow"
                    />
                    <Area
                      type="monotone"
                      name="Buy Area"
                      dataKey="fib4"
                      legendType={"plainline"}
                      fill="url(#BuyLevel)"
                      stroke="red"
                    />
                    {/*<Bar dataKey="close" barSize={20} fill="#413ea0" />*/}
                    {/*<Line type="linear" dataKey="fib1" fill="#ff7300" />*/}
                    <Area
                      type="natural"
                      name={"Daily Closing Price"}
                      dataKey="close"
                      fill="url(#areaChartGradient)"
                      legendType={"plainline"}
                      stroke={"rgb(12,0,220)"}
                      strokeWidth={1.25}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}

        {/* <ul>
    {socialGlobalArray.map((y) => {
      return <li key={y}>{y}</li>
    })}
    </ul> */}
      </div>

      <div>
        <div className={classes.dataHolder}>
          <FinancialData
            supply={maxSupply}
            one={oneDay}
            seven={sevenDay}
            thirty={thirtyDay}
          />
        </div>

        {uniswapData && (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Uniswap Volume</Accordion.Header>
              <Accordion.Body>
                <div className={classes.chart}>
                  <UniswapVolChart data={uniswapData} />
                </div>
                {/*<div className={classes.chart}>*/}
                {/*  <CardChart price={data} time_scale={90} symbol={id}/>*/}
                {/*</div>*/}
                {/*<div className={classes.chart}>*/}
                {/*  <CardChart price={data} time_scale={90} symbol={id}/>*/}
                {/*</div>*/}
                {/*<div className={classes.chart}>*/}
                {/*  <CardChart price={data} time_scale={90} symbol={id}/>*/}
                {/*</div>*/}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default FinancialChart;
