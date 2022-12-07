package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Ticket;
import com.liferay.vulncatalog.persistence.entity.Vulnerability;
import com.liferay.vulncatalog.persistence.repositories.TicketRepository;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SearchController {

	@Autowired
	public SearchController(TicketRepository ticketRepository){
		_ticketRepository = ticketRepository;
	}

	@GetMapping("/search")
	public List<Object> search(
		@RequestParam(value = "input", defaultValue = "") String input) {

		List<Vulnerability> vulnerabilities = new LinkedList();

		vulnerabilities.add(new Vulnerability("CVE-2021-33813",
			"https://nvd.nist.gov/vuln/detail/CVE-2021-33813", ""));
		vulnerabilities.add(new Vulnerability("CVE-2021-30468",
			"https://nvd.nist.gov/vuln/detail/CVE-2021-30468", ""));

		List<Ticket> tickets = new LinkedList();

		Ticket ticket1 = new Ticket("LPS-00001", "LPE-0001", "CVE-2021-33813", 1, "7.2.10", "7.2.x");
		ticket1.setId(1);
		tickets.add(ticket1);
		Ticket ticket2 = new Ticket("LPS-00002", "LPE-0002", "CVE-2021-30468", 2, "7.3.10", "7.3.x");
		ticket2.setId(2);
		tickets.add(ticket2);

		List<Object> result = new LinkedList();

		result.add(vulnerabilities);
		result.add(tickets);

		Ticket ticket = _ticketRepository.findById(1);
		System.out.println(ticket);
		System.out.println(ticket.getVulnerabilityid());

		return result;
	}

	private TicketRepository _ticketRepository;
}
