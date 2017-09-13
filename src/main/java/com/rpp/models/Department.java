package com.rpp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="department", schema="rpp")
public class Department {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="auto_increment")
	@SequenceGenerator(name = "auto_increment", sequenceName = "rpp.auto_department", schema = "rpp")
	private Integer id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="label")
	private String label;
	
	@ManyToOne
	@JoinColumn(name = "faculty")
	private Faculty faculty;

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

	public Faculty getFaculty() {
		return faculty;
	}

	public void setFaculty(Faculty faculty) {
		this.faculty = faculty;
	}
}
