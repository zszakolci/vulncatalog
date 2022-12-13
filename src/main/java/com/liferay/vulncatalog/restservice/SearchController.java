package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Ticket;
import com.liferay.vulncatalog.persistence.entity.TicketVulnerabilityView;
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
	public List<TicketVulnerabilityView> search(
		@RequestParam(value = "input", defaultValue = "") String input) {

		List<TicketVulnerabilityView> tvs = new LinkedList();

		tvs.add(new TicketVulnerabilityView(1, "LPS-00001", "LPE-0001", "LSV-001", "CVE-2021-33813", 1, "7.2.10", "7.2.x", "https://nvd.nist.gov/vuln/detail/CVE-2021-33813", ""));
		tvs.add(new TicketVulnerabilityView(2, "LPS-00002", "LPE-0002", "LSV-002", "CVE-2021-30468", 2, "7.3.10", "7.3.x", "https://nvd.nist.gov/vuln/detail/CVE-2021-30468", "This is a description."));

/*
		Ticket ticket = _ticketRepository.findById(1);
		if (ticket != null) {
			System.out.println(ticket);
			System.out.println(ticket.getVulnerabilityid());
		}
*/
		return tvs;
	}

	private TicketRepository _ticketRepository;
}
