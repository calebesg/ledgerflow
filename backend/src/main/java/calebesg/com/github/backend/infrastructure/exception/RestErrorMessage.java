package calebesg.com.github.backend.infrastructure.exception;

import org.springframework.http.HttpStatus;

public record RestErrorMessage(HttpStatus status, String message) {
}
