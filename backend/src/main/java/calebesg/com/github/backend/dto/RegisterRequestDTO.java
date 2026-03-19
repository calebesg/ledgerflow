package calebesg.com.github.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDTO(
        @NotBlank(message = "Nome é obrigatório")
        String name,
        @NotBlank(message = "E-mail é obrigatório")
        String email,
        @NotBlank(message = "Senha é obrigatória")
        String password,
        @NotBlank(message = "Nome da organização é obrigatório")
        String organizationName,
        @NotBlank(message = "Propósito da organização é obrigatório")
        String purpose,
        @NotBlank(message = "Título do relatório é obrigatório")
        String reportTitle) {
}
