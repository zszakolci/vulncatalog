package com.liferay.vulncatalog.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.liferay.vulncatalog.persistence.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

  List<Ticket> findByTicketId(String ticketId);

  Ticket findById(int id);
}