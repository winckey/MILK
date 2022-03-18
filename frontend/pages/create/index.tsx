import { Navbar } from "@components/ui/common";
import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <div className="min-h-screen w-full ">
      <Navbar />
      <div className="px-24 pt-32  ml-12 mr-4">
        <div>
          <div className="text-5xl mb-12 "> Create item</div>
          {/* 제품 정보들 좌+우 */}
          <div className="grid grid-cols-2">
            <div className="grid grid-rows-6 gap-4">
              {/* 제품명 */}
              <div>
                <div>제품명</div>
                <input type="text" />
              </div>
              {/* 제품실물여부 */}
              <div>
                <div>실물 여부</div>
                <input type="text" />
              </div>
              {/* 제품 설명 */}
              <div>
                <div>상세 설명</div>
                <input type="text" />
              </div>
              {/* 에디션 */}
              <div>
                <div>Edition</div>
                <input type="text" />
              </div>
              {/* 판매유형 */}
              <div>
                <div>판매 유형</div>
                <input type="text" />
              </div>
              {/* 로열티 */}
              <div>
                <div>로열티 설정</div>
                <input type="text" />
              </div>
            </div>
            <div className="grid gap-5 ">
              <div>
                <div>제품 파일 올리기</div>
                <div className="bg-lightGold h-[250px] w-[250px]">
                  파일 박스
                </div>
              </div>
              <div>
                <div>가격</div>
                <input type="number" />
              </div>
              <div>만들기 버튼</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
