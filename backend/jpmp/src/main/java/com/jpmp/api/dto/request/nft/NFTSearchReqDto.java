package com.jpmp.api.dto.request.nft;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class NFTSearchReqDto {


    @ApiModelProperty(name = "keyword_nft_name", example = "1995 숄더백")
    private String keyword;

    @ApiModelProperty(name = "nftName_enterprise", example = "gucci")
    private String nftName;


    @ApiModelProperty(name = "좋아요순", example = "true = 좋아요한거")
    private Boolean like;

    @ApiModelProperty(name = "가격 내림차순", example = "true = 내림차순")
    private Boolean priceDesc;

    @ApiModelProperty(name = "가격Max", example = "9999")
    private String max;


    @ApiModelProperty(name = "가격Min", example = "0")
    private String min;




}
