import useSWR from "swr";
import SockJS from "sockjs-client";
import { over } from "stompjs";
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

let stompClient = null;

const Stream = () => {
  // const { user, isLoading } = userUser();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [hostId, setHostId] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [userList, setUserList] = useState([]);

  // 최고 응찰가 => 방장이 방 만들 때 지정한 그 시작금액이 들어가야함
  const [highMoney, setHighMoney] = useState([]);
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    receivername: "",
    connected: false,
    message: "",
    // 내 자산
    myAsset: 0,
    // 응찰가
    money: 0,
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // 0분이 됐을 때, api에 요청해서 경매 종료로 바꾸면서(백방) 최고가에 대한 정보  ( 유저 아이디랑 가격 )를 가진 유저한테 낙찰 혹은 포기 모달 활성화
  // 결과를 내가 api에 요청해서 보내고 web3~

  // 해당 api에 내가 찾고자 하는 데이터 받아오기(최초시작경매가격, ) => useMutation 써서 최초 시작가 받고,
  // 최종 낙찰가 정해지면 다시 useMutation으로 DB변경
  // const { data, mutate } =
  //   useSWR <
  //   StreamResponse >
  //   (router.query.id ? `/api/streams/${router.query.id}` : router.push("/"),
  //   {
  //     refreshInterval: 1000,
  //   });

  // 들어온 유저가 accessToken 있는지 체크해서 connect하기
  // const userCheck = () => {
  //   null;
  //   connect();
  // };
  // // 최초 들어올 때, userCheck
  // useEffect(() => {
  //   userCheck();
  // }, []);

  const connect = () => {
    let Sock = new SockJS(`https://j6e206.p.ssafy.io:8080/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = () => {
    console.log("error가 무엇이냐");
  };
  // 방장일 경우에는 어떻게 해야할지 고민해야함
  const onConnected = () => {
    setUserData({
      ...userData,
      userName: data?.stream?.user?.userName,
      money: data?.stream.user?.money,
      connected: true,
    });

    // 그 방에 대한 정보 subscribe 할 수 있도록
    stompClient.subscribe(`/room/${router.query.id}`, onMessageRecived);
    userJoin();
  };

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.userName,
      status: "JOIN",
    };
    stompClient.send(`/chat/join`, {}, JSON.stringify(chatMessage));
  };

  // 받은 상태값(입장, 경매, 채팅)에 따라 state 변경
  const onMessageRecived = (response) => {
    const res = JSON.parse(response.body);
    switch (res.status) {
      case "JOIN":
        // userData가 축적된 객체형 데이터를 userList에 담는다
        userList.push(res);
        setUserList([...userList]);
        // 유저리스트에 1명이 나니까 내가 방장
        if (userList.length === 1) {
          setIsHost(true);
          setHostId(userList.userId);
        }
        break;
      case "MESSAGE":
        chats.push(res);
        setChats([...chats]);
        break;
      case "AUCTION":
        highMoney.push(res);
        setHighMoney([...highMoney]);
        break;
    }
  };
  const onDisConnected = (userId) => {
    setUserList(userList.filter((userList) => userList.find !== userId));
  };
  const handleMoney = (e) => {
    const { value } = e.target;
    setUserData({ ...userData, money: value });
    // 최고가랑 비교하기
  };
  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };
  const sendValue = () => {
    if (stompClient) {
      const chatMessage = {
        // 닉네임만 중복 안됨
        senderName: userData.nickname,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/chat/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };
  const sendPrice = () => {
    if (stompClient && userData.money > highMoney) {
      let priceList = {
        senderName: userData.username,
        money: userData.money,
        status: "AUCTION",
      };
      console.log(priceList);
      stompClient.send("/chat/auction", {}, JSON.stringify(priceList));
      // 응찰가격 0으로 리셋
      setUserData({ ...userData, money: 0 });
    } else if (stompClient && userData.money <= highMoney) {
      console.log("더 높은 금액을 입력하세요");
    }
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div className="bg-white min-h-screen">
      {userData.connected ? (
        <>
          <>
            <ul className="chat-messages">
              {chats.map((chat, index) => (
                <li
                  className={`message ${
                    chat.senderName === userData.username && "self"
                  }`}
                  key={index}
                >
                  <div className="avatar">{chat.senderName}</div>

                  <div className="message-data">{chat.message}</div>
                </li>
              ))}
            </ul>

            <div className="send-message">
              <input
                type="number"
                className="input-message"
                placeholder="돈을 입력하세요"
                value={userData.money}
                onChange={handleMoney}
              />
              <button type="button" className="send-button" onClick={sendPrice}>
                send
              </button>
            </div>
          </>
          <ul className="chat-messages">
            {chats.map((chat, index) => (
              <li
                className={`message ${
                  chat.senderName === userData.username && "self"
                }`}
                key={index}
              >
                {chat.senderName !== userData.username && (
                  <div className="avatar">{chat.senderName}</div>
                )}
                <div className="message-data">{chat.message}</div>
                {chat.senderName === userData.username && (
                  <div className="avatar self">{chat.senderName}</div>
                )}
              </li>
            ))}
          </ul>

          <div className="send-message">
            <input
              type="text"
              className="input-message"
              placeholder="enter the message"
              value={userData.message}
              onChange={handleMessage}
            />
            <button type="button" className="send-button" onClick={sendValue}>
              send
            </button>
          </div>
        </>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};
// 방에 들어갔는데 accesstoken이 없으면 필요한 정보들은 리코일에 저장하면 된다
// 로그인,로그아웃할 때 지갑 연결했을 때, 지갑 금액 갱신
export default Stream;
