package com.jpmp.db.repository.nft;

import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NFTQueryRepository {

    List<NFT> findByNFTSearchDto(NFTSearchReqDto reqDto, Pageable pageable);
}
