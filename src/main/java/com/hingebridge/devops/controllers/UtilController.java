package com.hingebridge.devops.controllers;

import com.hingebridge.devops.dtos.MessageDTO;
import com.hingebridge.devops.services.impl.SendEmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/send")
public class UtilController {
    private final SendEmailService sendEmailService;

    @PostMapping
    public Mono<ResponseEntity<String>> send(@RequestBody MessageDTO messageDTO) {
        log.info("--->> MessageDTO: {}", messageDTO);
//        sendEmailService.sendBithdayMail(messageDTO);

        return Mono.just(ResponseEntity.ok("Message sent"));
    }
}
