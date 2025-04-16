package com.example.To_Do_List.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskSearchRequest {
    private String title;
    private String description;
    private String status;
    private Long id;
}
