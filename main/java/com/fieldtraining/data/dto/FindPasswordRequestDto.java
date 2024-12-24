package com.fieldtraining.data.dto;

import lombok.Data;

@Data
public class FindPasswordRequestDto {
   private String userId;
   private String email;
   private String newPassword;
}
