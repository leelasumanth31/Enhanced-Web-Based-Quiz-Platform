package com.slaak.hci.quiz.app.mapper;

import com.slaak.hci.quiz.app.models.Questions;
import com.slaak.hci.quiz.app.models.api.TriviaApiResponse;
import com.slaak.quiz.api.model.Question;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper
@Component
@DecoratedWith(QuestionDecorator.class)
public interface QuestionMapper {

    @Mapping(target = "options.correct", ignore = true)
    Question toQuestionFromQuestions(Questions questions);

    Questions toQuestionsFromTriviaQuestion(TriviaApiResponse response);
}
