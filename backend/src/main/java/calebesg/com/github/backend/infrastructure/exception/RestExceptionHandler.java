package calebesg.com.github.backend.infrastructure.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.jspecify.annotations.Nullable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {UserNotFoundException.class})
    private ResponseEntity<RestErrorMessage> userNotFoundHandler(
            UserNotFoundException exception,
            HttpServletRequest request
    ) {
        return this.buildErrorResponse(HttpStatus.NOT_FOUND, exception.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(value = {InvalidCredentialsException.class})
    private ResponseEntity<RestErrorMessage> invalidCredentialsHandler(
            InvalidCredentialsException exception,
            HttpServletRequest request
    ) {
        return this.buildErrorResponse(HttpStatus.UNAUTHORIZED, exception.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(value = {TransactionNotFoundException.class})
    private ResponseEntity<RestErrorMessage> transactionNotFoundHandler(
            TransactionNotFoundException exception,
            HttpServletRequest request
    ) {
        return this.buildErrorResponse(HttpStatus.NOT_FOUND, exception.getMessage(), request.getRequestURI());
    }

    @Override
    protected @Nullable ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request
    ) {
        Map<String, String> errors = new HashMap<>();

        ex
                .getBindingResult()
                .getFieldErrors()
                .forEach((fieldError) -> errors.put(
                        fieldError.getField(),
                        fieldError.getDefaultMessage()
                ));

        String path = request.getDescription(false).replace("uri=", "");

        var errorMessage = new RestErrorMessage(
                LocalDateTime.now(),
                status.value(),
                status.toString(),
                "Erro de validacao",
                path,
                errors
        );

        return ResponseEntity.status(status).body(errorMessage);
    }

    private ResponseEntity<RestErrorMessage> buildErrorResponse(HttpStatus status, String message, String path) {
        var errorMessage = new RestErrorMessage(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                path
        );

        return ResponseEntity.status(status).body(errorMessage);
    }
}
