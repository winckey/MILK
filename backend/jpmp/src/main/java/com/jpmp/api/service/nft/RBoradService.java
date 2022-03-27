package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import org.springframework.security.core.Authentication;


public interface RBoradService {

    void addRBorad(Authentication authentication, NtfRequestReqDto ntfRequestReqDto);
}