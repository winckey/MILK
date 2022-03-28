// 수정 금지

import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";

interface IEditProfileResponse {
  message: string;
  statusCode: number;
  user: any;
}

// Only useUser fetcher
const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

export default function useUser() {
  const TOKEN = useRecoilValue(accessToken);
  // console.log(TOKEN);

  const { data, error } = useSWR<IEditProfileResponse>(
    ["https://j6e206.p.ssafy.io:8080/api/user/info", TOKEN],
    fetcher
  );
  // console.log(data);

  return { user: data?.user, isLoading: !data && !error };
}
