package com.jpmp.api.controller;

import com.jpmp.api.dto.ChatMessageReqDto;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(tags = {"HelloController API"})
@RequiredArgsConstructor
public class HelloController {

    @PostMapping("/")
    @ApiOperation(value = "회원 가입", notes = "사용자의 정보를 입력하여 회원가입을 한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public String signUp() {
        return "signUp" ;
    }


    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "id와 pw를 이용해 로그인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public String login(@Valid @RequestBody @ApiParam(value="로그인 정보", required = true) ChatMessageReqDto id){
        return "login";
    }
}