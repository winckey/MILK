package com.jpmp.db.entity.nft;


import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.request.nft.NtfRequestReqDto;
import com.jpmp.db.entity.common.Authority;
import com.jpmp.db.entity.user.User;
import lombok.*;



import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class NFT  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nftId;

    @Column(nullable = false)
    private String marketId;


    @Column(nullable = false)
    private String nftName;


    @Column(nullable = false)
    private String price;



    @Column(nullable = false)
    private Boolean seleStatus;

    @Column(nullable = false)
    private Boolean realizationStatus;

    private String imgUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner", referencedColumnName = "id")
    private User owner;


    public static NFT ofCreateNft(User owner , NFTDto nftDto) {
        return NFT.builder()
                .nftId(nftDto.getNftId())
                .nftName(nftDto.getNftName())
                .price(nftDto.getPrice())
                .imgUrl(nftDto.getImgUrl())
                .seleStatus(true)//생성과동시에 판매등록
                .realizationStatus(false)//생성즉시기떄문에 아직 실물화 아님
                .owner(owner)
                .build();
    }

    public void addNFT(User owner) {
        this.owner = owner;
        owner.getNftList().add(this);
    }

}
