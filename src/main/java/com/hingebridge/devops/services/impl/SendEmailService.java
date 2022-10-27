package com.hingebridge.devops.services.impl;

import com.hingebridge.devops.configs.ConfigProps;
import com.hingebridge.devops.dtos.MessageDTO;
import com.hingebridge.devops.dtos.UserDTO;
import com.hingebridge.devops.services.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import lombok.extern.slf4j.Slf4j;

import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class SendEmailService {
	private final ConfigProps props;
	private final MailService mailService;
	private final MessageSource messageSource;
	private  final TemplateEngine templateEngine;
	private Locale locale = LocaleContextHolder.getLocale();

	@Async
	public void sendBithdayMail(MessageDTO messageDTO) {
		log.info("---->>> Initializing mailing to user");
		
		try {
			Context context = new Context();
//			context.setVariable("user", user.getUserInfo());
			
			String template = "pages/birthday_template";
			String mailSubject = messageSource.getMessage("message.subject", null, locale);

			String message = templateEngine.process(template, context);
			
			log.info("---->>> Mail context, template and subject setup completed");
			mailService.sendMail(message, props.getCelebrantsEmail(), mailSubject);
		} catch (Exception ex) {
			log.info("---->>> Error: {}", ex.getMessage());
		}
	}
}