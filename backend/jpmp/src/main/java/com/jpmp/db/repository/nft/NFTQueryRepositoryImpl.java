package com.jpmp.db.repository.nft;


import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.nft.QNft;
import com.jpmp.db.entity.nft.QNftUserLike;
import com.jpmp.db.entity.user.QUser;
import com.jpmp.db.entity.user.User;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;


@Repository
@Transactional(readOnly = true)
public class NFTQueryRepositoryImpl extends QuerydslRepositorySupport implements NFTQueryRepository {

    private final JPAQueryFactory queryFactory;
    private QNft qnft = new QNft("nft");
    private QUser qUser = new QUser("quser");
    private QNftUserLike qNftUserLike = new QNftUserLike("qNftUserLike");
    private final EntityManager em;


    public NFTQueryRepositoryImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
        super(Nft.class);
        this.em = entityManager;
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Nft> findByNFTSearchDto(NFTSearchReqDto reqDto, Pageable pageable) {

        JPAQuery<Nft> query = queryFactory
                .select(qnft)
                .from(qnft)
                .where(eqNntName(reqDto.getKeyword()),
                        eqEnterprise(reqDto.getEnterprise()),
                        eqSeleOwner(reqDto.getOwnerIsEnterprise()),
                        qnft.price.between(reqDto.getMin(), reqDto.getMax())
                );





        return getQuerydsl().applyPagination(pageable ,query).fetch();
    }

    @Override
    public List<Nft> findByCoustomUserLikes(User userDetails) {
        return   queryFactory
                .select(qnft)
                .from(qnft)
                .where(qnft.in(
                        JPAExpressions
                        .select(qNftUserLike.nft)
                        .from(qNftUserLike)
                        .where(qNftUserLike.user.eq(userDetails)))
                ).fetch();
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
        return qnft.nftName.contains(name);
    }


    private BooleanExpression eqNntName(String name) {
        if ((name).equals("")) {
            return null;
        }
        return qnft.nftName.contains(name);
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
