package com.jpmp.api.service.user;

import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.db.entity.user.User;



public interface UserService {
    User createUser(UserRegisterReqDto userRegisterInfo);



}