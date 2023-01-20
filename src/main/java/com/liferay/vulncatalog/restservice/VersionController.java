package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Ticket;
import com.liferay.vulncatalog.persistence.entity.Version;
import com.liferay.vulncatalog.persistence.repositories.VersionRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("version")
public class VersionController {

	@Autowired
	private VersionRepository versionRepository;

	@GetMapping("/get-all")
	public List<String> getAll() {
		return versionRepository.findAll().stream().map(
			version -> version.getId()).collect(Collectors.toList());
	}

	@GetMapping("/search")
	public List<String> search(
		@RequestParam(value = "keyword") String keyword) {

		if (keyword == null || keyword == "") {
			return new LinkedList<String>();
		}

		List<Version> versions =
			versionRepository.findByIdContainingIgnoreCase(keyword);

		return versions.stream().map(version -> version.getId()).collect(
			Collectors.toList());
	}
}
