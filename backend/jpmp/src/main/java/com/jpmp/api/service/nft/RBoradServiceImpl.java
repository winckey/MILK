package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.RBoradRepository;
import com.jpmp.db.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

@Service
@RequiredArgsConstructor
@Transactional
public class RBoradServiceImpl implements RBoradService {

    private final UserRepository userRepository;
    private final RBoradRepository rBoradRepository;

    @Override
    public void addRBorad(Authentication authentication, NtfRequestReqDto ntfRequestReqDto) {

//        User userDetails = (User) authentication.getDetails();
        User enterprise = userRepository.findByUserName(ntfRequestReqDto.getEntrepriseName()).get();

        User userDetails = userRepository.findById(5L).get();


        RealizationBoard realizationBoard = RealizationBoard.builder()
                .nftId(ntfRequestReqDto.getNftId())
                .nftName(ntfRequestReqDto.getNftName())
                .nftImgUrl(ntfRequestReqDto.getImgUrl())
                .consumer(userDetails)
                .enterprise(enterprise)
                .build();

        rBoradRepository.save(realizationBoard);
    }
}
