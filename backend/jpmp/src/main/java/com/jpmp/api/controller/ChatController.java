package com.jpmp.api.controller;

import com.jpmp.api.dto.request.chat.Message;
import com.jpmp.api.dto.response.chat.ChatResDto;
import com.jpmp.api.service.chat.ChatService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
@Api(tags = "채팅")
@Controller
public class ChatController {

    private final SimpMessagingTemplate template;

    @Autowired
    public ChatController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @Autowired
    ChatService chatService;

    @MessageMapping("/chat/join")
    public void join(Message message){
        message.setMessage(message.getSenderName() + "님이 입장하셨습니다.");
        template.convertAndSend("/subscribe/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat/message")
    public void message(Message message) {
        template.convertAndSend("/subscribe/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat/auction")
    public ChatResDto auction(Message message) {
        ChatResDto tmpDto = new ChatResDto();
        tmpDto.setRoomId(message.getRoomId());
        tmpDto.setSenderName(message.getSenderName());
        tmpDto.setCost(message.getCost());

        chatService.addCost(tmpDto);
        ChatResDto resDto = chatService.maxCost(tmpDto.getRoomId());

        return resDto;
    }


}
