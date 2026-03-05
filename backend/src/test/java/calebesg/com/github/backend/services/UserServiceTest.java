package calebesg.com.github.backend.services;

import calebesg.com.github.backend.domain.user.User;
import calebesg.com.github.backend.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("Deve retornar um usuário recem criado!")
    public void deveRetornarUmUsuario() {
        User user = new User();
        user.setName("Maria");
        user.setEmail("maria@email.com");
        user.setPassword("1234ksldjfs");

        Mockito.when(userRepository.save(Mockito.any())).thenReturn(user);
        User createdUser = userService.createUser(user.getName(),  user.getEmail(), user.getPassword());

        assertNotNull(createdUser);
        assertEquals(user.getName(), createdUser.getName());
        assertEquals(user.getEmail(), createdUser.getEmail());
        assertEquals(user.getPassword(), createdUser.getPassword());
    }
}