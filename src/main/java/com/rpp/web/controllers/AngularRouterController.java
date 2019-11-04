package com.rpp.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AngularRouterController {

	@RequestMapping({ "/student", "/department", "/status", "faculty" })
	public String index() {
	    return "forward:/index.html";
	}
	
	@RequestMapping(value = "/{[path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    } 
}
