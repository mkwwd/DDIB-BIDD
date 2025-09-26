import { http, HttpResponse } from "msw";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
let today = new Date();
export const handlers = [
  http.get(`${BASE_URL}/`, ({}) => {
    return HttpResponse.text("Mock server is running!");
  }),

  http.get(`${BASE_URL}/api/product/main`, ({ request }) => {
    return HttpResponse.json({
      todayNotOverProducts: [
        {
          productId: 17,
          name: "정샘물 에센셜 스킨 누더 쿠션 14g + 리필 14g, 핑크라이트, 1세트",
          totalStock: 100,
          stock: 100,
          eventStartDate: "2025-04-21T11:00:00",
          eventEndDate: "2025-04-21T13:00:00",
          eventStartTime: 11,
          eventEndTime: 13,
          price: 45000,
          discount: 35,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/jungsaemmool1.jpg",
            },
          ],
          category: "Beauty",
          details: [
            {
              productDetailId: 17,
              imageUrl: "/images/jungsaemmool2.jpg",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 16,
          name: "SONY 노이즈 캔슬링 블루투스 헤드폰, 화이트, WH-CH720N",
          totalStock: 50,
          stock: 50,
          eventStartDate: "2025-04-21T13:00:00",
          eventEndDate: "2025-04-21T15:00:00",
          eventStartTime: 13,
          eventEndTime: 15,
          price: 199000,
          discount: 20,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/sony1.jpg",
            },
          ],
          category: "Appliance",
          details: [
            {
              productDetailId: 16,
              imageUrl: "/images/sony2.jpg",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 16,
          name: "LG 그램 15 IPS FHD 화이트 에디션 15ZB995 코어i5-10210U/램16G/SSD512G/인텔UHD/웹캠/무선랜/15.6 IPS FHD/윈도우11 탑",
          totalStock: 50,
          stock: 50,
          eventStartDate: "2025-04-21T15:00:00",
          eventEndDate: "2025-04-21T17:00:00",
          eventStartTime: 15,
          eventEndTime: 17,
          price: 898000,
          discount: 20,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/lg1.png",
            },
          ],
          category: "Appliance",
          details: [
            {
              productDetailId: 16,
              imageUrl: "/images/lg2.png",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
      ],
      todayProducts: [
        {
          productId: 16,
          name: "로지텍 G502 X PLUS 무선 게이밍 마우스, 910-006166, 블랙",
          totalStock: 1000,
          stock: 0,
          eventStartDate: "2025-04-21T08:00:00",
          eventEndDate: "2025-04-21T10:00:00",
          eventStartTime: 8,
          eventEndTime: 10,
          price: 187000,
          discount: 20.0,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/logitech_mouse1.jpg",
            },
          ],
          category: "Appliance",
          details: [
            {
              productDetailId: 16,
              imageUrl: "/images/logitech_mouse2.jpg",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: true,
        },
        {
          productId: 17,
          name: "정샘물 에센셜 스킨 누더 쿠션 14g + 리필 14g, 핑크라이트, 1세트",
          totalStock: 100,
          stock: 100,
          eventStartDate: "2025-04-21T11:00:00",
          eventEndDate: "2025-04-21T13:00:00",
          eventStartTime: 11,
          eventEndTime: 13,
          price: 45000,
          discount: 35,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/jungsaemmool1.jpg",
            },
          ],
          category: "Beauty",
          details: [
            {
              productDetailId: 17,
              imageUrl: "/images/jungsaemmool2.jpg",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 16,
          name: "SONY 노이즈 캔슬링 블루투스 헤드폰, 화이트, WH-CH720N",
          totalStock: 50,
          stock: 50,
          eventStartDate: "2025-04-21T13:00:00",
          eventEndDate: "2025-04-21T15:00:00",
          eventStartTime: 13,
          eventEndTime: 15,
          price: 199000,
          discount: 20,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/sony1.jpg",
            },
          ],
          category: "Appliance",
          details: [
            {
              productDetailId: 16,
              imageUrl: "/images/sony2.jpg",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 16,
          name: "LG 그램 15 IPS FHD 화이트 에디션 15ZB995 코어i5-10210U/램16G/SSD512G/인텔UHD/웹캠/무선랜/15.6 IPS FHD/윈도우11 탑",
          totalStock: 50,
          stock: 50,
          eventStartDate: "2025-04-21T15:00:00",
          eventEndDate: "2025-04-21T17:00:00",
          eventStartTime: 15,
          eventEndTime: 17,
          price: 898000,
          discount: 20,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/lg1.png",
            },
          ],
          category: "Appliance",
          details: [
            {
              productDetailId: 16,
              imageUrl: "/images/lg2.png",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 16,
          name: "[NIKE]나이키_여성용_운동화_레볼루션 5_REVOLUTION 5 _BQ3207",
          totalStock: 100,
          stock: 100,
          eventStartDate: "2025-04-21T18:00:00",
          eventEndDate: "2025-04-21T20:00:00",
          eventStartTime: 18,
          eventEndTime: 20,
          price: 102100,
          discount: 15,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/nike1.jpg",
            },
          ],
          category: "Fashion",
          details: [
            {
              productDetailId: 16,
              imageUrl: "/images/nike2.jpg",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
        {
          productId: 20,
          name: "스파이더 프로웹 러닝 후드 집업 자켓 상의",
          totalStock: 400,
          stock: 400,
          eventStartDate: "2025-04-21T21:00:00",
          eventEndDate: "2025-04-21T23:00:00",
          eventStartTime: 21,
          eventEndTime: 23,
          price: 179000,
          discount: 30.0,
          thumbnailImage: [
            {
              productDetailId: 16,
              imageUrl: "/images/spider1.jpg",
            },
          ],
          category: "Fashion",
          details: [
            {
              productDetailId: 17,
              imageUrl: "/images/spider2.jpg",
            },
          ],
          likeCount: 0,
          sellerId: 1,
          companyName: "joonseong",
          businessNumber: 101010101,
          companyPhone: 1043200933,
          companyEmail: "306yyy@naver.com",
          over: false,
        },
      ],
    });
  }),
  http.get(`${BASE_URL}/api/order/:id`, ({ request, params }) => {
    const { id } = params;
    return HttpResponse.json({
      orderId: id,
      orderDate: "2024-05-05",
      status: 0,
      companyName: "jeonseoung",
      thumbnailImage:
        "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
      productName: "1990년산 와인",
      quantity: 3,
      price: 10000,
      totalAmount: 27000,
      receiverName: "핑고",
      receiverPhone: "010-1111-1111",
      orderZipcode: "33333",
      orderRoadAddress: "하남산단로 9번길 2",
      orderDetailAddress: "2층 202호",
      paymentMethod: "kakaopay",
    });
  }),
  http.get("/api/order", ({ request }) => {
    return HttpResponse.json([
      {
        orderId: 0,
        orderDate: "2024-05-05",
        status: 0,
        companyName: "jeonseoung",
        thumbnailImage:
          "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        productName: "1990년산 와인",
        quantity: 3,
        price: 10000,
        totalAmount: 27000,
        receiverName: "핑고",
        receiverPhone: "010-1111-1111",
        orderZipcode: "33333",
        orderRoadAddress: "하남산단로 9번길 2",
        orderDetailAddress: "2층 202호",
        paymentMethod: "kakaopay",
      },
      {
        orderId: 1,
        orderDate: "2024-05-05",
        status: 1,
        companyName: "jeonseoung",
        thumbnailImage:
          "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        productName: "1990년산 와인",
        quantity: 3,
        price: 10000,
        totalAmount: 27000,
        receiverName: "핑고",
        receiverPhone: "010-1111-1111",
        orderZipcode: "33333",
        orderRoadAddress: "하남산단로 9번길 2",
        orderDetailAddress: "2층 202호",
        paymentMethod: "kakaopay",
      },
    ]);
  }),
  http.get(`${BASE_URL}/api/notification/:user`, ({ request, params }) => {
    const { pk } = params;
    return HttpResponse.json([
      {
        title:
          "유세진님이 관심있는 SONY 노이즈 캔슬링 블루투스 헤드폰, 화이트, WH-CH720N의 타임딜이 1시간 남았어요!",
        content:
          "1시간 뒤에 DDIB에서 파격적인 가격으로 SONY 노이즈 캔슬링 블루투스 헤드폰, 화이트, WH-CH720N울 구매할 수 있어요!",
        generatedTime: "2024-04-25T12:00:00",
        read: false,
      },
    ]);
  }),
  http.get(`${BASE_URL}/api/product/like/user/:user`, ({ request, params }) => {
    const { pk } = params;
    return HttpResponse.json([
      {
        productId: 1,
        name: "name3",
        totalStock: 1000,
        stock: 1000,
        eventStartDate: "2024-04-25T14:00:00",
        eventEndDate: "2024-04-25T17:00:00",
        eventStartTime: 14,
        eventEndTime: 17,
        price: 10000,
        discount: 10.0,
        thumbnailImage:
          "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        category: "Fashion",
        details: [
          {
            productDetailId: 1,
            imageUrl:
              "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
          },
        ],
        likeCount: 1,
        sellerId: 1,
        companyName: "joonseong",
        businessNumber: 101010101,
        companyPhone: 1043200933,
        companyEmail: "306yyy@naver.com",
        over: false,
      },
      {
        productId: 23,
        name: "name3",
        totalStock: 1000,
        stock: 1000,
        eventStartDate: "2024-05-08T19:00:00",
        eventEndDate: "2024-05-09T20:00:00",
        eventStartTime: 19,
        eventEndTime: 20,
        price: 10000,
        discount: 10.0,
        thumbnailImage:
          "https://iandwe.s3.ap-northeast-2.amazonaws.com/thumbnail/egqHlHZG",
        category: "Fashion",
        details: [
          {
            productDetailId: 23,
            imageUrl:
              "https://iandwe.s3.ap-northeast-2.amazonaws.com/details/hL5SqOBk",
          },
        ],
        likeCount: 1,
        sellerId: 1,
        companyName: "joonseong",
        businessNumber: 101010101,
        companyPhone: 1043200933,
        companyEmail: "306yyy@naver.com",
        over: false,
      },
    ]);
  }),
];
