package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.NFTRepository;
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
    private final NFTRepository nftRepository;

//    @Override
//    public void addRBorad(Authentication authentication, NtfRequestReqDto ntfRequestReqDto) {
//
////        User userDetails = (User) authentication.getDetails();
////        User enterprise = userRepository.findByUserName(ntfRequestReqDto.getEntrepriseName()).get();
////
////        User userDetails = userRepository.findById(5L).get();
////
////
////        RealizationBoard realizationBoard = RealizationBoard.builder()
////                .nftId(ntfRequestReqDto.getNftId())
////                .nftName(ntfRequestReqDto.getNftName())
////                .nftImgUrl(ntfRequestReqDto.getImgUrl())
////                .consumer(userDetails)
////                .enterprise(enterprise)
////                .build();
////
////        rBoradRepository.save(realizationBoard);
//    }

    @Override
    public void addRBorad(User user, NtfRequestReqDto ntfRequestReqDto) {

        User enterprise = userRepository.findByRealname(ntfRequestReqDto.getEntrepriseName()).get();
        NFT nft = nftRepository.findByNftId(ntfRequestReqDto.getNftId()).get();

        RealizationBoard realizationBoard = RealizationBoard.builder()
                .nft(nft)
                .consumer(user)
                .enterprise(enterprise)
                .build();

        rBoradRepository.save(realizationBoard);
    }
}
