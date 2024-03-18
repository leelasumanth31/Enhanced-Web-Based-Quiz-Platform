package com.slaak.hci.quiz.app.repository;

import com.slaak.hci.quiz.app.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsersRepository extends JpaRepository<Users, Long> {

    @Query("select u from Users u "
            + "WHERE u.userName = :userName "
            + "AND u.end_ts is null")
    Users findActiveUser(String userName);
}
