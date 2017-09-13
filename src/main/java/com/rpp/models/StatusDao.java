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
public class StatusDao {
	
	@Autowired
	private SessionFactory _sessionFactory;

	private Session getSession() {
		return _sessionFactory.getCurrentSession();
	}
	
	public Status getStatus(Serializable statusId){
		return getSession().get(Status.class, statusId);
	}
	
	@SuppressWarnings("unchecked")
	public List<Status> getAll(){
		return getSession().createQuery("from Status").list();
	}
	
	public Integer addStatus(Status status) {
		return (Integer) getSession().save(status);
	}
	
	public void deleteStatus(Serializable statusId){
		Object persistentStatus = getSession().load(Status.class, statusId);
		
		getSession().delete(persistentStatus);
	}
	
	public void updateStatus(Status status){
		getSession().update(status);
	}

}
