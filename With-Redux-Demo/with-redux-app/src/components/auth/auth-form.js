import React, { useState, useRef, useEffect } from "react";
import classes from "./auth-form.module.css";
import { getProviders, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { toast, ToastContainer } from "react-nextjs-toast";
import { Button, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import { message } from "antd";
import {
  FaGithub,
  FaFacebookSquare,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";

async function createUser(email, password, username) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

function AuthForm(props) {
  const { providers } = props;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userNameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedProviders, setLoadedProviders] = useState();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [hasError, setHasError] = useState();
  const [showPassword, setShowPassword] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (session) {
        router.replace("/");
      } else {
        loadProviders();
      }
    });
  }, [router]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function loadProviders() {
    let providers = await getProviders();
    delete providers.credentials;
    setLoadedProviders(providers);
  }

  async function submitHandler(event) {
    event.preventDefault();
    setButtonsDisabled(true);
    const enteredEmail = emailInputRef?.current?.value;
    const enteredPassword = passwordInputRef?.current?.value;
    const userName = userNameInputRef?.current?.value;

    if (event.length > 2) {
      await validate();
    }

    //optional: Add validation on input form.
    if (!hasError) {
      console.log("hasError within !hasError", hasError);
      if (isLogin) {
        //log user in
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });

        if (!result.error) {
          //set some auth state

          await getSession().then((session) => {
            setIsLoading(false);
            if (session) {
              const reduxStore = initializeStore();
              const { dispatch } = reduxStore;

              try {
                dispatch({
                  type: "SET_USER",
                  user: session.user,
                });
                setTimeout(() => {
                  router.replace("/");
                }, 3000);
              } catch (err) {
                console.log("no user to dispatch");
              }
            }
          });

          toast.notify(`you have been logged in!`, {
            duration: 3,
            type: "success",
          });
        } else {
          toast.notify(`${result.error}`, {
            duration: 10,
            type: "error",
          });
          console.log("this is the result.error", result.error);
        }
      } else {
        try {
          const result = await createUser(
            enteredEmail,
            enteredPassword,
            userName
          );
          setTimeout(() => {
            router.replace("/");
          }, 3000);
          toast.notify(`user has been created!`, {
            duration: 3,
            type: "success",
          });
        } catch (err) {
          toast.notify(`${err}`, {
            duration: 10,
            type: "error",
          });
          setButtonsDisabled(false);
          console.log(err);
        }
      }
    } else {
      setButtonsDisabled(false);
      console.log("hasError case", hasError);
    }
  }

  async function signInOthers(provider) {
    setButtonsDisabled(true);
    const result = await signIn(provider.id, {
      callbackUrl: `${window.location.origin}`,
    });
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email: enteredEmail,
    //   password: enteredPassword,
    // });

    if (!result?.error) {
      //set some auth state

      await getSession().then((session) => {
        setIsLoading(false);
        if (session) {
          const reduxStore = initializeStore();
          const { dispatch } = reduxStore;

          try {
            dispatch({
              type: "SET_USER",
              user: session.user,
            });
          } catch (err) {
            toast.notify(`No User to Set`, {
              duration: 10,
              type: "error",
            });
          }
        }
      });

      toast.notify(`you have been logged in!`, {
        duration: 3,
        type: "success",
      });
    } else {
      toast.notify(`${result.error}`, {
        duration: 10,
        type: "error",
      });
      console.log("this is the result.error", result.error);
    }
  }

  async function handleValidateEmail(e) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
      setHasError();
      setButtonsDisabled(false);
      return true;
    } else {
      setHasError({
        Email: "Email structure is invalid",
      });
      setButtonsDisabled(true);
      return false;
    }
  }

  const validate = () => {
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setHasError();
    } else {
      setHasError({
        PasswordSignUp: (
          <div>
            Password is weak minLength: 8, minLowercase: 1, minUppercase: 1,
            minNumbers: 1, minSymbols: 1,
          </div>
        ),
      });
    }
  };

  return (
    <section className={classes.auth}>
      <ToastContainer position={"bottom"} />
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            onChange={(e) => handleValidateEmail(e.target.value)}
            required
          />
          {hasError?.Email && <p>{hasError?.Email}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type={!showPassword ? "password" : "text"}
            onFocus={() => setShowPassword(true)}
            onBlur={() => setShowPassword(false)}
            id="password"
            ref={passwordInputRef}
            onChange={(e) => !isLogin && setPassword(e.target.value)}
            required
          ></input>
          {hasError?.PasswordSignUp && !isLogin && password?.length > 1 && (
            <div>{hasError?.PasswordSignUp}</div>
          )}
          {!isLogin && <PasswordStrengthBar password={password} />}
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="username">Your Username (Optional)</label>
            <input type="text" id="username" ref={userNameInputRef} required />
          </div>
        )}
        <div className={classes.actions}>
          <Button
            type={"submit"}
            disabled={buttonsDisabled}
            onClick={(e) => submitHandler(e)}
          >
            {isLogin ? "Login" : "Create Account"}
          </Button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <hr />
            <div className={classes.orText}>
              <h6>Or</h6>
            </div>
          </div>

          <div>Sign in with:</div>
          <div style={{ display: "block", maxWidth: "90%" }}>
            <div className={classes.outer}>
              {loadedProviders &&
                Object.values(loadedProviders).map((provider) => (
                  <div key={provider.name} className={classes.box}>
                    {/*<button onClick={() => signIn(provider.id)}>*/}
                    {/*    Sign in with {provider.name}*/}
                    {/*</button>*/}

                    <Button
                      className={classes.iconButtons}
                      onClick={() => {
                        signInOthers(provider);
                      }}
                      disabled={buttonsDisabled}
                    >
                      {provider.name === "GitHub" && <FaGithub size={28} />}

                      {provider.name === "Facebook" && (
                        <FaFacebookSquare size={28} />
                      )}

                      {provider.name === "Google" && <FaGoogle size={28} />}

                      {provider.name === "Twitter" && <FaTwitter size={28} />}
                    </Button>
                  </div>
                ))}

              {/*<div className={classes.square}></div>*/}
              {/*<div className={classes.square}></div>*/}
              {/*<div className={classes.square}></div>*/}
              {/*<div className={classes.square}></div>*/}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   const providers = await getProviders()
//   return {
//     props: { providers },
//   }
// }

export default AuthForm;
