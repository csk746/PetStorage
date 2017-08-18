package com.daou.petstorage.User.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.User.repository.UserRepository;
import com.daou.petstorage.security.account.AccountUserDetails;

@RestController 
@RequestMapping("/user") 
public class UserController { 
	
	@Autowired AuthenticationManager authenticationManager; 
	@Autowired UserRepository userRepository; 
	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	
	@RequestMapping(value="/login", method=RequestMethod.POST) 
	public AccountUserDetails login( @RequestBody User user,  HttpSession session ) {
		
		log.info("login request user " + user.getLoginId() + "/" + user.getPassword());
		
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getLoginId(), user.getPassword()); 
		Authentication authentication = authenticationManager.authenticate(token); 
		SecurityContextHolder.getContext().setAuthentication(authentication); 
		session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext()); 

        AccountUserDetails accountUser = new AccountUserDetails(userRepository.findByLoginId(user.getLoginId()));
        accountUser.setToken(session.getId());
        
        return accountUser;
		} 
	}
