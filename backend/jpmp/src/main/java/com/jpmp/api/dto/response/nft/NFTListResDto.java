package com.jpmp.api.dto.response.nft;


import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.db.entity.nft.NFT;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("User")
public class NFTListResDto extends BaseResponseBody {

    private NFT nft;


}
