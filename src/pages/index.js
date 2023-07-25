import Head from "next/head";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();
  // const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      <Head>
        <title>Next Auth</title>
      </Head>
      <h1 style={{ textAlign: "center", marginTop: "10%" }}>
        Welcome To Next Auth Home Page
      </h1>

      {session?.user && (
        <>
          <h1 style={{ textAlign: "center" }}>
            Welcome{" "}
            {session?.user.name
              ? session?.user.name
              : session.user.email.split("@")[0]}
          </h1>
          <h3 style={{ textAlign: "center", marginTop: "5px" }}>
            Your Email: {session.user.email}
          </h3>
        </>
      )}
    </div>
  );
};

export default HomePage;
