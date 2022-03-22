package com.jpmp.db.entity.user;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;


import javax.persistence.*;
import java.util.Collection;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false , unique = true)
    private String nickname;

    @Column(nullable = false , unique = true)
    private String userName;

    @Column(nullable = false)
    private String password;


    private String phone;


    private String userRole;


    private String description;


    private String address;

    private String zipCode;


    private String profileImg;

    private String backgroundfileImg;


    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
}
