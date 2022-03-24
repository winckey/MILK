package com.jpmp.api.service.user;

import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

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
        user.changeUser(userModifyReqDto.getAddress1(), userModifyReqDto.getAddress2()
                        , userModifyReqDto.getDescription()
                        ,userModifyReqDto.getEmail() , userModifyReqDto.getNickname()
                        ,userModifyReqDto.getPhone() , userModifyReqDto.getZipCode()
                        ,userModifyReqDto.getUserName()
                        ,userModifyReqDto.getProImg() , userModifyReqDto.getBackgroundImg());// 이거 동적으로는 안되나?
        userRepository.save(user);
        return user;
    }

    @Override
    @Transactional
    public User addUserNftLike(User userDetails, String nftId) {
        userDetails.getLikeList().add(nftId);// 이렇게 하면 못읽음 1:N 일떄 주체 인쪽에서 수정해야지!
        userRepository.save(userDetails);
        // 나중에 물어보기
//        List<String> likeList = userDetails.getLikeList();
//        likeList.add(nftId);

        return userDetails;
    }

    @Override
    public User deleteUserNftLike(User userDetails, String nftId) {
        userDetails.getLikeList().remove(nftId);
        userRepository.save(userDetails);
        return userDetails;
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean checkDuplicateNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }


}
