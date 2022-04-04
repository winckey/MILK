import type { NextPage } from "next";
import Link from "next/link";

import useSWR from "swr";
import Image from "next/image";
import { Layout } from "@components/ui/layout";
import { useEffect, useState } from "react";
import { useRouter } from "wouter";

interface StreamsResponse {
  message: any;
}

const Streams: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamsResponse>(`${process.env.BASE_URL}/live`);
  console.log(data);

  return (
    <Layout seoTitle="라이브">
      <div className=" divide-y-[1px] space-y-4">
        <a className="pt-4 block  px-4">
          <div className="w-full relative overflow-hidden rounded-md shadow-sm bg-slate-300 aspect-video">
            <iframe
              className="w-full aspect-video  rounded-md shadow-sm"
              // src={`https://iframe.videodelivery.net/${uids}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          </div>
        </a>
        {/* <h1 className="text-2xl mt-2 font-bold text-gray-900">{uids} </h1> */}
      </div>
    </Layout>
  );
};

export default Streams;
