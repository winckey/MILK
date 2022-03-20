import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{ fontFamily: "Noto Sans CJK KR" }}
      className="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out  
        bg-ourBlack  drop-shadow-xl
     "
    >
      <div className="max-w-full mx-16 px-5 sm:px-6 ">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link href="/">
              <a
                className="text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold"
                aria-label="Cruip"
              >
                MILC
              </a>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow ">
            <ul className="flex flex-grow gap-3 justify-end flex-wrap items-center">
              <li>
                <Link href="login">
                  <a className=" btn-sm py-2 px-4 bg-gradient-to-r from-gold to-lightGold text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 hover:ring-gold  focus:ring-opacity-75  hover:shadow-lg ">
                    로그인
                  </a>
                </Link>
              </li>
              <li>
                <Link href="signup">
                  <a className=" btn-sm py-2 px-4 bg-gradient-to-r from-gold to-lightGold text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2  hover:ring-gold focus:ring-opacity-75 hover:shadow-lg ">
                    회원가입
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
