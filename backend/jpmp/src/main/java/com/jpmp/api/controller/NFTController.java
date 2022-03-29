package com.jpmp.api.controller;


import com.jpmp.api.dto.TokenDto;
import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.request.user.UserImgReqDto;
import com.jpmp.api.dto.request.user.UserLoginReqDto;
import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.api.dto.response.user.UserLoginResDto;
import com.jpmp.api.dto.response.user.UserResDto;
import com.jpmp.api.service.nft.NFTService;
import com.jpmp.api.service.user.UserService;
import com.jpmp.common.util.JwtTokenUtil;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.user.UserRepository;
import com.jpmp.exception.CustomException;
import com.jpmp.exception.ErrorCode;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.jpmp.common.util.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.Optional;


@Slf4j
@Validated
@Api(tags = "NFT")
@RestController
@RequestMapping("/api/nft")
@RequiredArgsConstructor
public class NFTController {

    private final UserService userService;

    private final NFTService nftService;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;


    @PostMapping()
    @ApiOperation(value = "nft 생성", notes = "nft 생성 및 기업에 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> createNft(@ApiIgnore Authentication authentication,
                                                @Valid @RequestBody @ApiParam(value="nft 토큰 id", required = true , type = "String") NFTDto nftDto) {
        User userDetails = userRepository.findByUsername(getUsername());

        nftService.createNFT(userDetails, nftDto);

        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));
    }

    @PutMapping()
    @ApiOperation(value = "nft 소유권 이전", notes = "nft 생성 및 기업에 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> transferNft(@ApiIgnore Authentication authentication,
                                                      @Valid @RequestBody @ApiParam(value="nft 토큰 id", required = true , type = "String") NFTDto nftDto) {
        User userDetails = userRepository.findByUsername(getUsername());

        nftService.transferNFT(userDetails, nftDto);

        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));
    }

    @GetMapping()
    @ApiOperation(value = "나의 nft 조회", notes = "자신이 소유한 nft 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getNftMyList(@ApiIgnore Authentication authentication ) {
        User userDetails = userRepository.findByUsername(getUsername());

        nftService.getNftList(userDetails);

        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));
    }


    @GetMapping("/{owner}")
    @ApiOperation(value = "중고 / 명품 nft 조회", notes = "nft 카테고리별 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getNft(@ApiIgnore Authentication authentication ,@NotBlank @PathVariable Boolean ownerIsEnterprise) {
        User userDetails = userRepository.findByUsername(getUsername());

        nftService.getNftList(userDetails , ownerIsEnterprise);

        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));
    }

    public String getUsername(){
        return SecurityUtils.getCurrentUsername()
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}
