package com.liferay.vulncatalog.restservice;

import com.liferay.vulncatalog.persistence.entity.Ticket;
import com.liferay.vulncatalog.persistence.entity.TicketVulnerabilityView;
import com.liferay.vulncatalog.persistence.repositories.TicketRepository;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SearchController {

	@PersistenceContext
	private EntityManager entityManager;

	@GetMapping("/search")
	public List<Ticket> search(
		@RequestParam(value = "input", defaultValue = "") String input) {

		return getSearchResults(input);
	}

	public List<Ticket> getSearchResults(String term) {
		TypedQuery<Ticket> query = entityManager.createQuery(
			"SELECT t FROM Ticket t " +
			"JOIN t.vulnerabilities v " +
			"WHERE t.id LIKE '%" + term + "%' " +
			"OR v.id LIKE '%" + term + "%'",
			Ticket.class);

		List<Ticket> resultList = query.getResultList();

		return resultList;
	}
}
