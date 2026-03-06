package calebesg.com.github.backend.infrastructure.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException(String message) {super(message);}
    public InvalidPasswordException() {super("Invalid Password!");}
}
