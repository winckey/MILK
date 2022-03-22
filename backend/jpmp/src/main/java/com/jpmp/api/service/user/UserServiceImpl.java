package com.jpmp.api.service.user;

import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;



    @Override
    public User createUser(UserRegisterReqDto registerRequestDto) {
        // 이게 좀더 맞는 코딩!
        // 나중에 중복확인 추가
        User user = registerRequestDto.toEntity();
        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email).get();
    }

    @Override// 이거 왜 drity check 안댐?
    public User modifyUser(User user, UserModifyReqDto userModifyReqDto) {
        user.changeUser(userModifyReqDto.getAddress() , userModifyReqDto.getDescription()
                        ,userModifyReqDto.getEmail() , userModifyReqDto.getNickname()
                        ,userModifyReqDto.getPhone() , userModifyReqDto.getZipCode());// 이거 동적으로는 안되나?
        userRepository.save(user);
        return user;
    }


}
