package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Ticket;
import com.liferay.vulncatalog.persistence.entity.Version;
import com.liferay.vulncatalog.persistence.entity.Vulnerability;
import com.liferay.vulncatalog.persistence.repositories.TicketRepository;
import com.liferay.vulncatalog.persistence.repositories.VersionRepository;
import com.liferay.vulncatalog.persistence.repositories.VulnerabilityRepository;

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
@RequestMapping("ticket")
public class TicketController {

	@Autowired
	TicketRepository ticketRepository;

	@Autowired
	VersionRepository versionRepository;

	@Autowired
	VulnerabilityRepository vulnerabilityRepository;

	@GetMapping("/add")
	public void add(@RequestParam(value = "id") String id,
		@RequestParam(value = "lpeId") String lpeId,
		@RequestParam(value = "lsvId") String lsvId,
		@RequestParam(value = "library") String library,
		@RequestParam(value = "vulnerabilityIds") List<String> vulnerabilityIds,
		@RequestParam(value = "affectedVersions") List<String> affectedVersions,
		@RequestParam(value = "fixedVersions") List<String> fixedVersions) {

		List<Vulnerability> vulnerabilities =
			vulnerabilityRepository.findByIdIn(vulnerabilityIds);

		List<Version> affected =
			versionRepository.findByIdIn(affectedVersions);

		List<Version> fixed =
			versionRepository.findByIdIn(affectedVersions);

		Ticket ticket = new Ticket(id, lpeId, lsvId, library, vulnerabilities,
			affected, fixed);

		ticketRepository.save(ticket);
	}

	@GetMapping("/get-all")
	public List<Ticket> getAll() {
		return ticketRepository.findAll();
	}

	@GetMapping("/search")
	public List<String> search(
		@RequestParam(value = "keyword") String keyword) {

		if (keyword == null || keyword == "") {
			return new LinkedList<String>();
		}

		List<Ticket> tickets =
			ticketRepository.findByIdContainingIgnoreCase(keyword);

		return tickets.stream().map(ticket -> ticket.getId()).collect(
			Collectors.toList());
	}
}

