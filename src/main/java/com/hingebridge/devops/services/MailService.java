package com.hingebridge.devops.services;

import org.springframework.mail.MailException;

public interface MailService {
	void sendMail(String message, String recipientEmail, String subject) throws MailException;
}