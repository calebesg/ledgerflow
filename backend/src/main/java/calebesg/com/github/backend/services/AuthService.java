package calebesg.com.github.backend.services;

import calebesg.com.github.backend.domain.user.User;
import calebesg.com.github.backend.dto.AuthResponseDTO;
import calebesg.com.github.backend.infrastructure.security.TokenService;
import calebesg.com.github.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthResponseDTO login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Wrong password!");
        }

        String token = tokenService.createToken(user);
        return new AuthResponseDTO(token, user.getName());
    }

    public AuthResponseDTO register(String name, String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            throw new RuntimeException("User with email already exists!");
        }

        if (password.length() < 6) {
            throw new RuntimeException("Password too short!");
        }

        var newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));

        userRepository.save(newUser);
        String token = tokenService.createToken(newUser);

        return new AuthResponseDTO(token, newUser.getName());
    }
}
