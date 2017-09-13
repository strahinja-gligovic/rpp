package com.rpp.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="status", schema="rpp")
public class Status implements Serializable {
	
	private static final long serialVersionUID = -7448057994415691246L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "auto_increment")
	@SequenceGenerator(name = "auto_increment", sequenceName = "rpp.auto_status", schema = "rpp")
	private Integer id;
	
	@Column
	private String name;
	
	@Column
	private String label;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}
