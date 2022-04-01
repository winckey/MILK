package com.jpmp.api.dto.response.chat;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
public class ChatResDto {
    private int roomId;
    private String senderName;
    private int cost;
}
