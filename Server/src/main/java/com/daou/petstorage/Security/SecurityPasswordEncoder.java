package com.daou.petstorage.Security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Created by hsim on 2017. 8. 13...
 */
@Component
public class SecurityPasswordEncoder extends ShaPasswordEncoder {

	private static final Logger log = LoggerFactory.getLogger(SecurityPasswordEncoder.class);
	
	
}


