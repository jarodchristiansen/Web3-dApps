import fetch from 'unfetch'
import classes from './social-metrics.module.css';
import SocialPost from './social-post';
import useSWR from 'swr'
import {ListGroup, ListGroupItem} from "react-bootstrap";

function SocialPosts(props) {
  let responseData;
  const id = props.id;
  let bodyArray = [];
  let displayNames = [];
  let tweetIDs = [];
  let likesArray = [];
  let retweets = [];
  let timeArray = [];
  let profileImages = [];
  let screenNames = [];
  let tweetUrls = [];
  let switchUrl = `data=feeds&key=688o9wuzvzst3uybpg6eh&symbol=${id}&limit=10&sources=twitter`


  let key = '688o9wuzvzst3uybpg6eh';
  const fetcher = url => fetch(url).then(r => r.json());
  const { data, error } = useSWR(`https://api.lunarcrush.com/v2?data=feeds&key=688o9wuzvzst3uybpg6eh&symbol=${id}&limit=5&sources=twitter`, fetcher)
  

  if(data) {
  responseData = data.data;
  console.log(responseData)
//   responseData.map((y) => {
//     timeArray.push(new Date(y.time * 1000).toLocaleDateString());
//     bodyArray.push(y.body);
//     displayNames.push(y.display_name)
//     likesArray.push(y.likes)
//     retweets.push(y.retweets)
//     profileImages.push(y.profile_image)
//     screenNames.push(y.likes)
//     tweetUrls.push(y.url)
//   })
  }
  

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div >
  <div >
    <ListGroup>
        {responseData.map((y) => {
          //   return <li key={y.time}>
          //       {y.display_name}
          //       {y.body}
          //       </li>
          return (
          <ListGroup.Item>
            <SocialPost key={y.time}
                             time={y.time}
                             displayName={y.display_name}
                             body={y.body}
                             likes={y.likes}
                             retweets={y.retweets}
                             profileImage={y.profile_image}
                             url={y.url}
                             screenName={y.twitter_screen_name}
          />
          </ListGroup.Item>
          )})}
    </ListGroup>

    {/*<ul style={{maxHeight: "10%", overflow: "scroll"}}>*/}
    {/*{responseData.map((y) => {*/}
    {/*//   return <li key={y.time}>*/}
    {/*//       {y.display_name}*/}
    {/*//       {y.body}*/}
    {/*//       </li>*/}
    {/*return <SocialPost key={y.time}*/}
    {/*time={y.time}*/}
    {/*displayName={y.display_name}*/}
    {/*body={y.body}*/}
    {/*likes={y.likes}*/}
    {/*retweets={y.retweets}*/}
    {/*profileImage={y.profile_image}*/}
    {/*url={y.url}*/}
    {/*screenName={y.twitter_screen_name}*/}
    {/*/>*/}
    {/*})}*/}
    {/*</ul>*/}
  </div>
  </div>
  )
}

export default SocialPosts;