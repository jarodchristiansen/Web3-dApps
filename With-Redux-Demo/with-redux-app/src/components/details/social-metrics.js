import Link from 'next/link'
import fetch from 'unfetch'
import {useState, useEffect} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import classes from './social-metrics.module.css';

import useSWR from 'swr'
import {useMediaQuery} from "react-responsive";
import {ResponsiveContainer} from "recharts";

function SocialMetrics(props) {
  let responseData;
  let socialGlobalArray = [];
  let timeArray = [];
  let tweetArray = [];
  let contribArray = [];
  let urlArray = [];
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const id = props.id;
  let key = '688o9wuzvzst3uybpg6eh';
  const fetcher = url => fetch(url).then(r => r.json());
  const { data, error } = useSWR(`https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=90&interval=day`, fetcher)

  useEffect(() => {
    // console.log('window.innerHeight', window.innerHeight);
    // console.log('window.innerHeight', window.innerWidth);
}, [])

  if(data) {
  responseData = data.data[0].timeSeries;
  responseData.map((y) => {
    socialGlobalArray.push((y.social_volume_global / 1000));
    timeArray.push(new Date(y.time * 1000).toLocaleDateString());
    tweetArray.push(y.tweets);
    contribArray.push(y.social_contributors)
    urlArray.push(y.url_shares)
  })
  }

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 920px)`
  })


  const data2 = {
    labels: timeArray,
    datasets: [
      {
        type: 'line',
        label: `Global Social Volume / 10`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: socialGlobalArray
      },
      {
        type: 'line',
        label: 'Tweets',
        backgroundColor: 'rgba(0, 0, 0, 0.56)',
        data: tweetArray,
        borderColor: 'rgba(0, 0, 0, 0.41)',
        pointRadius: 1,
      },
      {
        type: 'line',
        label: 'Social Cont.',
        backgroundColor: 'green',
        data: contribArray,
        borderColor: 'green',
        pointRadius: 1,
      },
      {
        type: 'line',
        label: 'Url Shares',
        backgroundColor: 'blue',
        data: urlArray,
        borderColor: 'blue',
        pointRadius: 1,
      }
    ],
  };
    


  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: 'center', textAlign: "center"}}>
    {/*<h1>Social Share Metrics</h1>*/}
  <div>
      <Bar data={data2}
          // height={windowHeight > 600 ? windowHeight * 0.3 : windowHeight}
           height={isDesktopOrLaptop ? 400 : 125}
      />

    {/* <ul>
    {socialGlobalArray.map((y) => {
      return <li key={y}>{y}</li>
    })}
    </ul> */}
  </div>
  </div>
  )
}

export default SocialMetrics;