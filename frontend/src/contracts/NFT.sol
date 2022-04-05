// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Marketplace.sol";


// nft 마켓 = 오픈씨 흐름
// 셀러가 토큰 생성(NFT.sol) -> 가격을 정해서 마켓(Marketplace.sol)에 올림 -> 구매자가 구매 -> 판매자에게 이더 전송 -> 마켓(Marketplace.sol)을 통해 판매자에게 이더 전송

// nft 표준 erc721의 기능을 모두 상속받기 위해서 erc721uristorage를 상속
// erc721uristorage는 erc721을 상속받았기 때문에 erc721의 기능을 모두 쓸 수 있다.
// uristorage는 nft의 메타 데이터를 유연하게 사용가능하지만 수수료가 더 많이 든다.
contract NFT is ERC721URIStorage {
  // - 상태변수
  // nft에 구현되어있는 상태변수들은 블록체인에 저장되며 일종의 추적용도로 쓰임(토큰이 몇개인지, 주소가 어딘지 ...)
  // 컨트랙트 내부에 선언하지만 함수 밖에 선언하고, 함수를 이용해서 해당 변수를 수정하여 블록체인에 있는 상태변수도 수정한다.
  uint public tokenCount;

  struct TokenData {

    // address ownerAddr;

    bool realization;
  }

  mapping(uint256 => TokenData) internal _tokenData;
  // 실제로 구현할 땐 SafeMath를 사용해야함

  // - 컨스트럭터(생성자)
  // 계약이 배포된 후 한 번만 호출되는 특수한 함수 = 생성자
  // ()에 인자를 전달해서 {}로 넣는 것
  // 여기서는 erc721의 생성자를 상속해서 사용
  // 보통 이름, 심볼 형태로 생성
  constructor() ERC721("DApp NFT", "DAPP") {}

  // - 민팅
  // _tokenURI는 nft 메타데이터의 주소 = ipfs에서 해당 메타데이터를 찾을 수 있는 주소
  // 인자 : 함수에 문자열을 인자로 전달하려면 memory 장소를 사용해야함
  // 가시성 : 외부에서 호출될 수 있도록 external
  // 리턴 : 새로 생성된 토큰의 ID값을 반환
  function mint(string memory _tokenURI) external returns (uint) {
    tokenCount ++;
    // erc721의 민트함수 상속해서 사용(토큰 주인, 토큰 id)
    _safeMint(msg.sender, tokenCount);
    // erc721uristorage의 토큰 메타데이터를 저장하는 함수를 사용해 해당 함수의 메타데이터 저장
    _tokenData[tokenCount].realization = false;
    _setTokenURI(tokenCount, _tokenURI);

    return(tokenCount);
  }


  // 실물화 확인 함수 => 토큰 아이디로 조회 => 참, 거짓 반환
  function isRealization(uint _tokenId) public view returns (bool) {
    return _tokenData[_tokenId].realization;
  }


  // 실물화 사용법
  // * 인자값 (프론트에서 연결한 marketplace컨트랙트의 주소 ex) const marketAddr = await marketpalce.address, tokenId)
  // * 반려 조건 
  //    1. 토큰 오너와 트랜잭션 보낸 사람이 같지 않으면 == 토큰 주인이 아님
  //    2. 마켓주소와 오너가 같으면 == 토큰이 마켓에 올라가있는 상태 주의주의
  //    3. 실물화 확인 함수 isRealization이 참이라면 == 이미 실물화된 토큰
  function Realization(address marketplaceAddr, uint _tokenId) public {
    if (ownerOf(_tokenId) != msg.sender) revert("This token is not yours");
    if (marketplaceAddr == ownerOf(_tokenId)) revert("Please fall back this token at marketplace");
    if (isRealization(_tokenId) == true ) revert("This token is already realized");
    unchecked{
      _tokenData[_tokenId].realization = true;
    }
  }
}