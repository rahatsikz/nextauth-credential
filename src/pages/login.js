import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const LoginPage = () => {
  // const [createUserWithEmailAndPassword, user, loading, error] =
  //   useCreateUserWithEmailAndPassword(auth);

  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    // createUserWithEmailAndPassword(data.email, data.password);
    const result = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    });
    if (result.error) {
      console.log(result.error);
    } else {
      console.log("Login Successful");
      router.push("/");
    }
  };
  // console.log(user);

  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <div className={styles.social_icons}>
          <GoogleOutlined
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/",
              })
            }
          />
          <GithubOutlined
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000/",
              })
            }
          />
        </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Your Email</label>
          <input {...register("email", { required: true })} type="email" />
          <label htmlFor="">Your Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
          />
          <button
            type="submit"
            style={{ padding: "5px 0 8px 0", fontSize: "16px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
