package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.NFTRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NFTServiceImpl implements NFTService {


    private final NFTRepository nftRepository;

    @Override
    public void createNFT(User user, NFTDto nftDto) {

        NFT nft = NFT.ofCreateNft(user, nftDto);
        nft.addNFT(user);
        nftRepository.save(nft);

    }

    @Override
    public void transferNFT(User userDetails, NFTDto nftDto) {

        NFT nft = nftRepository.findByNftId(nftDto.getNftId()).get();
        nft.addNFT(userDetails);

    }

    @Override
    public List<NFT> getNftList(User userDetails) {
        for (NFT nft : userDetails.getNftList()){
            System.out.println(nft.getNftId());
        }
        return userDetails.getNftList();
    }
}
