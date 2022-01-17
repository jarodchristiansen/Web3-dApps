// import classes from "./profile-form.module.css";
import { useState, useEffect, useRef } from "react";
import {signOut} from "next-auth/client";

function UsernameForm(props) {
    const newUsernameRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        const enteredNewUsername = newUsernameRef.current.value;

        //Need to Add validation

        console.log("this is the new enteredNewUsername", enteredNewUsername)

       let results =  await props.onChangeUsername({
            newUsername: enteredNewUsername,
        });


        if (results?.message === 'Password updated') {
            signOut({callbackUrl: 'http://localhost:3000/'})
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="new-password">New Username</label>
                <input type="text" id="new-username" ref={newUsernameRef} />
            </div>

            <div>
                <button>Change Username</button>
            </div>
        </form>
    );
}

export default UsernameForm;
