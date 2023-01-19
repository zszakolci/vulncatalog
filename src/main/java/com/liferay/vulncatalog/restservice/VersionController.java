package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Version;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("version")
public class VersionController {

	@GetMapping("/get-all")
	public List<Version> getAll() {
		return new LinkedList<Version>();
	}

	@GetMapping("/search")
	public List<Version> search(
		@RequestParam(value = "keyword", defaultValue = "") String keyword) {

		return new LinkedList<Version>();
	}
}
