package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.request.nft.NFTReqDto;
import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface NFTService {

    void createNFT(User user , NFTReqDto nftDto);

    void transferNFT(User userDetails, NFTDto nftDto);

    List<Nft> getNftList(User userDetails);

    List<Nft> getNftList(NFTSearchReqDto nftSearchReqDto , Pageable pageable );

    void getNftList(User userDetails, Boolean ownerIsEnterprise);
}