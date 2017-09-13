package com.rpp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="faculty", schema="rpp")
public class Faculty {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="auto_increment")
	@SequenceGenerator(name = "auto_increment", sequenceName = "rpp.auto_faculty", schema = "rpp")
	private Integer id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="seat")
	private String seat;

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

	public String getSeat() {
		return seat;
	}

	public void setSeat(String seat) {
		this.seat = seat;
	}

}
