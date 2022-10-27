package com.hingebridge.devops.dtos;

import lombok.Data;

@Data
public class MessageDTO {
    UserDTO userDTO;
    private String message;
}
