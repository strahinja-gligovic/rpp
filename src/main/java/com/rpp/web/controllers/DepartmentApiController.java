package com.rpp.web.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.rpp.models.Department;
import com.rpp.models.DepartmentDao;

@RestController
@RequestMapping("${api.base_url}department")
public class DepartmentApiController {
	
	@Autowired
	DepartmentDao departmentDao;
	
	
	@RequestMapping("gets")
	public List<Department> getDepartmentes(){
		List<Department> departments =  departmentDao.getAll();
		
		return departments;
	}
	
	@RequestMapping("get")
	public Department getDepartment(@RequestParam(value = "departmentId") Integer departmentId){
		Department department = departmentDao.getDepartment(departmentId);
		
		return department;
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteDepartment(@RequestParam("departmentId") Integer departmentId){
		try {
			departmentDao.deleteDepartment(departmentId);
		} catch (DataIntegrityViolationException exception) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(exception.getCause().getCause().getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Integer addDepartment(@RequestBody Department department){
		departmentDao.addDepartment(department);
		
		return department.getId();
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	public Department updateDepartment(@RequestBody Department department){
		departmentDao.updateDepartment(department);
		Department persisted  = getDepartment(department.getId());
		
		return persisted;
	}

}
