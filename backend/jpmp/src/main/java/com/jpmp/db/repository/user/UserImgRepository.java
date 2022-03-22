package com.jpmp.db.repository.user;


import com.jpmp.db.entity.user.UserImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface UserImgRepository extends JpaRepository<UserImg, Long> {



}