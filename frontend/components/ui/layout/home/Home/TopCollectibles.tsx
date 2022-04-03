import styled from "styled-components";
import { NFTs } from "../../../../Info";
import { Colors, Devices } from "@components/ui/layout/home/Theme";
import Grid from "../styled/Grid.styled";
import Link from "next/link";
import NFTCard from "../styled/NFTCard.styled";
// hi

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
    <div
      data-aos="fade-up"
      data-aos-delay="450"
      data-aos-duration="1000"
      className="flex flex-col gap-10 items-center px-48 pt-10"
    >
      <div className="text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
        Top Collection
      </div>

      <Grid>
        {NFTs.map((nft) => {
          return (
            <Link key={nft.Id} href="/product/:id" passHref>
              <a>
                <NFTCard item={nft} />
              </a>
            </Link>
          );
        })}
      </Grid>
      <ShowMore>
        <Link href="/brand">
          <a>더보기</a>
        </Link>
      </ShowMore>
    </div>
  );
}
