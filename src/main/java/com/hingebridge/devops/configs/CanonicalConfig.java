package com.hingebridge.devops.configs;

import java.util.Properties;

import com.hingebridge.devops.helpers.Encryption;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.crypto.CryptoException;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CanonicalConfig {
	private final ConfigProps prop;
	private final MailingConfig mailingConfig;

	@Bean
	public Encryption encryptUtil() {
		return new Encryption(prop.getEncryptKey());
	}

	@Bean
	public JavaMailSender getJavaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost(mailingConfig.getHost());
		mailSender.setPort(mailingConfig.getPort());
		mailSender.setUsername(encryptUtil().decryptStringEncoded(mailingConfig.getUsername()));
		mailSender.setPassword(encryptUtil().decryptStringEncoded(mailingConfig.getPassword()));

		Properties props = mailSender.getJavaMailProperties();
		props.put("mail.transport.protocol", mailingConfig.getProtocol());
		props.put("mail.smtp.auth", mailingConfig.getSmtpAuth());
		props.put("mail.smtp.starttls.enable", mailingConfig.getEnableStarttls());
		props.put("mail.debug", mailingConfig.getDebug());
		props.put("mail.smtp.ssl.trust", mailingConfig.getHost());

		return mailSender;
	}

	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:messages");
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}

	@Bean
	public LocalValidatorFactoryBean getValidator() {
		LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean();
		localValidatorFactoryBean.setValidationMessageSource(messageSource());
		return localValidatorFactoryBean;
	}
}