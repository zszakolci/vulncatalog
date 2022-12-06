package com.liferay.vulncatalog.persistence.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Ticket {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String ticketId;
	private String lpeId;
	private String vulnerabilityId;
	private Integer libraryId;
	private String affectedVersion;
	private String fixedVersion;

	public Ticket() {
	}

	public Ticket(String ticketId, String lpeId, String vulnerabilityId,
		Integer libraryId, String affectedVersion, String fixedVersion) {

		this.ticketId = ticketId;
		this.lpeId = lpeId;
		this.vulnerabilityId = vulnerabilityId;
		this.libraryId = libraryId;
		this.affectedVersion = affectedVersion;
		this.fixedVersion = fixedVersion;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTicketid() {
		return ticketId;
	}

	public void setTicketid(String ticketId) {
		this.ticketId = ticketId;
	}

	public String getLpeid() {
		return lpeId;
	}

	public void setLpeid(String lpeId) {
		this.lpeId = lpeId;
	}

	public String getVulnerabilityid() {
		return vulnerabilityId;
	}

	public void setVulnerabilityid(String vulnerabilityId) {
		this.vulnerabilityId = vulnerabilityId;
	}

	public Integer getLibraryid() {
		return libraryId;
	}

	public void setLibraryid(Integer libraryId) {
		this.libraryId = libraryId;
	}

	public String getAffectedversion() {
		return affectedVersion;
	}

	public void setAffectedversion(String affectedVersion) {
		this.affectedVersion = affectedVersion;
	}

	public String getFixedversion() {
		return fixedVersion;
	}

	public void setFixedversion(String fixedVersion) {
		this.fixedVersion = fixedVersion;
	}

}
