import styled from "styled-components";
import { NFTs } from "../../../../Info";
import { Colors, Devices } from "@components/ui/layout/home/Theme";
import Grid from "../styled/Grid.styled";
import Link from "next/link";
import NFTCard from "../styled/NFTCard.styled";
// hi

const TopCollectiblesEl = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;

  @media ${Devices.Tablet} {
    padding: 1rem 3rem;
  }
  @media ${Devices.Laptop} {
    padding: 1rem 5%;
  }
  @media ${Devices.LaptopL} {
    padding: 1rem 10%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Sort = styled.div`
  border-radius: 30px;
  border: 1px solid ${Colors.Primary};
  padding: 0.4rem 1rem;
  cursor: pointer;
`;
const Date = styled.div`
  background: linear-gradient(to right, ${Colors.Primary}, ${Colors.LightGold});
  border-radius: 30px;
  padding: 0.4rem 2.5rem;
`;
const ShowMore = styled.button`
  margin-top: 1rem;
  cursor: pointer;
  border: 1px solid ${Colors.Primary};
  padding: 0.6rem 1.2rem;
  color: ${Colors.Primary};
  background-color: transparent;
  border-radius: 5px;
  font-size: 1.2rem;
  :hover {
    background-color: ${Colors.Primary};
    color: ${Colors.White};
  }
`;

export default function TopCollectibles() {
  return (
    <TopCollectiblesEl>
      <Title>Top Collection</Title>
      <TopSection>
        <Sort>Sales Volume</Sort>
        <Date>Today</Date>
      </TopSection>
      <Grid>
        {NFTs.map((nft) => {
          return (
            <Link key={nft.Id} href="/asset" passHref>
              <a>
                <NFTCard item={nft} />
              </a>
            </Link>
          );
        })}
      </Grid>
      <ShowMore>더보기</ShowMore>
    </TopCollectiblesEl>
  );
}
