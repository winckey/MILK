package com.jpmp.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/member/v1")
@Api(tags = {"회원가입 API"})
@RequiredArgsConstructor
public class HelloController {

    @PostMapping(value = "/")
    public String signUp() {
        return "signUp" ;
    }

}