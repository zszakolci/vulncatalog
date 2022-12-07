package com.liferay.vulncatalog.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.liferay.vulncatalog.persistence.entity.Version;

public interface VersionRepository extends JpaRepository<Version, Long> {

}
