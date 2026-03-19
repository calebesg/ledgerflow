package calebesg.com.github.backend.services;

import calebesg.com.github.backend.domain.entity.Organization;
import calebesg.com.github.backend.domain.entity.User;
import calebesg.com.github.backend.dto.AuthResponseDTO;
import calebesg.com.github.backend.dto.RegisterRequestDTO;
import calebesg.com.github.backend.infrastructure.exception.InvalidCredentialsException;
import calebesg.com.github.backend.infrastructure.security.TokenService;
import calebesg.com.github.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final OrganizationService organizationService;

    public AuthResponseDTO login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String token = tokenService.createToken(user);
        return new AuthResponseDTO(token, user.getName());
    }

    public AuthResponseDTO register(RegisterRequestDTO registerDTO) {
        User user = userService.createUser(registerDTO.name(), registerDTO.email(), registerDTO.password());
        organizationService.createOrganization(registerDTO.organizationName(), registerDTO.reportTitle(), registerDTO.purpose(), user);

        String token = tokenService.createToken(user);
        return new AuthResponseDTO(token, user.getName());
    }
}
