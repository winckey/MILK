package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;

import java.util.List;


public interface NFTService {

    void createNFT(User user , NFTDto nftDto);

    void transferNFT(User userDetails, NFTDto nftDto);

    List<NFT> getNftList(User userDetails);
}