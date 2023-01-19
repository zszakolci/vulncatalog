package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Library;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("library")
public class LibraryController {

	@GetMapping("/add")
	public void add(@RequestParam(value = "name") String name) {
		System.out.println(name);
	}

	@GetMapping("/get-all")
	public List<Library> getAll() {
		return new LinkedList<Library>();
	}

	@GetMapping("/search")
	public List<Library> search(
		@RequestParam(value = "keyword", defaultValue = "") String keyword) {

		return new LinkedList<Library>();
	}
}
