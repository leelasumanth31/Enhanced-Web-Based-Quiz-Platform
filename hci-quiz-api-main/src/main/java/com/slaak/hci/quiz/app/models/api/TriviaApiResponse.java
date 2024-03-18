package com.slaak.hci.quiz.app.models.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class TriviaApiResponse {
    private String correctAnswer;
    private List<String> incorrectAnswers;
    private String question;
}
