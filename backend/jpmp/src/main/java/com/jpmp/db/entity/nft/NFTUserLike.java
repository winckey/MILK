package com.jpmp.db.entity.nft;


import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.db.entity.user.User;
import lombok.*;

import javax.persistence.*;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class NFTUserLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft", referencedColumnName = "id")
    private NFT nft;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", referencedColumnName = "id")
    private User user;

    public void addNFTLikeList(User user) {
        this.user = user;
        user.getNftUserLikes().add(this);
    }

    public static NFTUserLike ofCreateNftLike(User user , NFT nft) {

        NFTUserLike nftUserLike =  NFTUserLike.builder()
                .nft(nft)
                .build();

        nftUserLike.addNFTLikeList(user);
        return nftUserLike;
    }




}
