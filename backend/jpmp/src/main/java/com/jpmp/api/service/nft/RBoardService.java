package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.user.User;

import java.util.List;


public interface RBoardService {

    void addRBorad(User user, NtfRequestReqDto ntfRequestReqDto);

    List<RealizationBoard> getRBoradList(User user);
}