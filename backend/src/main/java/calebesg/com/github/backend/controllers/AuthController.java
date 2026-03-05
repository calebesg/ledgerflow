package calebesg.com.github.backend.controllers;

import calebesg.com.github.backend.domain.user.User;
import calebesg.com.github.backend.dto.LoginRequestDTO;
import calebesg.com.github.backend.dto.AuthResponseDTO;
import calebesg.com.github.backend.dto.RegisterRequestDTO;
import calebesg.com.github.backend.infrastructure.security.TokenService;
import calebesg.com.github.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        User user = userRepository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Chegou na controller!");

        if (passwordEncoder.matches(body.password(), user.getPassword()) == false) {
            return ResponseEntity.badRequest().build();
        }

        String token = this.tokenService.createToken(user);
        return ResponseEntity.ok(new AuthResponseDTO(token, user.getEmail()));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = userRepository.findByEmail(body.email());

        if (user.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        User newUser = new User();
        newUser.setName(body.name());
        newUser.setEmail(body.email());
        newUser.setPassword(passwordEncoder.encode(body.password()));

        this.userRepository.save(newUser);

        String token = this.tokenService.createToken(newUser);
        return ResponseEntity.ok(new AuthResponseDTO(token, newUser.getName()));
    }
}
