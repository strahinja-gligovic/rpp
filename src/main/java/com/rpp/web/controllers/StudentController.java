package com.rpp.web.controllers;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.rpp.models.Student;
import com.rpp.models.StudentDao;

@RestController
@RequestMapping("student")
public class StudentController {
	
	@Autowired
	StudentDao studentDao;
	
	
	@RequestMapping("gets")
	public List<Student> getStudentes(){
		List<Student> students =  studentDao.getAll();
		
		return students;
	}
	
	@RequestMapping("get")
	public Student getStudent(@RequestParam(value = "studentId") Integer studentId){
		Student student = studentDao.getStudent(studentId);
		
		return student;
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	public void deleteStudent(@RequestParam("studentId") Integer studentId){
		studentDao.deleteStudent(studentId);
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Student addStudent(@RequestBody Student student){
		Serializable studentId = studentDao.addStudent(student);
		Student persisted  = getStudent((Integer) studentId);
		
		return persisted;
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	public Student updateStudent(@RequestBody Student student){
		studentDao.updateStudent(student);
		
		return student;
	}

}
