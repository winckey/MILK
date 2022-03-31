package com.jpmp.db.repository.nft;


import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.NFT;
import com.jpmp.db.entity.nft.QNFT;
import com.jpmp.db.entity.user.User;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;


@Repository
@Transactional(readOnly = true)
public class NFTQueryRepositoryImpl extends QuerydslRepositorySupport implements NFTQueryRepository{

    private final JPAQueryFactory queryFactory;
    private QNFT qnft = new QNFT("nft1");
    private final EntityManager em;


    public NFTQueryRepositoryImpl(JPAQueryFactory queryFactory , EntityManager entityManager) {
        super(NFT.class);
        this.em = entityManager;
        this.queryFactory = queryFactory;
    }

    @Override
    public List<NFT> findByNFTSearchDto(NFTSearchReqDto reqDto, Pageable pageable) {

        return (List<NFT>) queryFactory
                .select(qnft)
                .from(qnft)
                .where(eqNntName(reqDto.getKeyword()),
                        eqEnterprise(reqDto.getEnterprise()),
                        eqSeleOwner(reqDto.getOwnerIsEnterprise()),
                        qnft.price.between(reqDto.getMin() , reqDto.getMax())
                ).fetch();

        //List<NFT> result = getQuerydsl().applyPagination(pageable, jpaQuery).fetch();


       // return result;
    }

    private <T> Predicate condition(T value, Function<T, Predicate> function) {
        return Optional.ofNullable(value)
                .map(function)
                .orElse(null);
    }

    private BooleanExpression asd(String name) {
        if ((name).equals("")) {
            return null;
        }
        return qnft.nftName.eq(name);
    }




    private BooleanExpression eqNntName(String name) {
        if ((name).equals("")) {
            return null;
        }
        return qnft.nftName.eq(name);
    }

    private BooleanExpression eqEnterprise(User enterprise) {
        if ((enterprise == null)) {
            return null;
        }
        return qnft.enterprise.eq(enterprise);
    }

    private BooleanExpression eqSeleOwner(Boolean seleOwner) {
        if ((seleOwner == null)) {
            return null;
        }
        return qnft.ownerIsEnterprise.eq(seleOwner);
    }
}
