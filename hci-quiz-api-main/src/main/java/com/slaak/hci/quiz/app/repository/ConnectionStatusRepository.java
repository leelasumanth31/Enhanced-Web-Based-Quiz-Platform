package com.slaak.hci.quiz.app.repository;

import com.slaak.hci.quiz.app.models.ConnectionStatus;
import com.slaak.hci.quiz.app.models.Options;
import com.slaak.hci.quiz.app.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionStatusRepository extends JpaRepository<ConnectionStatus, Long> {
    @Query("select cs from ConnectionStatus cs "
            + "JOIN cs.user u "
            + "WHERE u.userName = :userName "
            + "AND cs.end_ts is null "
            + "AND u.end_ts is null")
    ConnectionStatus findActvConnectionStatus(String userName);
}
