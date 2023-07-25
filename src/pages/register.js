import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/Login.module.css";
import { useRouter } from "next/router";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);

    const signUpInfo = {
      email: data.email,
      password: data.password,
    };

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("User Created Successfully");
          router.push("/login");
        }
      });
  };
  //   console.log(user);
  return (
    <div className={styles.form}>
      <h3>Sign Up</h3>

      <hr />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Your Email</label>
        <input {...register("email", { required: true })} type="email" />
        <label htmlFor="">Your Password</label>
        <input {...register("password", { required: true })} type="password" />
        <button
          type="submit"
          style={{ padding: "5px 0 8px 0", fontSize: "16px" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
