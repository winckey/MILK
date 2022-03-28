package com.jpmp.db.repository.nft;


import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.nft.NFT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface NFTRepository extends JpaRepository<NFT, Long> {


}