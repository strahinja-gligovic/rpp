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
import com.rpp.models.Faculty;
import com.rpp.models.FacultyDao;

@RestController
@RequestMapping("${api.base_url}faculty")
public class FacultyApiController{

	@Autowired
	FacultyDao facultyDao;

	@RequestMapping("gets")
	public List<Faculty> getFaculties() {
		List<Faculty> faculties = facultyDao.getAll();

		return faculties;
	}

	@RequestMapping("get")
	public Faculty getFaculty(@RequestParam(value = "facultyId") Integer facultyId) {
		Faculty faculty = facultyDao.getFaculty(facultyId);

		return faculty;
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	public ResponseEntity deleteFaculty(@RequestParam("facultyId") Integer facultyId) {
		try {
			facultyDao.deleteFaculty(facultyId);
		} catch (DataIntegrityViolationException exception) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(exception.getCause().getCause().getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Integer addFaculty(@RequestBody Faculty faculty) {
		facultyDao.addFaculty(faculty);

		return faculty.getId();
	}

	@RequestMapping(value = "update", method = RequestMethod.PUT)
	public Faculty updateFaculty(@RequestBody Faculty faculty) {
		facultyDao.updateFaculty(faculty);

		return faculty;
	}
}
