import classes from "./event-item.module.css";
import Button from "../ui/button";
import CardChart from "./card-chart";
import { useState } from "react";
import addFavoriteUtil from "../../lib/favorites";
import StarButton from "../ui/starbutton";
// import { useStore } from "../../store";
import { useEffect } from "react";
import { useSession } from "next-auth/client";
import { Star, StarFill } from "react-bootstrap-icons";

function EventItem(props) {
  const {
    title,
    image,
    id,
    symbol,
    description,
    price,
    favorited,
    updateFavorites,
    setUpdateFavorites,
  } = props;
  // console.log(price)
  // const humanReadableDate = new Date(date).toLocaleDateString('en-US', {day: 'numeric', month:'long', year:'numeric'})

  // const fomrattedAddress = location.replace(', ', '\n')
  // const { dispatch, getState } = useStore();
  const [favorites, setFavorites] = useState();
  const [session, loading, status] = useSession();
  const [favorite, setFavorite] = useState();

  // const state = getState();

  useEffect(() => {
    // checkFavorites();
  }, []);

  async function checkFavorites() {
    if (state?.user?.favorites) {
      for (let i of state?.user?.favorites) {
        if (i?.symbol === symbol) {
          setFavorite(true);
        }
      }
    }
  }

  async function addFavorite(title, symbol, image) {
    console.log("this is addFavorite firing ---", title, symbol, image);

    let favoriteObject = {
      title,
      symbol,
      image,
    };

    dispatch({
      type: "ADD_FAVORITE",
      favorite: favoriteObject,
    });
    await addFavoriteUtil(favoriteObject);
    setUpdateFavorites(!updateFavorites);
  }

  const exploreLink = `/assets/${symbol}`;
  return (
    <li className={classes.item}>
      <div className={classes.imgRow}>
        <img className={classes.img} src={image} alt="" />
        <div className={classes.column}>
          <h3 className={classes.title}>
            {title} - {symbol}
          </h3>
          <Button link={exploreLink}>
            <span className={classes.explore}>Explore</span>
          </Button>
        </div>
        <div style={{ margin: "3% 0 0 12%" }}>
          {!favorite ? (
            <StarFill
              color={"gray"}
              size={32}
              onClick={() => addFavorite(title, symbol, image)}
            />
          ) : (
            <StarFill color={"gold"} size={32} />
          )}
        </div>
      </div>
      <div className={classes.description}>{description}</div>
    </li>
  );
}

export default EventItem;
