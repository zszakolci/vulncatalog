package com.liferay.vulncatalog.persistence.entity;

import com.liferay.vulncatalog.persistence.entity.Version;
import com.liferay.vulncatalog.persistence.entity.Vulnerability;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Ticket {

	@Id
	@Column(name = "id")
	private String id;
	@Column(name = "lpeId")
	private String lpeId;
	@Column(name = "lsvId")
	private String lsvId;
	@Column(name = "library")
	private String library;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
		name = "ticket_affectedversion",
		joinColumns = @JoinColumn(name = "ticketId"),
		inverseJoinColumns = @JoinColumn(name = "affectedVersion"))
	private List<Version> affectedVersions;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
		name = "ticket_fixedversion",
		joinColumns = @JoinColumn(name = "ticketId"), 
		inverseJoinColumns = @JoinColumn(name = "fixedVersion"))
	private List<Version> fixedVersions;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
		name = "ticket_vulnerability",
		joinColumns = @JoinColumn(name = "ticketId"), 
		inverseJoinColumns = @JoinColumn(name = "vulnerabilityId"))
	private List<Vulnerability> vulnerabilities;

	public Ticket() {
	}

	public Ticket(String id, String lpeId, String lsvId, String library,
		List<Vulnerability> vulnerabilities, List<Version> affectedVersions,
		List<Version> fixedVersions) {

		this.id = id;
		this.lpeId = lpeId;
		this.lsvId = lsvId;
		this.library = library;
		this.vulnerabilities = vulnerabilities;
		this.affectedVersions = affectedVersions;
		this.fixedVersions = fixedVersions;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getLibrary() {
		return library;
	}

	public void setLibrary(String library) {
		this.library = library;
	}

	public List<Version> getAffectedVersions() {
		return affectedVersions;
	}

	public void setAffectedVersions(List<Version> affectedVersions) {
		this.affectedVersions = affectedVersions;
	}

	public List<Version> getFixedVersions() {
		return fixedVersions;
	}

	public void setFixedVersions(List<Version> fixedVersions) {
		this.fixedVersions = fixedVersions;
	}

	public List<Vulnerability> getVulnerabilities() {
		return vulnerabilities;
	}

	public void setVulnerabilities(List<Vulnerability> vulnerabilities) {
		this.vulnerabilities = vulnerabilities;
	}

}
