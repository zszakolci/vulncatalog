package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Library;
import com.liferay.vulncatalog.persistence.entity.Ticket;
import com.liferay.vulncatalog.persistence.repositories.LibraryRepository;

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
@RequestMapping("library")
public class LibraryController {

	@Autowired
	LibraryRepository libraryRepository;

	@GetMapping("/add")
	public void add(@RequestParam(value = "name") String name) {
		Library library = new Library(name);

		libraryRepository.save(library);
	}

	@GetMapping("/get-all")
	public List<Library> getAll() {
		return libraryRepository.findAll();
	}

	@GetMapping("/search")
	public List<String> search(
		@RequestParam(value = "keyword") String keyword) {

		if (keyword == null || keyword == "") {
			return new LinkedList<String>();
		}

		List<Library> libraries =
			libraryRepository.findByNameContainingIgnoreCase(keyword);

		return libraries.stream().map(library -> library.getName()).collect(
			Collectors.toList());
	}
}
