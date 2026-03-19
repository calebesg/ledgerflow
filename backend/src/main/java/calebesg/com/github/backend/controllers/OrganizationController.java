package calebesg.com.github.backend.controllers;

import calebesg.com.github.backend.dto.OrganizationResponseDTO;
import calebesg.com.github.backend.services.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/organization")
public class OrganizationController {
    private final OrganizationService organizationService;

    @GetMapping("/")
    public ResponseEntity<OrganizationResponseDTO> getOrganization() {
        return ResponseEntity.ok(organizationService.getOrganization());
    }
}
