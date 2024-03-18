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
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id" )
    private Long quizId;
    @Column(name = "user_id", updatable = false, insertable = false)
    private Long userId;
    @Column(name = "questions_total" )
    private Integer questionsTotal;
    @Column(name = "questions_correct" )
    private Integer questionsCorrect;
    @Column(name = "time_total" )
    private Integer timeTotal;
    @CreatedDate
    private LocalDateTime start_ts;
    private LocalDateTime end_ts;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "quiz")
    private Set<Questions> questions;
}
