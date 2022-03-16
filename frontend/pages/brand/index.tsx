import type { NextPage } from "next";

const Brand: NextPage = () => {
  return (
    <div className="min-h-screen w-full bg-darkBg">
      <div className="py-[100px] text-center">
        <span className="text-[40px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold">
          Luxury goods Store
        </span>
      </div>
      <div className="p-[52px]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-rows-10 grid-flow-col gap-8">
            <div className="bg-blue-500 row-start-2 row-span-2 h-[400px]"></div>
            <div className="bg-blue-500 row-start-4 row-span-2 h-[400px]"></div>

            <div className="bg-blue-500 row-end-3 row-span-2 h-[400px]"></div>
            <div className="bg-blue-500 row-start-3 row-span-2 h-[400px]"></div>
            <div className="bg-blue-500 row-start-5 row-span-2 h-[400px]"></div>

            <div className="bg-blue-500 row-start-2 row-span-2 h-[400px]"></div>
            <div className="bg-blue-500 row-start-4 row-span-2 h-[400px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
