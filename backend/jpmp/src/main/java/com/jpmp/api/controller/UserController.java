package com.jpmp.api.controller;


import com.jpmp.api.dto.request.user.UserLoginReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.api.dto.response.user.UserLoginResDto;
import com.jpmp.api.service.user.UserService;
import com.jpmp.db.entity.user.User;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;


@Slf4j
@Validated
@Api(tags = "회원 관리")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


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
        String userEmail = loginInfo.getEmail();
        String password = loginInfo.getPassword();

        User user = userService.getUserByEmail(userEmail);
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (user.getPassword().equals(password)) {

            return ResponseEntity.ok(UserLoginResDto.of(200, "Success", user));
        }

        return ResponseEntity.ok(UserLoginResDto.of(404, "Success",  user));

    }


//    @GetMapping("/id/{userId}")
//    @ApiOperation(value = "아이디 중복 체크", notes = "아이디 중복 여부를 알려준다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = UserIdCheckResDto.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<UserIdCheckResDto> checkDuplicateUserId(@NotBlank @PathVariable String userId) {
//
//        Boolean result = userService.checkDuplicateUserId(userId);
//
//        return ResponseEntity.status(200).body(UserIdCheckResDto.of(200, "Success", userId, result));
//    }
//
//    @GetMapping("/nickname/{nickname}")
//    @ApiOperation(value = "닉네임 중복 체크", notes = "닉네임 중복 여부를 알려준다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = UserIdCheckResDto.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<UserNicknameCheckResDto> checkDuplicateNickname(@NotBlank @PathVariable String nickname) {
//
//        Boolean result = userService.checkDuplicateNickname(nickname);
//
//        return ResponseEntity.status(200).body(UserNicknameCheckResDto.of(200, "Success", nickname, result));
//    }

//    @GetMapping("/me")
//    @ApiOperation(value = "회원 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = UserResDto.class),
//            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
//            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<UserResDto> getUserInfo(@ApiIgnore Authentication authentication) {
//        /**
//         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
//         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
//         */
//        User userDetails = (User) authentication.getDetails();
//
//        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", userDetails));
//    }

//    @PutMapping("/me")
//    @ApiOperation(value = "회원 본인 정보 수정")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = UserResDto.class),
//            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
//            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<UserResDto> modifyUser(@ApiIgnore Authentication authentication, @Valid @RequestBody @ApiParam(value="수정 정보", required = true) UserModifyReqDto userModifyReqDto) {
//        User userDetails = (User) authentication.getDetails();
//
//        User result = userService.modifyUser(userDetails, userModifyReqDto);
//
//        return ResponseEntity.status(200).body(UserResDto.of(200, "Success", result));
//    }
//
//    @PostMapping(value = "/auth")
//    @ApiOperation(value = "패스워드 변경", notes = "로그인된 계정의 패스워드를 변경한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
//            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
//            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<BaseResponseBody> modifyPw(@ApiIgnore Authentication authentication, @Valid @RequestBody UserPwReqDto userPwReqDto) {
//        User userDetails = (User) authentication.getDetails();
//
//        userService.modifyPw(userDetails, userPwReqDto);
//
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }

//    @PostMapping(value = "/img", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    @ApiOperation(value = "프로필 이미지 업로드")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = UserImgPostResDto.class),
//            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
//            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<UserImgPostResDto> insertImg(@ApiIgnore Authentication authentication, @RequestPart("img") MultipartFile img) {
//        User userDetails = (User) authentication.getDetails();
//
//        String imgUrl = userService.saveImg(userDetails, img);
//
//        return ResponseEntity.status(200).body(UserImgPostResDto.of(200, "Success", imgUrl));
//    }

//    @PostMapping(value = "/validate")
//    @ApiOperation(value = "패스워드 체크", notes = "로그인된 계정의 패스워드 일치 여부를 반환한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공", response = UserPwCheckResDto.class),
//            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
//            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
//            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<UserPwCheckResDto> validate(@ApiIgnore Authentication authentication, @Valid @RequestBody UserPwReqDto userPwReqDto) {
//        User userDetails = (User) authentication.getDetails();
//
//        Boolean valid = userService.checkPw(userDetails, userPwReqDto);
//
//        return ResponseEntity.status(200).body(UserPwCheckResDto.of(200, "Success", valid));
//    }
}
