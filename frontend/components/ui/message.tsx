import { cls } from "@libs/client/utils";
import { useEffect, useState } from "react";
import { IoShapesOutline } from "react-icons/io5";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
  nickName: string;
  isHost: boolean;
  proImg: string;
}

export default function Message({
  message,
  reversed,
  avatarUrl,
  nickName,
  isHost,
  proImg,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex  items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse " : "",
        isHost ? "font-semibold" : ""
      )}
    >
      <span>{nickName}</span>
      {proImg ? (
        <img
          src={`https://imagedelivery.net/VMYwPRIpsXwlX0kB6AjPIA/${proImg}/avatar`}
          alt="#"
          className="w-10 h-10"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-lightGold" />
      )}

      <div className="w-1/2 text-sm text-stone-600 p-2 border border-stone-300 rounder-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
