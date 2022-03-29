package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.db.entity.user.User;
import org.springframework.security.core.Authentication;


public interface RBoradService {

    void addRBorad(User user, NtfRequestReqDto ntfRequestReqDto);
}