package com.jpmp.api.dto.response.nft;


import com.jpmp.api.dto.UserInfoDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("User")
public class NFTResDto extends BaseResponseBody {

    private NFT nft;


}
