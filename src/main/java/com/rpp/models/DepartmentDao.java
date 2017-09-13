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
public class DepartmentDao {

	@Autowired
	private SessionFactory _sessionFactory;

	private Session getSession() {
		return _sessionFactory.getCurrentSession();
	}
	
	public Department getDepartment(Serializable departmentId){
		return getSession().get(Department.class, departmentId);
	}
	
	@SuppressWarnings("unchecked")
	public List<Department> getAll(){
		return getSession().createQuery("from Department").list();
	}
	
	public Integer addDepartment(Department department) {
		return (Integer) getSession().save(department);
	}
	
	public void deleteDepartment(Integer departmentId){
		Object persistentDepartment = getSession().load(Department.class, departmentId);
		
		getSession().delete(persistentDepartment);
	}
	
	public void updateDepartment(Department department){
		getSession().update(department);
	}
}
