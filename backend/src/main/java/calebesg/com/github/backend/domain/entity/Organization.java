package calebesg.com.github.backend.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String purpose;
    private String reportTitle;
    private LocalDateTime deletedAt;

    @OneToOne
    private User user;
}
