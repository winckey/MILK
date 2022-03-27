package com.jpmp.config;


import com.jpmp.api.service.user.UserService;
import com.jpmp.common.auth.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final UserService userService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().sameOrigin();//X-Frame-Options 에러 해결
        http.httpBasic().disable()/// Http basic Auth  기반으로 로그인 인증창이 뜸.  disable 시에 인증창 뜨지 않음=> beara방식 // httpBasic 헤더에 anthorization키를 담아 넘기는 방식 이걸 암호하기위한 방식이 https
                .csrf().disable()// // rest api이므로 csrf 보안이 필요없으므로 disable처리.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                                                                                            // jwt token으로 인증하므로 stateless 하도록 처리.
                                                                                            // 세션을 사용하지않겠음
                .and()
                .addFilter(corsFilter)// cors 문제 관련 필터 설정(bean config로 등록하여 사용)
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), userService))//authenticationManager확인
                .authorizeRequests()
                .antMatchers("/api/users/login", "/api/users/social/**", "/api/users/id/**", "/api/users/nickname/**", "/api/users").permitAll() // 인증권한이 필요한 페이지.
                .antMatchers("/api/oauth/**").permitAll()
                .antMatchers("/static/res/**").permitAll()
                .antMatchers("/ws/**").permitAll()
                .antMatchers("/api/chat/message/**").permitAll()
                .anyRequest().permitAll()  // 나머지 모든 요청 허용  ( 생략 가능 )
                .and().cors();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs/**");
        web.ignoring().antMatchers("/swagger.json");
        web.ignoring().antMatchers("/swagger-ui/**");
        web.ignoring().antMatchers("/swagger-resources/**");
        web.ignoring().antMatchers("/webjars/**");
    }
}
