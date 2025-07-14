"use client";

import styles from "./productDetail.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductInfo } from "@/app/types/types";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { TfiArrowCircleUp } from "react-icons/tfi";
import { AiFillShop } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import TimeCount from "@/app/components/TimeCount";
import AmountBtn from "@/app/components/AmountBtn";
import { amountStore, orderStore } from "@/app/store/product";
import { listIn, test } from "@/app/api/waiting";
import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/app/api/product";
import EventBtn from "@/app/(route)/products/_components/EventBtn";
import LikeBtn from "../_components/LikeBtn";
import Cookies from "js-cookie";
import { getDiscount } from "@/app/utils/commonFunction";
import { useSession } from "next-auth/react";

export default function ProductDetail() {
  const { data: session } = useSession();
  const router = useRouter();
  const path = useParams();
  const id = path.id as string;

  const { amount } = amountStore();
  const { setOrderInfo } = orderStore();
  const userPk = Cookies.get("num") as string;

  const { data } = useQuery<ProductInfo>({
    queryKey: ["productInfo", id, userPk],
    queryFn: () => getProductDetail(id, userPk),
  });

  const [salePrice, setSalePrice] = useState(0);
  const [viewMore, setViewMore] = useState(false);

  // const testSend = () => {
  //   test();
  // };

  const joinBuy = () => {
    if (data) {
      const sendInfo = {
        productId: data.productId,
        thumbnailImage: data.thumbnailImage,
        companyName: data.companyName,
        name: data.name,
        totalAmount: amount,
        price: data.price,
        salePrice: salePrice,
        status: 0,
      };
      setOrderInfo(sendInfo);
      listIn(userPk)
        .then(() => {
          router.push("/order");
        })
        .catch((error) => {
          console.error("listIn 함수 호출 중 오류 발생:", error);
        });
    }
  };

  useEffect(() => {
    if (!session) {
      alert("로그인을 먼저 해주세요!!");
      router.back();
    } else {
      if (data) {
        const finPrice = getDiscount(data.price, data.discount);
        setSalePrice(finPrice);
      }
    }
  }, [data]);

  return (
    <>
      {data && (
        <>
          <main className={styles.main}>
            <div className={styles.info}>
              <div className={styles.sectionOne}>
                <div className={styles.thumbnailArea}>
                  <div>
                    <div className={styles.category}>
                      TimeDeal &gt; {data.category}
                    </div>
                  </div>
                  <div className={styles.thumbnailContainer}>
                    <div className={styles.thumbmini}>
                      <Image
                        src={data.thumbnailImage}
                        alt="상품썸네일"
                        fill
                        sizes="auto"
                      ></Image>
                    </div>
                    <div className={styles.thumbnailWrapper}>
                      <Image
                        src={data.thumbnailImage}
                        alt="상품썸네일"
                        fill
                        sizes="auto"
                      ></Image>
                      {data.over && (
                        <>
                          <div className={styles.sold}></div>
                          <div className={styles.soldLogo}>SOLD</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.detailArea}>
                  <div className={styles.detailTitle}>Details</div>
                  <div
                    className={
                      viewMore
                        ? `${styles.detailPhotoView}`
                        : `${styles.detailPhoto}`
                    }
                  >
                    {data.details.map((image, index) => (
                      <div className={styles.wrapper} key={index}>
                        <Image
                          src={image.imageUrl}
                          alt="상품썸네일"
                          layout="responsive"
                          width={100}
                          height={100}
                          objectFit="contain"
                        ></Image>
                      </div>
                    ))}
                  </div>
                  <div
                    className={styles.moreBtnArea}
                    onClick={() => {
                      setViewMore((prev) => !prev);
                    }}
                  >
                    {viewMore ? (
                      <>
                        <div>Hide</div>
                        <div>
                          <TfiArrowCircleUp />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>More</div>
                        <div>
                          <TfiArrowCircleDown />
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.sellerInfo}>
                    <div className={styles.sellerTitle}>Company Info</div>
                    <div className={styles.sellerItemArea}>
                      <div className={styles.sellerItem}>
                        <div>회사명</div>
                        <div>사업자번호</div>
                        <div>대표명</div>
                        <div>대표번호</div>
                        <div>대표이메일</div>
                      </div>
                      <div className={styles.sellerItem}>
                        <div>
                          {data.companyName.length != 0
                            ? data.companyName
                            : " "}
                        </div>
                        <div>
                          {data.businessNumber != 0 ? data.businessNumber : ""}
                        </div>
                        <div>
                          {data.ceoName.length != 0 ? data.ceoName : " "}
                        </div>
                        <div>
                          {data.companyPhone.length != 0
                            ? data.companyPhone
                            : " "}
                        </div>
                        <div>
                          {data.companyEmail.length != 0
                            ? data.companyEmail
                            : " "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.sectionTwo}>
                <div className={styles.twoContainer}>
                  <div className={styles.companyMini}>
                    <div>
                      <AiFillShop />
                    </div>
                    <div>{data.companyName}</div>
                  </div>
                  <div className={styles.name}>{data.name}</div>
                  <div className={styles.price}>
                    <div>{data.price.toLocaleString("ko-KR")}</div>
                    <div>
                      <div>{salePrice.toLocaleString("ko-KR")} </div>
                      <div className={styles.discount}>{data.discount}%</div>
                    </div>
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.shipping}>
                    <LiaShippingFastSolid />
                    <div>무료배송</div>
                  </div>
                  {/* button area */}
                  <AmountBtn stock={data.stock} />
                  <div className={styles.line}></div>
                  <div className={styles.totalPrice}>
                    <div>총 {amount}개</div>
                    <div>{(amount * salePrice).toLocaleString("ko-KR")}</div>
                  </div>
                  <div className={styles.btnArea}>
                    <div>
                      <LikeBtn
                        productId={data.productId}
                        like={data.liked}
                        likeCnt={data.likeCount}
                      />
                      <div className={styles.alert}>
                        좋아요 누르고 오픈 알람받아요~
                      </div>
                    </div>
                    <div>
                      <EventBtn
                        joinBuy={joinBuy}
                        over={data.over}
                        startTime={data.eventStartDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
