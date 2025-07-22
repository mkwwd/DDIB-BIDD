"use client";

import styles from "./navMenu.module.scss";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { userStore } from "../store/user";
import { IoSearch } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { GoBellFill } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { GoPersonFill } from "react-icons/go";
import Alarm from "./Alarm";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { postUser } from "@/app/api/user";
import { useRouter } from "next/navigation";
import { useNavStore } from "../store/navStore";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();
  console.log(segment);

  const { data: session } = useSession();

  const { jwt } = userStore();
  const router = useRouter();

  const [bellOn, setBellOn] = useState(false);

  const logOutUser = useMutation({
    mutationFn: async () => {
      return postUser();
    },
    async onSuccess(response) {
      console.log("로그아웃완료");
      localStorage.clear();
      Cookies.remove("Authorization");
      Cookies.remove("num");
      Cookies.remove("refresh");
      router.replace("/");
    },
    onError(error) {
      console.error(error);
    },
  });

  const kakaoLogin = () => {
    //window.location.href = "http://localhost:8081/api/oauth2/ddib/kakao";
    //window.location.href = "https://k10c102.p.ssafy.io/api/oauth2/ddib/kakao";
    window.location.href = "https://ddib.kro.kr/api/oauth2/ddib/kakao";
  };

  const logOut = () => {
    logOutUser.mutate();
  };

  const navRef = useRef<HTMLDivElement | null>(null);
  const setNavRect = useNavStore((state) => state.setNavRect);

  useEffect(() => {
    if (navRef.current) {
      const updateNavRect = () => {
        const rect = navRef.current!.getBoundingClientRect();
        setNavRect(rect);
      };
      updateNavRect();
      window.addEventListener("resize", updateNavRect);
      return () => {
        window.removeEventListener("resize", updateNavRect);
      };
    }
  }, []);

  useEffect(() => {
    if (segment == null) return;
    const handleScroll = () => {
      if (!navRef.current) return;
      //navRef.current.style.background = window.scrollY === 0 ? "" : "#ff5454";
      //navRef.current.classList.add = window.scrollY === 0 ? "" : "#ff5454";
      if (window.scrollY === 0) {
        navRef.current.classList.remove(styles.scrolled);
      } else {
        navRef.current.classList.add(styles.scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [segment]);

  return (
    <>
      <div className={styles.main} ref={navRef}>
        <li className={styles.title}>
          <Link href="/">DDIB</Link>
        </li>
        <li>
          <Link href="/products">
            {segment === "products" ? (
              <>
                <div className={styles.subTitle} style={{ fontWeight: "bold" }}>
                  TimeDeal
                </div>
              </>
            ) : (
              <>
                <div className={styles.subTitle}>TimeDeal</div>
              </>
            )}
          </Link>
        </li>
        <li>
          <Link href="https://bidd.kro.kr">
            <div className={styles.subTitle} style={{ paddingRight: "1.5vw" }}>
              <div>BIDD</div>
              {/* <div className={styles.goIcon}>
                <HiArrowTopRightOnSquare />
              </div> */}
            </div>
          </Link>
        </li>
        <li className={styles.search}>
          <Link href="/search">
            {segment === "search" ? (
              <>
                <IoSearch className={styles.icons} />
              </>
            ) : (
              <>
                <IoSearchOutline className={styles.icons} />
              </>
            )}
          </Link>
        </li>
        {session && (
          <li>
            <div
              className={styles.alarm}
              onClick={() => setBellOn((prev) => !prev)}
            >
              {bellOn ? (
                <GoBellFill className={styles.icons} />
              ) : (
                <GoBell className={styles.icons} />
              )}
            </div>
            {bellOn && (
              <div className={styles.alarmModal}>
                <Alarm />
              </div>
            )}
          </li>
        )}
        <li>
          {!session ? (
            <>
              <div
                onClick={() => signIn("kakao")}
                className={styles.beforeLogin}
              >
                <GoPerson className={styles.icons} />
                <div className={styles.logBtn}>Login</div>
              </div>
            </>
          ) : segment === "mypage" ? (
            <>
              <Link href="/mypage">
                <div className={styles.afterLogin}>
                  <GoPersonFill className={styles.icons} />
                  <div className={styles.logBtn} onClick={() => signOut()}>
                    Logout
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/mypage">
                <div className={styles.afterLogin}>
                  <GoPerson className={styles.icons} />
                  <div className={styles.logBtn} onClick={() => signOut()}>
                    Logout
                  </div>
                </div>
              </Link>
            </>
          )}
        </li>
      </div>
    </>
  );
}
