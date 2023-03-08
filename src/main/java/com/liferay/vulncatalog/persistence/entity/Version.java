package com.liferay.vulncatalog.persistence.entity;

import com.liferay.vulncatalog.persistence.entity.Ticket;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Version {

	@Id
	private String id;

	@ManyToMany(mappedBy = "affectedVersions")
	private List<Ticket> affects;

	@ManyToMany(mappedBy = "fixedVersions")
	private List<Ticket> fixes;

	public Version() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
}
