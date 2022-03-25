package com.jpmp.db.entity.user;


import com.jpmp.db.entity.board.RealizationBoard;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


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

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;



    private String phone;

    
    //https://lng1982.tistory.com/279 Enumerated 좋지 못한 방법
    @Enumerated(EnumType.STRING)
    private UserRole userRole;





    private String description;


    private String address1;

    private String address2;

    private String zipCode;


    private String profileImg;

    private String backgroundfileImg;

    @OneToMany(mappedBy = "consumer", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    private List<RealizationBoard> consumerBoards = new ArrayList<>();

    @OneToMany(mappedBy = "enterprise", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    private List<RealizationBoard> enterpriseBoards = new ArrayList<>();



    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "nft_like",joinColumns = @JoinColumn(name="id"))
    private List<String> likeList = new ArrayList<>();


    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public void changeUser(String address1, String address2, String description, String email, String nickname, String phone, String zipCode
                            ,String userName , String profileImg , String backgroundfileImg) {

        this.address1 = address1;
        this.address2 = address2;
        this.description = description;
        this.email = email;
        this.nickname = nickname;
        this.phone = phone;
        this.zipCode = zipCode;
        this.userRole = UserRole.ROLE_CONSUMER;
    }


}
