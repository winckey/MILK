package com.jpmp.api.dto;

import com.jpmp.db.entity.user.User;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserInfoDto {

    private Long id;
    private String userName;
    private String nickname;
    private String description;
    private String phone;
    private String email;
    private String proImg;
    private String backgroundImg;


    public static UserInfoDto of(User user) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(user.getId());
        userInfoDto.setUserName(user.getUserName());
        userInfoDto.setNickname(user.getNickname());
        userInfoDto.setDescription(user.getDescription());
        userInfoDto.setPhone(user.getPhone());
        userInfoDto.setEmail(user.getEmail());
        userInfoDto.setProImg(user.getProfileImg());
        userInfoDto.setBackgroundImg(user.getBackgroundfileImg());

        return userInfoDto;
    }
}
