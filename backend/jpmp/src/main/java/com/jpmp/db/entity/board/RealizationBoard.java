package com.jpmp.db.entity.board;

import com.jpmp.db.entity.user.User;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;



@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class RealizationBoard  {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //처리현황
    @Enumerated(EnumType.STRING)
    private RBoardStatus status;


    //상품이름
    @Column(nullable = false )
    private String nftName;


    //토큰id
    @Column(nullable = false)
    private String nftId;

    //신청자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer", referencedColumnName = "id")
    private User consumer;

    //기업
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise", referencedColumnName = "id")
    private User enterprise;

    //이미지 경로
    private String nftImgUrl;

    //신청날짜
    private LocalDateTime applicationDate;

    protected void changeConsumer(User consumer) {
        consumer.getConsumerBoards().add(this);
        this.consumer = consumer;
    }

    protected void changeEnterprise(User enterprise) {
        enterprise.getConsumerBoards().add(this);
        this.enterprise = enterprise;
    }

    @Builder
    public RealizationBoard(String nftId, String nftName , String nftImgUrl ,  User consumer , User enterprise ) {
       this.status = RBoardStatus.STATUS_NOTADM;
       this.nftId = nftId;
       this.nftName = nftName;
       this.nftImgUrl = nftImgUrl;
       changeConsumer(consumer);
       changeEnterprise(enterprise);
       applicationDate = LocalDateTime.now();
    }

}