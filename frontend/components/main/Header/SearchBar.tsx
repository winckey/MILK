import styled from "styled-components";
import { CgSearch } from "react-icons/cg";
import { Colors, Devices } from "../Theme";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// hi

const SearchBarEl = styled.article`
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  height: 100%;
  max-width: 480px;
  flex: 1;
  align-items: center;
  display: none;

  @media ${Devices.Laptop} {
    display: flex;
  }
`;

const SearchBarBg = styled.form`
  background-color: ${Colors.White};
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  border-radius: 20px;
  padding: 0.5rem 0.7rem;

  svg {
    font-size: 1.5rem;
    color: gray;
  }
`;

const SearchInput = styled.input`
  border: none;
  font-size: 1.15rem;
  flex: 1;
  :focus {
    outline: none;
  }
`;

interface IForm {
  keyword: string;
}

export default function SearchBar() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IForm>();

  const onValid = (data: IForm) => {
    router.push(`/search?keyword=${data.keyword}`);
  };

  return (
    <SearchBarEl>
      <SearchBarBg
        className="focus:ring-gold focus:outline-none  focus:border-lightGold"
        onSubmit={handleSubmit(onValid)}
      >
        <CgSearch />
        <SearchInput
          className="text-black"
          {...register("keyword", { required: true, minLength: 2 })}
          placeholder="당신의 NFT를 찾아보세요"
        />
      </SearchBarBg>
    </SearchBarEl>
  );
}
