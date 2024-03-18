package com.slaak.hci.quiz.app.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class Options {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "option_id" )
    private Long optionId;
    @Column(name = "question_id", updatable = false, insertable = false)
    private Long questionId;
    @Column(name = "opt_value")
    private String value;
    @Column(name = "opt_selected")
    private boolean selected;
    @Column(name = "opt_correct")
    private boolean correct;
    @CreatedDate
    private LocalDateTime start_ts;
    private LocalDateTime end_ts;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Questions question;
}
