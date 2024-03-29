package com.liferay.vulncatalog.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Ticket {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column(name = "ticketId")
	private String ticketId;
	@Column(name = "lpeId")
	private String lpeId;
	@Column(name = "lsvId")
	private String lsvId;
	@Column(name = "vulnerabilityId")
	private String vulnerabilityId;
	@Column(name = "library")
	private String library;
	@Column(name = "affectedVersion")
	private String affectedVersion;
	@Column(name = "fixedVersion")
	private String fixedVersion;

	public Ticket() {
	}

	public Ticket(String ticketId, String lpeId, String lsvId,
		String vulnerabilityId, String library, String affectedVersion,
		String fixedVersion) {

		this.ticketId = ticketId;
		this.lpeId = lpeId;
		this.lsvId = lsvId;
		this.vulnerabilityId = vulnerabilityId;
		this.library = library;
		this.affectedVersion = affectedVersion;
		this.fixedVersion = fixedVersion;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTicketId() {
		return ticketId;
	}

	public void setTicketId(String ticketId) {
		this.ticketId = ticketId;
	}

	public String getLpeId() {
		return lpeId;
	}

	public void setLpeId(String lpeId) {
		this.lpeId = lpeId;
	}

	public String getLsvId() {
		return lsvId;
	}

	public void setLsvId(String lsvId) {
		this.lsvId = lsvId;
	}

	public String getVulnerabilityId() {
		return vulnerabilityId;
	}

	public void setVulnerabilityId(String vulnerabilityId) {
		this.vulnerabilityId = vulnerabilityId;
	}

	public String getLibrary() {
		return library;
	}

	public void setLibrary(String library) {
		this.library = library;
	}

	public String getAffectedVersion() {
		return affectedVersion;
	}

	public void setAffectedVersion(String affectedVersion) {
		this.affectedVersion = affectedVersion;
	}

	public String getFixedVersion() {
		return fixedVersion;
	}

	public void setFixedVersion(String fixedVersion) {
		this.fixedVersion = fixedVersion;
	}

}
