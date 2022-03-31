package com.jpmp.db.repository.nft;


import com.jpmp.db.entity.board.RealizationBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface RBoardRepository extends JpaRepository<RealizationBoard, Long> {


}