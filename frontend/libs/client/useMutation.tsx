// POST, PUT fetch (DB의 상태를 mutate)

import { accessToken } from "@components/atoms/Auth";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
  methodType: string;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string,
  methodType?: string
): UseMutationResult<T> {
  if (!methodType) {
    methodType = "POST";
  }
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
    methodType,
  });
  // console.log(methodType);
  const URL = `https://j6e206.p.ssafy.io:8080${url}`;
  const TOKEN = useRecoilValue(accessToken);
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    if (methodType === "PUT") {
      setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      });
    } else {
      setHeaders({
        "Content-Type": "application/json",
      });
    }
  }, []);

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    // console.log(headers);
    fetch(URL, {
      method: methodType,
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}
