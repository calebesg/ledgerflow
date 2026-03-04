package calebesg.com.github.backend.controllers;

import calebesg.com.github.backend.domain.user.User;
import calebesg.com.github.backend.dto.LoginRequestDTO;
import calebesg.com.github.backend.dto.LoginResponseDTO;
import calebesg.com.github.backend.infrastructure.security.TokenService;
import calebesg.com.github.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        if (passwordEncoder.matches(body.password(), user.getPassword()) == false) {
            return ResponseEntity.badRequest().build();
        }

        String token = this.tokenService.createToken(user);
        return ResponseEntity.ok(new LoginResponseDTO(token, user.getEmail()));
    }

}
