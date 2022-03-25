package com.jpmp.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

//@Configuration
//@EnableRedisHttpSession
// yml에 redis 설정 추가
public class SessionConfig extends AbstractHttpSessionApplicationInitializer {

    @Bean
    public LettuceConnectionFactory connectionFactory() {
        return new LettuceConnectionFactory("127.0.0.1", 8081); // ip, port
    }

}