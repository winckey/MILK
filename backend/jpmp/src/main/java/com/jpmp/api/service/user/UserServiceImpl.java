package com.jpmp.api.service.user;

import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;



    @Override
    public User createUser(UserRegisterReqDto registerRequestDto) {
        // 이게 좀더 맞는 코딩!
        // 나중에 중복확인 추가
        User user = registerRequestDto.toEntity();
        return userRepository.save(user);
    }






}
