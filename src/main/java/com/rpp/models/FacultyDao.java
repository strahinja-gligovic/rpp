package com.rpp.models;

import java.io.Serializable;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class FacultyDao {

	@Autowired
	private SessionFactory _sessionFactory;

	private Session getSession() {
		return _sessionFactory.getCurrentSession();
	}
	
	public Faculty getFaculty(Serializable facultyId){
		return getSession().get(Faculty.class, facultyId);
	}
	
	@SuppressWarnings("unchecked")
	public List<Faculty> getAll(){
		return getSession().createQuery("from Faculty").list();
	}
	
	public Integer addFaculty(Faculty faculty) {
		return (Integer) getSession().save(faculty);
	}
	
	public void deleteFaculty(Integer facultyId){
		Object persistentFaculty = getSession().load(Faculty.class, facultyId);
		
		if (persistentFaculty != null) {
			getSession().delete(persistentFaculty);
		}
	}
	
	public void updateFaculty(Faculty faculty){
		getSession().update(faculty);
	}
}
