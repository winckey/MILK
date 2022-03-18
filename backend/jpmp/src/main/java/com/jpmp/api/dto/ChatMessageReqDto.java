package com.jpmp.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageReqDto {
    @NotNull
    private String chatRoomId;
    @NotNull
    private String writerId;
    @NotNull
    private String writerName;
    @NotNull
    private String message;
    @NotNull
    private String receiverId;

}
