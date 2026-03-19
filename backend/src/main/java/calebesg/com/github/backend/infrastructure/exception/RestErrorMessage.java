package calebesg.com.github.backend.infrastructure.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.Map;

public record RestErrorMessage(
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        String path,
        Map<String, String> fieldErrors) {

        public RestErrorMessage (
                @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
                LocalDateTime timestamp,
                int status,
                String error,
                String message,
                String path
        ) {
                this(timestamp, status, error, message, path, null);
        }
}
