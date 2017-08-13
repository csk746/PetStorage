package com.daou.petstorage.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Configuration;

/**
 * Created by hsim on 2017. 8. 13...
 */
@Configuration
public class JacksonConfig {

	private static final Logger log = LoggerFactory.getLogger(JacksonConfig.class);
	
	private final boolean failOnUnknownProperties = false ; 
	private final boolean readUnknownEnumValuesAsNull = true ; 
	private final boolean failOnEmptyBeans = false ; 
	
	@Autowired
	public void settingToObjectMapper (ObjectMapper mapper ){
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, this.failOnUnknownProperties);
        mapper.configure(DeserializationFeature.READ_UNKNOWN_ENUM_VALUES_AS_NULL, this.readUnknownEnumValuesAsNull);
        
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, this.failOnEmptyBeans);
        
	}
	
	@Autowired
	private void logging(){
		
		log.info("---------------------ObjectMapper Setting-----------------------");
		log.info("DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES : " + this.failOnUnknownProperties);
		log.info("DeserializationFeature.READ_UNKNOWN_ENUM_VALUES_AS_NULL : " + this.readUnknownEnumValuesAsNull);
		
		log.info("DeserializationFeature.FAIL_ON_EMPTY_BEANS : " + this.failOnEmptyBeans);
		log.info("---------------------ObjectMapper Setting-----------------------\n");
	}

}


