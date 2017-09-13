package com.rpp.models;

import java.io.Serializable;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class StudentDao {

	@Autowired
	private SessionFactory _sessionFactory;

	private Session getSession() {
		return _sessionFactory.getCurrentSession();
	}
	
	public Student getStudent(Serializable studentId){
		Student student = getSession().get(Student.class, studentId);
		Hibernate.initialize(student);
		return student;
	}
	
	@SuppressWarnings("unchecked")
	public List<Student> getAll(){
		return getSession().createQuery("from Student").list();
	}
	
	public Serializable addStudent(Student student) {
		return getSession().save(student);
	}
	
	public void deleteStudent(Integer studentId){
		Object persistentStudent = getSession().load(Student.class, studentId);
		
		getSession().delete(persistentStudent);
	}
	
	public void updateStudent(Student student){
		getSession().update(student);
	}

}
