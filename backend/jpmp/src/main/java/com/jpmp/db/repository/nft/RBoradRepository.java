package com.jpmp.db.repository.nft;


import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface RBoradRepository extends JpaRepository<RealizationBoard, Long> {


}