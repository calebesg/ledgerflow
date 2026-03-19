package calebesg.com.github.backend.repositories;

import calebesg.com.github.backend.domain.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Organization findOrganizationByUser_IdAndDeletedAtIsNull(String userId);
}
