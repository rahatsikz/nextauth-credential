import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Head from "next/head";
import { useSession } from "next-auth/react";
const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <div style={{ textAlign: "center" }}>
      <Head>
        <title>Next Profile</title>
      </Head>
      <h1>User Profile</h1>
      <Avatar size={64} icon={<UserOutlined />} />
      <h2>
        Name:{" "}
        {session?.user?.name
          ? session?.user?.name
          : session?.user?.email.split("@")[0]}
      </h2>
      <h2>Email: {session?.user?.email}</h2>
    </div>
  );
};

export default ProfilePage;
