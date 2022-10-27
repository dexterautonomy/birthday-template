package com.hingebridge.devops.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1")
public class HomeController {
	
	@GetMapping("home")
	public String homepage() {
		return "pages/home";
	}
}