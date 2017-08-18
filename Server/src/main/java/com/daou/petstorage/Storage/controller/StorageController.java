package com.daou.petstorage.Storage.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.daou.petstorage.Storage.service.StorageService;
import com.daou.petstorage.security.SpringSecurityContext;

/**
 * Created by hsim on 2017. 8. 13...
 */
@RestController 
@RequestMapping("/storage") 
public class StorageController {

	private static final Logger log = LoggerFactory.getLogger(StorageController.class);
	
	@Autowired private SpringSecurityContext securityContext ; 
	
	@Autowired private StorageService storageService ;
	
	@RequestMapping(value="/image/{petId}", method=RequestMethod.POST) 
	public void imageUpload( MultipartHttpServletRequest multiPartReq ,  @PathVariable long petId,  HttpServletResponse res ) {
		
		log.info("petId : " + petId);
		MultipartFile file = multiPartReq.getFile("image");
		
		this.storageService.saveImageFile(file, petId);
		
	}
		
}




