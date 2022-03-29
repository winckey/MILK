import type { NextPage } from "next";
import Link from "next/link";

import useSWR from "swr";
import Image from "next/image";
import { Layout } from "@components/ui/layout";
import { useEffect, useState } from "react";

interface StreamsResponse {
  ok: true;
  uid: string;
  streamKey: string;
  url: string;
}

const Streams: NextPage = () => {
  const [uids, setUids] = useState("");
  async function handler() {
    const { uid, streamKey, url } = await (await fetch(`/api/streams`)).json();
    console.log(uid, streamKey, url);
    setUids(uid);
  }
  useEffect(() => {
    handler();
  }, []);
  // ;

  return (
    <Layout seoTitle="라이브">
      <div className=" divide-y-[1px] space-y-4">
        <a className="pt-4 block  px-4">
          <div className="w-full relative overflow-hidden rounded-md shadow-sm bg-slate-300 aspect-video">
            <iframe
              className="w-full aspect-video  rounded-md shadow-sm"
              src={`https://iframe.videodelivery.net/${uids}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          </div>
        </a>
        <h1 className="text-2xl mt-2 font-bold text-gray-900">{uids} </h1>
      </div>
    </Layout>
  );
};

export default Streams;
