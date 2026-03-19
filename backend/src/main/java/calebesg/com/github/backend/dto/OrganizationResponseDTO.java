package calebesg.com.github.backend.dto;

import calebesg.com.github.backend.domain.entity.Organization;

public record OrganizationResponseDTO (
        String organizationName,
        String purpose, String
        reportTitle,
        Long id ){

    public static OrganizationResponseDTO fromEntity ( Organization organization ){
        return new OrganizationResponseDTO(
                organization.getName(),
                organization.getPurpose(),
                organization.getReportTitle(),
                organization.getId()
        );
    }
}
