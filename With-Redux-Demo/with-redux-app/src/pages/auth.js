import AuthForm from "../components/auth/auth-form";
import { getProviders } from "next-auth/client";
import LoadingSpinner from "../components/ui/loading-spinner";

function AuthPage() {
  return (
    <div>
      {/*<iframe*/}
      {/*  src="https://embed.lottiefiles.com/animation/88985"*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    zIndex: -1,*/}
      {/*    opacity: 0.5,*/}
      {/*    height: "90%",*/}
      {/*  }}*/}
      {/*></iframe>*/}
      {/*<LoadingSpinner />*/}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AuthForm />
      </div>
    </div>
  );
}

export default AuthPage;
