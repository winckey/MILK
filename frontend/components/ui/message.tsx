import { cls } from "@libs/client/utils";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
  nickName: string;
}

export default function Message({
  message,
  reversed,
  avatarUrl,
  nickName,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      <span>{nickName}</span>
      <div className="w-8 h-8 rounded-full bg-lightGold" />
      <div className="w-1/2 text-sm text-stone-600 p-2 border border-stone-300 rounder-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
