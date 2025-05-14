import Image from "next/image";
import styles from "./page.module.scss";

import Cookies from "js-cookie";
import GetAlarmToken from "../components/GetAlarmToken";
import MainArea from "./_components/MainArea";
import SetUserInfo from "../components/SetUserInfo";

export default function Home() {
  const cookie = Cookies.get("fcm");

  return (
    <>
      {cookie == "false" && <GetAlarmToken />}
      {Cookies.get("Authorization") && <SetUserInfo />}

      <main className={styles.main}>
        <MainArea />
      </main>
    </>
  );
}
