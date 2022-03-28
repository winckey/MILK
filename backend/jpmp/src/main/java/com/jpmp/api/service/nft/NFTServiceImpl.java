package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.NFTRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NFTServiceImpl implements NFTService {


    private final NFTRepository nftRepository;

    @Override
    public void createNFT(User user, NFTDto nftDto) {

        NFT nft = NFT.ofCreateNft(user , nftDto);
        nft.addNFT(user);
        nftRepository.save(nft);

    }
}
