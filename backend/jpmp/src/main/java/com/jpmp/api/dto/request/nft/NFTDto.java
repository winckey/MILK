package com.jpmp.api.dto.request.nft;

import com.jpmp.api.dto.response.rBoard.RBoardDto;
import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.nft.NFT;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@Builder
public class NFTDto {

    @NotBlank
    @ApiModelProperty(name = "유저 nftId", example = "zxs123123123")
    private String nftId;

    @NotBlank
    @ApiModelProperty(name = "nftName", example = "구찌 가방")
    private String nftName;

    @NotBlank
    @ApiModelProperty(name = "가격", example = "123123")
    private String price;

    @NotBlank
    @ApiModelProperty(name = "이미지 Url", example = "http~~~~")
    private String imgUrl;



    private Boolean realStatus;


    private Boolean seleStatus;


    private String owner;

    private String enterprise;

    public static NFTDto of(NFT nft) {

        return NFTDto.builder()
                .nftId(nft.getNftId())
                .nftName(nft.getNftName())
                .price(nft.getPrice())
                .realStatus(nft.getRealizationStatus())
                .seleStatus(nft.getSeleStatus())
                .owner(nft.getOwner().getNickname())
                .enterprise(nft.getEnterprise().getNickname())
                .build();
    }
}
