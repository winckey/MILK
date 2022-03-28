package com.jpmp.api.controller;


import com.jpmp.api.dto.TokenDto;
import com.jpmp.api.dto.request.user.UserImgReqDto;
import com.jpmp.api.dto.request.user.UserLoginReqDto;
import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.api.dto.response.user.UserLoginResDto;
import com.jpmp.api.dto.response.user.UserNicknameCheckResDto;
import com.jpmp.api.dto.response.user.UserResDto;
import com.jpmp.api.service.user.UserService;
import com.jpmp.common.util.JwtTokenUtil;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.user.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import netscape.javascript.JSObject;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


import javax.validation.Valid;
import javax.validation.constraints.NotBlank;


@Slf4j
@Validated
@Api(tags = "회원 관리")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;


    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @Valid @RequestBody @ApiParam(value="회원가입 정보<br>birthDate 칼럼은 yyyy-MM-dd 포맷<br>gender 칼럼은 M 또는 F 값으로 전달", required = true) UserRegisterReqDto registerInfo) {

        userService.createUser(registerInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginResDto> login(@Valid @RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginReqDto loginInfo) {

            TokenDto tokenDto = userService.login(loginInfo);
            return ResponseEntity.ok(UserLoginResDto.of(200, "Success",
                    tokenDto.getAccessToken() , tokenDto.getRefreshToken(), tokenDto.getUser()));
    }

    @PostMapping("/reissue")
    @ApiOperation(value = "재인증", notes = "refresh 토큰으로 재인증 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginResDto> reissue(@RequestHeader("RefreshToken") String refreshToken, @Valid @RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginReqDto userLoginReqDto) {
        User user = userRepository.findByEmail(userLoginReqDto.getEmail()).get();
        TokenDto tokenDto = userService.reissue(refreshToken , user.getUsername());

        return ResponseEntity.ok(UserLoginResDto.of(200, "Success",
                tokenDto.getAccessToken() , tokenDto.getRefreshToken(), user));
    }



    @GetMapping("/info")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserResDto> getUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        User userDetails = (User) authentication.getDetails();

        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", userDetails));
    }

    @PutMapping("")
    @ApiOperation(value = "회원 본인 정보 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserResDto> modifyUser(@ApiIgnore@RequestHeader("Authorization") String accessToken, @Valid @RequestBody @ApiParam(value="수정 정보", required = true) UserModifyReqDto userModifyReqDto) {

        System.out.println("usercontroller accesstoken 106 : " + accessToken);
        String username = jwtTokenUtil.getUsername(accessToken);

        User userDetails = userRepository.findByUsername(username);

        User result = userService.modifyUser(userDetails, userModifyReqDto);

        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", result));
    }
    @PutMapping("/pro")
    @ApiOperation(value = "회원 프로필이미지 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserResDto> modifyProImgUser(@ApiIgnore Authentication authentication, @Valid @RequestBody @ApiParam(value="수정 정보", required = true) UserImgReqDto userImgReqDto) {
        User userDetails = (User) authentication.getDetails();

        User result = userService.modifyProImgUser(userDetails, userImgReqDto.getImgUrl());

        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", result));
    }
    @PutMapping("/back")
    @ApiOperation(value = "회원 배경이미지 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserResDto> modifyBackImgUser(@ApiIgnore Authentication authentication, @Valid @RequestBody @ApiParam(value="수정 정보", required = true) UserImgReqDto userImgReqDto) {
        User userDetails = (User) authentication.getDetails();

        User result = userService.modifyBackImgUser(userDetails, userImgReqDto.getImgUrl());

        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", result));
    }


    @PostMapping("/like")
    @ApiOperation(value = "좋아요 추가", notes = "좋아요 버튼을 통해 해당 nft를 좋아요한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserResDto> addUserNftLike(@ApiIgnore Authentication authentication, @Valid @RequestBody @ApiParam(value="nft 토큰 id", required = true , type = "String") String nftId) {
        User userDetails = (User) authentication.getDetails();

        User result = userService.addUserNftLike(userDetails, nftId);

        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", result));
    }


    @DeleteMapping("/like")
    @ApiOperation(value = "좋아요 삭제", notes = "좋아요 버튼을 통해 해당 nft를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserResDto> deleteUserNftLike(@ApiIgnore Authentication authentication, @Valid @RequestBody @ApiParam(value="nft 토큰 id", required = true) String nftId) {
        User userDetails = (User) authentication.getDetails();

        User result = userService.deleteUserNftLike(userDetails, nftId);

        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", result));
    }


    @GetMapping("/nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복 체크", notes = "닉네임 중복 여부를 알려준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<Boolean> checkDuplicateNickname(@NotBlank @PathVariable String nickname) {

        Boolean result = userService.checkDuplicateNickname(nickname);

        return ResponseEntity.status(200).body(!result);
    }
    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }
}
