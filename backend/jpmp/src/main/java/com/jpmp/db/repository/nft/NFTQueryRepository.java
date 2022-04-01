package com.jpmp.db.repository.nft;

import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NFTQueryRepository {

    List<Nft> findByNFTSearchDto(NFTSearchReqDto reqDto, Pageable pageable);

    List<Nft> findByCoustomUserLikes(User userDetails);
}
