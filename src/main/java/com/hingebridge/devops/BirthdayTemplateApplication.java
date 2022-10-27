package com.hingebridge.devops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Birthday Application", version = "1.0", description = "Open API documentation"))
public class BirthdayTemplateApplication {
	public static void main(String[] args) {
		SpringApplication.run(BirthdayTemplateApplication.class, args);
	}
}