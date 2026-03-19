package calebesg.com.github.backend.services;

import calebesg.com.github.backend.domain.entity.Organization;
import calebesg.com.github.backend.domain.entity.User;
import calebesg.com.github.backend.dto.OrganizationResponseDTO;
import calebesg.com.github.backend.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final UserService userService;

    public void createOrganization(String name, String reportTitle, String purpose, User user) {
        var organization = new Organization();
        organization.setName(name);
        organization.setReportTitle(reportTitle);
        organization.setPurpose(purpose);
        organization.setUser(user);

        organizationRepository.save(organization);
    }

    public OrganizationResponseDTO getOrganization() {
        var user = userService.getAuthenticatedUser();
        return OrganizationResponseDTO.fromEntity(organizationRepository.findOrganizationByUser_IdAndDeletedAtIsNull(user.getId()));
    }
}
