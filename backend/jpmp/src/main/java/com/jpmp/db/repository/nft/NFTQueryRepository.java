package com.jpmp.db.repository.nft;

import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.Nft;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NFTQueryRepository {

    List<Nft> findByNFTSearchDto(NFTSearchReqDto reqDto, Pageable pageable);
}
