package com.jpmp.api.service.user;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;
import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.db.entity.user.User;



public interface UserService {
    User createUser(UserRegisterReqDto userRegisterInfo);

    User getUserByEmail(String userId);


    User modifyUser(User userDetails, UserModifyReqDto userModifyReqDto);

    User addUserNftLike(User userDetails, String nftId);

    User deleteUserNftLike(User userDetails, String nftId);

    Boolean checkDuplicateNickname(String nickname);

}