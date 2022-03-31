// import useSWR from "swr";
// import SockJS from "sockjs-client";
// import { over } from "stompjs";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

// interface userInfo {
//   proImg?: string;
//   userName: string;
//   myAsset: number;
//   userId: string;
//   receivername: string;
//   connected: false;
//   message: string;
//   money: number;
// }

// interface Stream {
//   roomId: number;
//   user: userInfo;
// }

// interface StreamResponse {
//   ok: true;
//   stream: Stream;
// }

// let stompClient: any = null;

const Stream: NextPage = () => {
  return null;
};
export default Stream;
// const Stream: NextPage = () => {
//   const { user, isLoading } = userUser();
//   const router = useRouter();

//   const [hostId, setHostId] = useState("");
//   const [isHost, setIsHost] = useState(false);
//   const [userList, setUserList] = useState([]);

//   const [userData, setUserData] = useState<userInfo>({
//     userId: "",
//     userName: "",
//     receivername: "",
//     connected: false,
//     message: "",
//     // 내 자산
//     myAsset: 0,
//     // 응찰가
//     money: 0,
//   });

//   // 최고 응찰가 => 방장이 방 만들 때 지정한 그 시작금액이 들어가야함
//   const [highMoney, setHighMoney] = useState();
//   // 해당 api에 내가 찾고자 하는 데이터 받아오기(최초시작경매가격, ) => useMutation 써서 최초 시작가 받고,
//   // 최종 낙찰가 정해지면 다시 useMutation으로 DB변경
//   const { data, mutate } = useSWR<StreamResponse>(
//     router.query.id ? `/api/streams/${router.query.id}` : router.push("/"),
//     {
//       refreshInterval: 1000,
//     }
//   );

//   // 들어온 유저가 accessToken 있는지 체크해서 connect하기
//   const userCheck = () => {
//     null;
//     connect();
//   };
//   // 최초 들어올 때, userCheck
//   useEffect(() => {
//     userCheck();
//   }, []);

//   const connect = () => {
//     let Sock = new SockJS(
//       `https://j6e206.p.ssafy.io:8080/ws/${router.query.id}`
//     );
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//   };

//   const onError = () => {
//     console.log("error가 무엇이냐");
//   };
//   // 방장일 경우에는 어떻게 해야할지 고민해야함
//   const onConnected = () => {
//     setUserData({
//       ...userData,
//       userName: data?.stream?.user?.userName,
//       money: data?.stream.user?.money,
//       connected: true,
//     });

//     // 그 방에 대한 정보 subscribe 할 수 있도록
//     stompClient.subscribe(`/${router.query.id}/public`, onMessageRecived);
//     userJoin();
//   };

//   const userJoin = () => {
//     const chatMessage = {
//       senderName: userData.userName,
//       status: "JOIN",
//     };
//     stompClient.send("/message", {}, JSON.stringify(chatMessage));
//   };

//   const handleMessage = (e) => {
//     const { value } = e.target;
//     setUserData({ ...userData, message: value });
//   };

//   const sendValue = () => {
//     if (stompClient) {
//       const chatMessage = {
//         senderName: userData.userName,
//         message: userData.message,
//         status: "MESSAGE",
//       };
//       stompClient.send("/message", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, message: "" });
//     }
//   };
//   // 받은 상태값(입장, 경매, 채팅)에 따라 state 변경
//   const onMessageRecived = (response) => {
//     const res = JSON.parse(response.body);
//     switch (res.status) {
//       case "JOIN":
//         // userData가 축적된 객체형 데이터를 userList에 담는다
//         userList.push(res);
//         setUserList([...userList]);
//         // 유저리스트에 1명이 나니까 내가 방장
//         if (userList.length === 1) {
//           setIsHost(true);
//           setHostId(userList.userId);
//         }
//         break;
//       case "MESSAGE":
//         userList.push(res);
//         setUserList([...userList]);
//         break;
//       case "AUCTION":
//         userList.push(res);
//         setUserList([...userList]);
//         break;
//     }
//   };
//   const onDisConnected = (userId) => {
//     setUserList(userList.filter((userList) => userList.find !== userId));
//   };
//   const handleMoney = (e) => {
//     const { value } = e.target;
//     // 최고가랑 비교하기
//   };
//   const getMoney = () => {
//     if (userData.money > highMoney) {
//     }
//     console.log("더 높이 응찰하세요");
//     setMoney(0);
//   };
//   //
//   // 최고가 비교하기 및 갱신
//   useEffect(() => {
//     if (highMoney < money) {
//     }
//   }, [money]);

//   return (
//     <>
//       <input type="text" onChange={(e) => setMoney(e.target.value)} />
//       <button onClick={getMoney}>응찰하기</button>
//     </>
//   );
// };
// 방에 들어갔는데 accesstoken이 없으면 필요한 정보들은 리코일에 저장하면 된다
// 로그인,로그아웃할 때 지갑 연결했을 때, 지갑 금액 갱신
