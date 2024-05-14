"use client";

import AddressForm from "@/app/_components/AddressForm";
import styles from "./userInfo.module.scss";
import { useMutation } from "@tanstack/react-query";
import { deleteUser, putUserInfo } from "@/app/_api/user";
import SetUserInfo from "@/app/_components/SetUserInfo";

export default function UserInfo() {
  const quitUser = useMutation({
    mutationFn: async () => {
      return deleteUser();
    },
    async onSuccess(response) {},
    onError(error) {
      console.error(error);
    },
  });

  const modifyUser = useMutation({
    mutationFn: async () => {
      return putUserInfo();
    },
    async onSuccess(response) {},
    onError(error) {
      console.error(error);
    },
  });

  const modify = () => {
    modifyUser.mutate();
  };

  const quit = () => {
    quitUser.mutate();
  };

  return (
    <>
      <SetUserInfo pk={1} />
      <div className={styles.container}>
        <div className={styles.title}>User Info</div>
        <AddressForm type="mypage" />
        <div className={styles.btnArea}>
          <div className={styles.modifyBtn} onClick={() => modify()}>
            수정하기
          </div>
          <div className={styles.quitBtn} onClick={() => quit()}>
            탈퇴하기
          </div>
        </div>
      </div>
    </>
  );
}
