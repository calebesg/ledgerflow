package calebesg.com.github.backend.infrastructure.exception;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {super(message);}
    public InvalidCredentialsException() {super("Invalid credentials!");}
}
