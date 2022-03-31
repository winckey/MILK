package com.jpmp.api.dto.request.nft;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
public class NFTDto {

    @NotBlank
    @ApiModelProperty(name = "유저 nftId", example = "zxs123123123")
    private String nftId;

    @NotBlank
    @ApiModelProperty(name = "nftName", example = "구찌 가방")
    private String nftName;

    @NotBlank
    @ApiModelProperty(name = "기업 이름", example = "GUCCI")
    private String price;

    @NotBlank
    @ApiModelProperty(name = "이미지 Url", example = "http~~~~")
    private String imgUrl;



}
