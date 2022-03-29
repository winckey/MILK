package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.db.entity.user.User;


public interface RBoardService {

    void addRBorad(User user, NtfRequestReqDto ntfRequestReqDto);

    void getRBoradList(User user);
}