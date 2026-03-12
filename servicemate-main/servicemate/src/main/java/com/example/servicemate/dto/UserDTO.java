package com.example.servicemate.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String name;
    private String email;
    private String password;
    private String role;
    private String phone;
    private String serviceType;
}