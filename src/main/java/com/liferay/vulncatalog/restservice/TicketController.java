package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Ticket;
import com.liferay.vulncatalog.persistence.repositories.TicketRepository;

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

	@GetMapping("/add")
	public void add(@RequestParam(value = "ticketId") String ticketId,
		@RequestParam(value = "lpeId") String lpeId,
		@RequestParam(value = "lsvId") String lsvId,
		@RequestParam(value = "vulnerabilityId") String vulnerabilityId,
		@RequestParam(value = "libraryId") Integer libraryId,
		@RequestParam(value = "affectedVersion") String affectedVersion,
		@RequestParam(value = "fixedVersion") String fixedVersion) {

		System.out.print(ticketId + " " + lpeId);
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
			ticketRepository.findByTicketIdContainingIgnoreCase(keyword);

		return tickets.stream().map(ticket -> ticket.getTicketId()).collect(
			Collectors.toList());
	}
}

