package calebesg.com.github.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank(message = "E-mail Obrigatório")
        String email,
        @NotBlank(message = "Senha Obrigatória")
        String password) {
}
