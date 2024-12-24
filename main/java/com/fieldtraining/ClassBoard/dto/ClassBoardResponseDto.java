package com.fieldtraining.ClassBoard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor 
public class ClassBoardResponseDto {
	
	private Long boardID;  
    private String title;
    private String writerName;  
    private String date;

}
