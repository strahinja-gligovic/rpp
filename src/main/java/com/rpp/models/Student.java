package com.rpp.models;

import java.io.Serializable;
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
@Table(name="student", schema="rpp")
public class Student implements Serializable {
	
	private static final long serialVersionUID = -1662622072418150259L;

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="auto_increment")
	@SequenceGenerator(name = "auto_increment", sequenceName = "rpp.auto_student", schema = "rpp")
	private Integer id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="index_number")
	private String indexNumber;
	
	@ManyToOne(optional = true)
	@JoinColumn(name="status")
	private Status status;
	
	@ManyToOne(optional = true)
	@JoinColumn(name="department", nullable = true)
	private Department department;

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

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getIndexNumber() {
		return indexNumber;
	}

	public void setIndexNumber(String indexNumber) {
		this.indexNumber = indexNumber;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
}
