package com.slaak.hci.quiz.app.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "question_Id")
    private Long questionId;
    @Column(name = "quiz_id", updatable = false, insertable = false)
    private Long quizId;
    private String question;
    @Column(name = "question_num")
    private Integer questionNum;
    @CreatedDate
    private LocalDateTime start_ts;
    private LocalDateTime end_ts;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "question")
    private Set<Options> options;
}