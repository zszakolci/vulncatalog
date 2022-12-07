package com.liferay.vulncatalog.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.liferay.vulncatalog.persistence.entity.Library;

public interface LibraryRepository extends JpaRepository<Library, Long> {

  List<Library> findByName(String name);
}
