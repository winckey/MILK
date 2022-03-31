package com.jpmp.db.repository.nft;



import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface NFTRepository extends JpaRepository<NFT, Long> {

    @Transactional(readOnly = true)
    Optional<NFT> findByNftId(String nftId);

    @Transactional(readOnly = true)
    Optional<NFT> findByOwnerIsEnterprise(Boolean ownerIsEnterprise);
}