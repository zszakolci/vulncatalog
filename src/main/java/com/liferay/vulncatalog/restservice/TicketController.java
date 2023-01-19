package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Ticket;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("ticket")
public class TicketController {

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
		return new LinkedList<Ticket>();
	}

	@GetMapping("/search")
	public List<Ticket> search(
		@RequestParam(value = "keyword", defaultValue = "") String keyword) {

		return new LinkedList<Ticket>();
	}
}

