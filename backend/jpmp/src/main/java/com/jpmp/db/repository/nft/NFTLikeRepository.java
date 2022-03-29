package com.jpmp.db.repository.nft;



import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.nft.NFTUserLike;
import com.jpmp.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface NFTLikeRepository extends JpaRepository<NFTUserLike, Long> {


    @Modifying(clearAutomatically = true)
    void deleteByUserAndNft(User user, NFT nft);

}