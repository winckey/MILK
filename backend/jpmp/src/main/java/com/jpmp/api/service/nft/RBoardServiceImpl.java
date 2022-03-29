package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.NFTRepository;
import com.jpmp.db.repository.nft.RBoardRepository;
import com.jpmp.db.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RBoardServiceImpl implements RBoardService {

    private final UserRepository userRepository;
    private final RBoardRepository rBoradRepository;
    private final NFTRepository nftRepository;

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

    @Override
    public void getRBoradList(User user) {

//        User enterprise = userRepository.findByRealname(ntfRequestReqDto.getEntrepriseName()).get();
//        NFT nft = nftRepository.findByNftId(ntfRequestReqDto.getNftId()).get();
//
//        RealizationBoard realizationBoard = RealizationBoard.builder()
//                .nft(nft)
//                .consumer(user)
//                .enterprise(enterprise)
//                .build();
//
//        rBoradRepository.save(realizationBoard);
    }
}
