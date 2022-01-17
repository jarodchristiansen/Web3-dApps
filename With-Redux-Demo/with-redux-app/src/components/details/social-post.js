import classes from './social-post.module.css';
import {useState, useEffect} from 'react';

function SocialPost(props) {

    const {displayName, time, body, profileImage, retweets, likes, screenName, url} = props;


    return(

        <div style={{minHeight: "10%"}}>
            <img src={profileImage} className={classes.profilePic}/>

            <div style={{width: "100%", display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", marginBottom: "5%", marginTop: "1%"}}>
                <a href={url} target="#">
                    <h6 className={classes.tweetTitle}>{displayName} - @{screenName}- {new Date(time * 1000).toLocaleDateString()}</h6>
                </a>
                <p className={classes.tweetBody}>{body}</p>
            </div>

            <div className={classes.tweetNameRow}>
            <h6 className={classes.retweets}>{'Retweets: ' + retweets}</h6>
            <h6 className={classes.likes}>{'Likes: ' + likes}</h6>
            </div>

        </div>
    )
}


export default SocialPost;