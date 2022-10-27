package com.hingebridge.devops.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties("app.prop")
public class ConfigProps {
	private String mailSender;
	private String mailCopy;
	private int maxPoolSize;
	private int corePoolSize;
	private String encryptKey;
	private String celebrantsEmail;
}
