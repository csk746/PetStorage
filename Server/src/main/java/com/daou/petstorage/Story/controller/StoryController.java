package com.daou.petstorage.Story.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Story.model.StoryModel;

/**
 * Created by hsim on 2017. 9. 3...
 */

@RestController 
@RequestMapping("/story") 
public class StoryController {

	private static final Logger log = LoggerFactory.getLogger(StoryController.class);
	
	@Autowired private SpringSecurityContext securityContext ; 
	
	@RequestMapping(value="/{storyId}", method=RequestMethod.PUT) 
	public @ResponseBody StoryModel imageUpload( @PathVariable long storyId,  HttpServletResponse res ) {
		log.info("story like update story id : " + storyId + " and user = " + this.securityContext.getUser().getLoginId());
		return new StoryModel();
		
	}

}


