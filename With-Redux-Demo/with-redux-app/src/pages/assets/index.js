import { useSession, getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import {
  getEventById,
  getFeaturedEvents,
  getEventsById,
} from "../../../dummy-data";

import { getSearchEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Input, Space } from "antd";
import axios from "axios";

const { Search } = Input;

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AssetFavorites from "../../components/events/assets-favorites";

function AssetsPage(props) {
  const [startingAssets, setStartingAssets] = useState([]);
  const [events, setEvents] = useState();
  const [query, setQuery] = useState();
  const [selected, setSelected] = useState([]);
  const [listOfTitles, setListOfTitles] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [favorites, setFavorites] = useState();
  const [updateFavorites, setUpdateFavorites] = useState();

  const router = useRouter();
  // const { dispatch, getState } = useStore();
  // const results = getState();
  // useEffect(() => {
  //   getSession().then((session) => {
  //     setIsLoading(false);
  //     if (!session) {
  //       window.location.href = "/auth";
  //     }
  //   });
  // }, []);

  // const [session, loading] = useSession();

  // const fetcher = (url) => fetch(url).then((res) => res.json())

  // const { data, error } = useSWR('/api/all', fetcher)

  // function dynamicSort(property) {
  //   var sortOrder = 1;
  //   if (property[0] === "-") {
  //     sortOrder = -1;
  //     property = property.substr(1);
  //   }
  //   return function (a, b) {
  //     /* next line works with strings and numbers,
  //      * and you may want to customize it to your needs
  //      */
  //     var result =
  //       a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  //     return result * sortOrder;
  //   };
  // }

  // async function loadFavorited(data) {
  //   if (results?.user?.favorites) {
  //     console.log("this is the results.favorites", results?.user?.favorites);
  //     for (let i of data) {
  //       if (results?.user?.favorites.filter((e) => e.symbol === i.symbol)) {
  //         /* vendors contains the element we're looking for */
  //         i["favorited"] = true;
  //       }
  //     }
  //   } else {
  //     console.log("loadFavorited not finding results");
  //   }
  //   console.log("this is the data in loadFavorited", data);
  // }

  useEffect(() => {
    axios.get("/api/all").then((res) => {
      // loadFavorited(res?.data);
      // console.log("this is results on the assets page", results);
      console.log("this is the res.data from assets", res.data);

      setEvents(res.data);
    });
  }, []);

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>No data</div>
  // setEvents(data)
  // let featuredEvent = data

  // const featuredEvents = getFeaturedEvents();
  // const featuredEvent = getEventById('BTC');
  // const eventsById = getEventsById('BTC');

  // console.log('this is featuredEvents', featuredEvents)
  let fetchedUser;

  // const getUser = async () => {
  //   fetchedUser = await fetch(`/api/user/get-user?user=${username}`).then((r) =>
  //     r.json()
  //   );
  //   setLoadedUser(fetchedUser);
  //   console.log("this is fetchedUser", fetchedUser);
  // };

  async function searchTitles(query) {
    let returnedEvents = await getSearchEvents(query.toUpperCase());
    if (returnedEvents.length > 0) {
      setListOfTitles(returnedEvents);
    } else {
      setListOfTitles(["No matching assets found"]);
    }
  }

  async function searchQuery() {
    let returnedEvents = await getSearchEvents(query.toUpperCase());
    if (returnedEvents.length > 0) {
      setEvents(returnedEvents);
    } else {
      setEvents(startingAssets);
    }
  }

  const handleKeyPress = (target) => {
    if (target.charCode == 13) {
      alert("Enter Clicked");
    }
  };

  return (
    <div>
      <div style={{ margin: "2% 0 0 10%", width: "100%" }}>
        <Search
          placeholder="Search for an Asset"
          onPressEnter={searchQuery}
          size="large"
          style={{ width: "100%" }}
          onSearch={searchQuery}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          loading={false}
          enterButton="Search"
        />
      </div>

      {/*{updateFavorites ? (*/}
      {/*  // <Favorites*/}
      {/*  //   path={router.pathname}*/}
      {/*  //   loadedUser={loadedUser}*/}
      {/*  //   setLoadedUser={setLoadedUser}*/}
      {/*  // />*/}
      {/*    */}
      {/*    */}
      {/*  <AssetFavorites*/}
      {/*    path={router.pathname}*/}
      {/*    loadedUser={loadedUser}*/}
      {/*    setLoadedUser={setLoadedUser}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  // <Favorites*/}
      {/*  //   path={router.pathname}*/}
      {/*  //   loadedUser={loadedUser}*/}
      {/*  //   setLoadedUser={setLoadedUser}*/}
      {/*  //   />*/}
      {/*  <AssetFavorites*/}
      {/*    path={router.pathname}*/}
      {/*    loadedUser={loadedUser}*/}
      {/*    setLoadedUser={setLoadedUser}*/}
      {/*    updateFavorites={updateFavorites}*/}
      {/*  />*/}
      {/*)}*/}

      {events && (
        <EventList
          items={events.length > 1 ? events : props.events}
          setUpdateFavorites={setUpdateFavorites}
          updateFavorites={updateFavorites}
        />
      )}
    </div>
  );
}
// export async function getStaticProps() {
//   const featuredEvents = await getFeaturedEvents();
//   return {
//       props: {
//           events: featuredEvents
//       }
//
//   }
// }

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }

export default AssetsPage;
