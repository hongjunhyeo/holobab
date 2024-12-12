package com.fieldtraining.notice.entity;

import java.util.ArrayList;
import java.util.List;

import com.fieldtraining.data.entity.User;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Notice {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardID;

    private String title;

    private String content;
  
    @Column(name = "writer_name")
    private String writerName;

    private String trainingDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private User writer;
    
//    @OneToMany(mappedBy = "Notice", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<NoticeFile> files = new ArrayList<>();
//    
//    @OneToMany(mappedBy = "Notice", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
//    private List<Comment> comments = new ArrayList<>();
//    
//    public void addComment(Comment comment) {
//        this.comments.add(comment); // PracticeBoard의 댓글 리스트에 추가
//        comment.setPracticeBoard(this); // Comment에서 PracticeBoard를 설정
//    }
}
