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
import com.rpp.models.Status;
import com.rpp.models.StatusDao;

@RestController
@RequestMapping("${api.base_url}status")
public class StatusApiController {
	
	@Autowired
	StatusDao statusDao;
	
	
	@RequestMapping("gets")
	public List<Status> getStatuses(){
		List<Status> statuses =  statusDao.getAll();
		
		return statuses;
	}
	
	@RequestMapping("get")
	public Status getStatus(@RequestParam(value = "statusId") Integer statusId){
		Status status = statusDao.getStatus(statusId);
		
		return status;
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteStatus(@RequestParam("statusId") Integer statusId){
		try {
			statusDao.deleteStatus(statusId);
		} catch (DataIntegrityViolationException exception) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(exception.getCause().getCause().getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Integer addStatus(@RequestBody Status status){
		statusDao.addStatus(status);
		
		return status.getId();
	}
	
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	public Status updateStatus(@RequestBody Status status){
		statusDao.updateStatus(status);
		
		return status;
	}

}
