package com.jpmp.api.dto.request.nft;

import com.jpmp.db.entity.nft.Nft;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class NFTLikeReqDto {


    @ApiModelProperty(name = "유저 nftId", example = "zxs123123123")
    private String nftId;


}
