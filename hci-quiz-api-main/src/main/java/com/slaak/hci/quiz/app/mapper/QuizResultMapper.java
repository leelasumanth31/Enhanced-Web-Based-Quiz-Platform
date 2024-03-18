package com.slaak.hci.quiz.app.mapper;

import com.slaak.hci.quiz.app.models.Quiz;
import com.slaak.quiz.api.model.QuizResult;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface QuizResultMapper {
    QuizResult toQuizResultFromQuiz(Quiz quiz);
}
