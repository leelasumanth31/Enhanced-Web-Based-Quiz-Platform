package com.slaak.hci.quiz.app.mapper;

import com.slaak.hci.quiz.app.models.Options;
import com.slaak.hci.quiz.app.models.Questions;
import com.slaak.hci.quiz.app.models.api.TriviaApiResponse;
import com.slaak.quiz.api.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.time.LocalDateTime;
import java.util.HashSet;

public class QuestionDecorator implements QuestionMapper {

    @Autowired
    @Qualifier("delegate")
    private QuestionMapper mapper;

    @Override
    public Question toQuestionFromQuestions(Questions questions) {
        return mapper.toQuestionFromQuestions(questions);
    }

    @Override
    public Questions toQuestionsFromTriviaQuestion(TriviaApiResponse response) {
        final var question = mapper.toQuestionsFromTriviaQuestion(response);
        question.setOptions(new HashSet<>());

        // set the correct answer
        final var option = new Options();
        option.setQuestion(question);
        option.setValue(response.getCorrectAnswer());
        option.setCorrect(true);
        option.setStart_ts(LocalDateTime.now());
        question.getOptions().add(option);

        // set the incorrect ones
        response.getIncorrectAnswers().forEach(answer -> {
            final var wrongOption = new Options();
            wrongOption.setValue(answer);
            wrongOption.setQuestion(question);
            wrongOption.setCorrect(false);
            wrongOption.setStart_ts(LocalDateTime.now());
            question.getOptions().add(wrongOption);
        });

        return question;
    }
}
