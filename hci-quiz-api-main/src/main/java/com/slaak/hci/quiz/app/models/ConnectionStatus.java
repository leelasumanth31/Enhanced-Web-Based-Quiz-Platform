package com.slaak.hci.quiz.app.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class ConnectionStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "connection_status_id" )
    private Long connectionStatusId;
    @Column(name = "user_id", updatable = false, insertable = false)
    private Long userId;
    private boolean online;
    @CreatedDate
    private LocalDateTime start_ts;
    private LocalDateTime end_ts;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
}
