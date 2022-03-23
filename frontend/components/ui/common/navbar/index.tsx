export default function Navbar() {
  const logout = () => {
    localStorage.clear(); // 로컬 스토리지 초기화
  };

  return (
    <div
      className="fixed w-full z-30 h-[72px] bg-opacity-90 transition duration-300 ease-in-out  
        bg-ourBlack  drop-shadow-xl
    "
    >
      <div className="max-w-full mx-16 px-5 ">
        <div className="flex items-center justify-between ">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <a
              className="text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold"
              aria-label="Cruip"
            >
              MILC
            </a>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow ">
            <ul className="flex flex-grow gap-3 justify-end flex-wrap items-center">
              <li>
                <a className=" btn-sm py-2 px-4 bg-gradient-to-r from-gold to-lightGold text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2  focus:ring-opacity-75  hover:shadow-lg ">
                  로그인
                </a>
              </li>
              <li>
                <a className=" btn-sm py-2 px-4 bg-gradient-to-r from-gold to-lightGold text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75 hover:shadow-lg ">
                  회원가입
                </a>
              </li>
              <li>
                <div
                  onClick={logout}
                  className=" btn-sm py-2 px-4 bg-gradient-to-r from-gold to-lightGold text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75 hover:shadow-lg "
                >
                  로그아웃
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
