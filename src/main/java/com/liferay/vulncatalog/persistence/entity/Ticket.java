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
	@Column(name = "libraryId")
	private Integer libraryId;
	@Column(name = "affectedVersion")
	private String affectedVersion;
	@Column(name = "fixedVersion")
	private String fixedVersion;

	public Ticket() {
	}

	public Ticket(String ticketId, String lpeId, String lsvId,
		String vulnerabilityId, Integer libraryId, String affectedVersion,
		String fixedVersion) {

		this.ticketId = ticketId;
		this.lpeId = lpeId;
		this.lsvId = lsvId;
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
