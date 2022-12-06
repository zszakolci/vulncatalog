package com.liferay.vulncatalog.persistence.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Version {

	@Id
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
}
