package com.example.servicemate.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String role;
    private String serviceType;

    // Manual getters to be safe
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getRole() { return role; }
    public String getServiceType() { return serviceType; }
}