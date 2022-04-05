package com.jpmp.api.dto.response.rBoard;

import com.jpmp.db.entity.board.RBoardStatus;
import com.jpmp.db.entity.board.RealizationBoard;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Builder
@Getter
@Setter
public class RBoardDto {


    private RBoardStatus status;

    private String nftName;

    private String consumer;

    private String enterprise;

    private LocalDateTime applicationDate;




    public static RBoardDto of(RealizationBoard realizationBoard) {

        return RBoardDto.builder()
                .status(realizationBoard.getStatus())
                .nftName(realizationBoard.getNft().getNftName())
                .consumer(realizationBoard.getConsumer().getRealname())
                .enterprise(realizationBoard.getEnterprise().getRealname())
                .applicationDate(realizationBoard.getApplicationDate())
                .build();
    }





}
