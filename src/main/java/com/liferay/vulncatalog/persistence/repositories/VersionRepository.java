package com.liferay.vulncatalog.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.liferay.vulncatalog.persistence.entity.Version;
import com.liferay.vulncatalog.persistence.entity.Vulnerability;

import java.util.List;

public interface VersionRepository extends JpaRepository<Version, Long> {

	List<Version> findByIdContainingIgnoreCase(String id);

	List<Version> findByIdIn(List<String> ids);
}
