import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Colors, Devices } from "./Theme";
import Button from "./styled/Button.styled";
import SearchBar from "./Header/SearchBar";
import SearchBarMob from "./Header/MobileSearchBar";
import { useRecoilValue, useRecoilState } from "recoil";
import { accessToken } from "@components/atoms/Auth";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderEl = styled.header`
  z-index: 10;
  display: flex;
  color: ${Colors.White};
  width: 100%;
  align-items: center;
  opacity: 0.97;
  gap: 1rem;
  padding: 1rem 1.5rem;
  top: 0;
  transition: all 0.3s linear;

  position: sticky;

  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.img`
  width: 45px;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
`;

const Nav = styled.nav`
  margin-left: auto;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
  display: none;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 1rem;
  }

  @media ${Devices.Laptop} {
    display: block;
  }
`;

const NavItem = styled.a`
  font-size: 1.2rem;
  font-weight: 400;

  &:hover {
    background: linear-gradient(
      to right,
      ${Colors.Primary},
      ${Colors.LightGold}
    );
    color: ${Colors.PrimaryDark};
  }
`;
const CreateItem = styled.a`
  font-size: 1.4rem;
  font-weight: 400;

  &:hover {
    background: linear-gradient(
      to right,
      ${Colors.Primary},
      ${Colors.LightGold}
    );
    color: ${Colors.PrimaryDark};
  }
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Devices.Laptop} {
    display: none;
  }
`;
const MenuIcon = styled(SearchIcon)``;

const AuthItems = styled(NavItem)`
  font-size: 1.2rem;
  font-weight: 400;
  display: none;
  @media ${Devices.Laptop} {
    display: inherit;
  }
`;

function MyDropdown({ logout }) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }
  return (
    <Menu as="div" className="flex py-3 px-3 border rounded-full">
      <Menu.Button
        onClick={() => {
          toggleOpen();
        }}
      >
        유저
      </Menu.Button>
      {/* <Transition
        show={open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      > */}
      <Menu.Items className="absolute mt-10 mr-2 flex flex-col right-0 bg-white rounded-md shadow-lg border">
        <Menu.Item>
          <Link href="/account">
            <a className="px-4 py-2 hover:bg-gray-300 text-gray-500">프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <a
            className="px-4 py-2 hover:bg-gray-300 text-gray-500"
            href="/show/arts"
          >
            나의 전시관
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            onClick={logout}
            className="px-4 py-2 cursor-pointer hover:bg-gray-300 text-gray-500"
          >
            로그아웃
          </a>
        </Menu.Item>
      </Menu.Items>
      {/* </Transition> */}
    </Menu>
  );
}

export default function Header({ mobileMenu }) {
  const { MobileMenuIsOpen, setMobileMenuIsOpen } = mobileMenu;
  const [SearchIsOpen, setSearchIsOpen] = useState(false);
  const [TOKEN, setTOKEN] = useRecoilState(accessToken);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const logout = () => {
    router.push("/");
    localStorage.clear();
    setTOKEN("");
  };
  function toggleMenu() {
    setMobileMenuIsOpen(!MobileMenuIsOpen);
  }

  return (
    <HeaderEl
      className="shadow-md w-full bg-ourBlack h-[80px] fixed top-0 left-0 bg-opacity-90"
      data-aos="zoom-y-out"
      data-aos-delay="150"
    >
      <MenuIcon>
        {MobileMenuIsOpen ? (
          <IoClose
            style={{ fontSize: "2.5rem" }}
            className="text-gold"
            onClick={() => {
              toggleMenu();
            }}
          />
        ) : (
          <FiMenu
            onClick={() => {
              toggleMenu();
            }}
          />
        )}
      </MenuIcon>
      <Center>
        <Link href="/">
          <span className="cursor-pointer text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
            MILC
          </span>
        </Link>
        <SearchBar />
        <Nav>
          <ul>
            <li>
              <NavItem className="p-2 px-3 rounded-md" href="/user">
                개인관
              </NavItem>
            </li>
            <li>
              <NavItem className="p-2 px-3 rounded-md" href="/brand">
                명품관
              </NavItem>
            </li>

            {TOKEN ? (
              <>
                <li>
                  <NavItem className="p-2 px-3 rounded-md" href="/stream">
                    라이브 경매
                  </NavItem>
                </li>
                <li>
                  <Link href="/create">
                    <CreateItem className="cursor-pointer font-bold text-xl  to-lightGold  shadow-md py-2 px-3 rounded-md ">
                      Create
                    </CreateItem>
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </Nav>
      </Center>
      {SearchIsOpen ? (
        <SearchBarMob
          SearchIsOpen={SearchIsOpen}
          setSearchIsOpen={setSearchIsOpen}
        />
      ) : (
        ""
      )}

      <SearchIcon>
        <CgSearch
          onClick={() => {
            setSearchIsOpen(!SearchIsOpen);
          }}
        />
      </SearchIcon>
      {TOKEN ? (
        <MyDropdown logout={logout} />
      ) : (
        <>
          <NavItem className="p-2 px-3 rounded-md" href="/login">
            로그인
          </NavItem>
          <NavItem className="p-2 px-3 rounded-md" href="/signup">
            회원가입
          </NavItem>
        </>
      )}
    </HeaderEl>
  );
}
