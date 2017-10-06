/**
 * 
 */
package com.daou.petstorage.Config;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

/**
 * Create by hsim on 2017. 9. 8.
 */
@Component
@Slf4j
@Primary
public class PetObjectMapper extends ObjectMapper{

	@Override
	public <T> T readValue(InputStream src, JavaType valueType)
			throws IOException, JsonParseException, JsonMappingException {
		// TODO Auto-generated method stub
		T t = super.readValue(src, valueType);
		if ( t != null){
			log.info("Request Body : \n"
					+  t.toString()
					+ "\n-----------------------------------------------------------\n");
		}
		
		return t; 
	}
}
