package com.slaak.hci.quiz.app.service;

import com.slaak.hci.quiz.app.mapper.QuestionMapper;
import com.slaak.hci.quiz.app.mapper.QuizResultMapper;
import com.slaak.hci.quiz.app.models.ConnectionStatus;
import com.slaak.hci.quiz.app.models.Questions;
import com.slaak.hci.quiz.app.models.Quiz;
import com.slaak.hci.quiz.app.models.Users;
import com.slaak.hci.quiz.app.models.api.TriviaApiResponse;
import com.slaak.hci.quiz.app.repository.*;
import com.slaak.quiz.api.model.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepo;
    private final QuizRepository quizRepo;
    private final UsersRepository userRepo;
    private final OptionRepository optionRepo;

    private final ConnectionStatusRepository connectionStatusRepo;
    private final QuestionMapper questionMapper;
    private final QuizResultMapper quizResultMapper;

    public QuizResult getQuizResult(final String userName) {
        final var quiz = quizRepo.findActvQuiz(userName);
        final var results = quizResultMapper.toQuizResultFromQuiz(quiz);
        results.getQuestions().sort(Comparator.comparing(Question::getQuestionNum));
        return results;
    }

    public QuizQuestions postQuestions(final String userName) {
        final var triviaQuestions = callTriviaApi();

        if (triviaQuestions.isEmpty()) {
            return new QuizQuestions();
        }

        final var user = getUser(userName);

        archivePrevQuiz(userName);

        final var quiz = new Quiz();
        quiz.setQuestionsTotal(triviaQuestions.size());
        quiz.setUser(user);
        quiz.setQuestionsCorrect(0);
        quiz.setTimeTotal(0);
        quiz.setStart_ts(LocalDateTime.now());

        final var savedQuiz = quizRepo.save(quiz);
        int questionNum = 1;

        for (Questions question : triviaQuestions) {
            question.setQuiz(savedQuiz);
            question.setQuestionNum(questionNum);
            question.setStart_ts(LocalDateTime.now());
            questionNum++;
        }

        updateConnectionStatus(user,true);

        final var savedQuestions = questionRepo.saveAll(triviaQuestions);
        savedQuestions.sort(Comparator.comparing(Questions::getQuestionNum));

        final var quizQuestions = new QuizQuestions();
        quizQuestions.setQuizId(savedQuiz.getQuizId());
        quizQuestions.setQuestions(savedQuestions.stream()
                .map(questionMapper::toQuestionFromQuestions).collect(Collectors.toList()));

        return quizQuestions;
    }

    public void putAnswers(final String userName, final SubmitAnswers answers) {
        int correct = 0;
        for (Answer answer : answers.getAnswers().stream().filter(Objects::nonNull).toList()) {
            final var optionOpt = optionRepo.findById(answer.getOptionId());
            if (optionOpt.isPresent()) {
                final var option = optionOpt.get();
                option.setSelected(true);
                optionRepo.save(option);
                if (option.isCorrect()) {
                    correct++;
                }
            }

        }

        final var quiz = quizRepo.findActvQuiz(userName);
        quiz.setQuestionsCorrect(correct);
        quiz.setTimeTotal(answers.getTimeTaken());
        quizRepo.save(quiz);
    }

    private List<Questions> callTriviaApi() {
        RestTemplate restTemplate = new RestTemplate();
        final var resp = restTemplate
                .getForObject("https://the-trivia-api.com/api/questions?limit=20&region=US&difficulty=medium&tags"
                        + "=computing,mathematics,physics,technology", TriviaApiResponse[].class);

        if (resp == null) {
            return List.of();
        }

        final var list =  Arrays.stream(resp).map(questionMapper::toQuestionsFromTriviaQuestion)
                .collect(Collectors.toList());

        Collections.shuffle(list);

        return list;
    }

    private Users getUser(final String userName) {
        var user = userRepo.findActiveUser(userName);

        if (user == null) {
            user = new Users();
            user.setUserName(userName);
            user.setStart_ts(LocalDateTime.now());

            user = userRepo.save(user);
        }

        return user;
    }
    public ConnectionStatusResponse getConnectionStatus(String userName){
        var connectionStatus = connectionStatusRepo.findActvConnectionStatus(userName);
        ConnectionStatusResponse connectionStatusResponse = new ConnectionStatusResponse();
        connectionStatusResponse.setStatus(connectionStatus.isOnline());

        return connectionStatusResponse;
    }

    public void toggleConnectionStatus(String userName) {
        var connectionStatus = connectionStatusRepo.findActvConnectionStatus(userName);

        if (connectionStatus.isOnline()) {
            connectionStatus.setOnline(false);
        }
        else {
            connectionStatus.setOnline(true);
        }

        connectionStatusRepo.save(connectionStatus);
    }
    private void updateConnectionStatus(final Users user, final boolean isOnline) {
        final var connectionStatus = connectionStatusRepo.findActvConnectionStatus(user.getUserName());

        if (connectionStatus != null) {
            connectionStatus.setEnd_ts(LocalDateTime.now());
            connectionStatusRepo.save(connectionStatus);
        }

        final var newStatus = new ConnectionStatus();
        newStatus.setUser(user);
        newStatus.setOnline(isOnline);
        newStatus.setStart_ts(LocalDateTime.now());
        connectionStatusRepo.save(newStatus);
    }

    private void archivePrevQuiz(final String userName) {
        final var prevQuiz = quizRepo.findActvQuiz(userName);

        if (prevQuiz != null) {
            prevQuiz.setEnd_ts(LocalDateTime.now());
            quizRepo.save(prevQuiz);
        }
    }

}
