import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import fetch from "unfetch";
import { useRouter } from "next/router";
import { Accordion, Card } from "react-bootstrap";
import Draggable from "react-draggable";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import FavoritesTable from "../profile/favoritesTable";
// import { FaPlus, FaMinus } from "react-icons/all";
// import { CgAdd } from "react-icons/cg";
// import { useStore } from "../../store";

function CustomToggle({
  children,
  eventKey,
  isEditing,
  setIsEditing,
  isAuthorized,
}) {
  const [expandedState, setExpandedState] = useState(true);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setExpandedState(!expandedState);
    console.log("expandedState", expandedState);
  });

  return (
    <div>
      {!expandedState ? (
        // <FaPlus onClick={decoratedOnClick}>{children}</FaPlus>
        <div>
          {/*<span onClick={decoratedOnClick}>Plus</span>*/}
          <img
            className={"clickIcon"}
            onClick={() => decoratedOnClick()}
            src={"/local-fa-icons/plus-square.svg"}
            height={30}
          />
        </div>
      ) : (
        // <FaMinus onClick={decoratedOnClick}>{children}</FaMinus>
        <div>
          <img
            className={"clickIcon"}
            onClick={() => decoratedOnClick()}
            src={"/local-fa-icons/minus-square.svg"}
            height={30}
          />
          {isAuthorized && (
            <>
              {!isEditing ? (
                <img
                  className={"clickIcon"}
                  onClick={() => setIsEditing(true)}
                  style={{ marginLeft: "90%" }}
                  src={"/local-fa-icons/edit.svg"}
                  height={30}
                />
              ) : (
                <img
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: "90%" }}
                  src={"/local-fa-icons/minus-square.svg"}
                  height={30}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function AssetFavorites(props) {
  // const { dispatch, getState } = useStore();

  const { path, loadedUser, setLoadedUser, updateFavorites } = props;
  const [isEditing, setIsEditing] = useState(false);
  console.log("this is the path in Favorites ------", path);

  let fetchedUser;

  const router = useRouter();

  let username = router?.query?.username;

  if (username !== null && username !== undefined) {
    username = Object.values(username)[0];
  }

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  // const [loadedUser, setLoadedUser] = useState();
  const [favorites, setFavorites] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    console.log("this is the username in favorites", username);
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        router.replace("/");
      } else if (session !== undefined && session.user.username) {
        if (session?.user?.username === username) {
          setIsAuthorized(true);
        }
        if (path.includes("assets")) {
          console.log("favorites on assets page");
          console.log("this is the getState in favorites", getState());
          setLoadedUser(session.user.username);

          if (state?.user?.favorites) {
            console.log("this is from the redux state yo", state);
            loadFavoritesFromRedux(session.user.username, state);
          } else {
            getUser(session.user.username);
          }
          // setLoadedSession(session);
        }
      }
    });
  }, []);

  const loadFavoritesFromRedux = async (session, state) => {
    fetchedUser = await fetch(`/api/user/get-user?user=${session}`).then((r) =>
      r.json()
    );
    setLoadedUser(fetchedUser);
    setFavorites(state?.user?.favorites);
  };

  const getUser = async (session) => {
    fetchedUser = await fetch(`/api/user/get-user?user=${session}`).then((r) =>
      r.json()
    );
    setLoadedUser(fetchedUser);

    if (fetchedUser) {
      setFavorites(fetchedUser?.favorites);
    }
    console.log(
      "this is favorites in Favorites Component after get user -----",
      favorites
    );
  };

  return (
    <div>
      <div
        style={{ width: "80%", border: "2px solid black", marginLeft: "10%" }}
      >
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <CustomToggle eventKey="0" isAuthorized={isAuthorized}>
                Click me!
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <div>
                {loadedUser?.favorites?.length >= 1 && (
                  <FavoritesTable
                    data={loadedUser?.favorites}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                )}
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}

export default AssetFavorites;
