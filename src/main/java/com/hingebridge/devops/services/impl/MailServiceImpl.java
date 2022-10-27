package com.hingebridge.devops.services.impl;

import com.hingebridge.devops.configs.ConfigProps;
import com.hingebridge.devops.services.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
	private final ConfigProps props;
	private final JavaMailSender mailSender;

	@Override
	public void sendMail(String message, String recipientEmail, String subject) throws MailException {
		log.info("---->>> Preparing mail content");
		
		try {
			MimeMessagePreparator messagePreparator = mimeMessage -> {
				MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
				messageHelper.setFrom(props.getMailSender());
				messageHelper.setTo(recipientEmail);
				messageHelper.setSubject(subject);
				messageHelper.setText(message, true);
				messageHelper.addCc(props.getMailCopy());
			};

			mailSender.send(messagePreparator);
			log.info("---->>> Email successfully sent to {}", recipientEmail);
		} catch (MailException e) {
			log.error("--->> Exception sending mail asynchronously: {}", e);
		}
	}
}