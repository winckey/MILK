package com.jpmp.api.dto.request.live;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Data
@Getter
@Setter
@ToString
public class LiveDto {

    @ApiModelProperty(example = "값 전달 하지마세요!!!!!")
    private int roomId;

    @NotBlank
    @ApiModelProperty(name = "유저 Id", example = "4")
    private int userId;

    @ApiModelProperty(name = "유저 name", example = "test")
    private String userName;

    @NotBlank
    @ApiModelProperty(name = "cloudflareKey", example = "키값")
    private String cfKey;

    @NotBlank
    @ApiModelProperty(name = "cloudflareId", example = "아이디 값")
    private String cfId;

    @NotBlank
    @ApiModelProperty(name = "cloudflareUrl", example = "url 값")
    private String cfUrl;

    @ApiModelProperty(name = "경매방 이름", example = "구찌가방")
    private String roomName;

    @NotBlank
    @ApiModelProperty(name = "시작가격", example = "123456")
    private int startprice;

    @ApiModelProperty(name = "진행시간", example = "30")
    private int runtime;

    @ApiModelProperty(example = "값 전달 하지 마세요!!!!!")
    private boolean finish;
}
