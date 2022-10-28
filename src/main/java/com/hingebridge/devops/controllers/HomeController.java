package com.hingebridge.devops.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@RequestMapping("api/v1")
public class HomeController {
	
	@GetMapping("home")
	public String homepage(HttpServletRequest request) {
		log.info("--->> Incoming request remote addr: {}", request.getRemoteAddr());
		return "pages/home";
	}
}