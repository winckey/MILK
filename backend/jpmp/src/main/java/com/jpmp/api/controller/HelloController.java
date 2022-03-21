package com.jpmp.api.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(tags = {"HelloController API"})
@RequiredArgsConstructor
public class HelloController {

    public String signUp() {
        return "signUp" ;
    }




}