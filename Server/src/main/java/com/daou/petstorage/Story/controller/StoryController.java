package com.daou.petstorage.Story.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Story.model.StoryModel;
import com.daou.petstorage.Story.service.StoryService;
import com.daou.petstorage.common.model.CommonRequestModel;
import com.daou.petstorage.util.SortUtil;

/**
 * Created by hsim on 2017. 9. 3...
 */

@RestController 
@RequestMapping("/story") 
public class StoryController {

	private static final Logger log = LoggerFactory.getLogger(StoryController.class);
	
	@Autowired private SpringSecurityContext securityContext ; 
	@Autowired private StoryService storyService ; 
	
	@RequestMapping(value="/{storyId}", method=RequestMethod.PUT) 
	public @ResponseBody StoryModel imageUpload( @PathVariable long storyId,  HttpServletResponse res ) {
		log.info("story like update story id : " + storyId + " and user = " + this.securityContext.getUser().getLoginId());
		return new StoryModel();
		
	}
	
		
	@RequestMapping(value="/comment", method=RequestMethod.POST) 
	public @ResponseBody StoryModel addComment( @RequestBody CommonRequestModel model , HttpServletResponse res ) {
		log.info("add comment request :  " + model.toString());
		return new StoryModel();
		
	}
		
	@RequestMapping(value="/list", method=RequestMethod.POST) 
	public @ResponseBody List<StoryModel> getStoryList( @RequestBody CommonRequestModel model , HttpServletResponse res ) {
		log.info("get story list :  " + model.toString());
		
		Sort sort = SortUtil.direction(model.getOrder(), model.getField());
		Pageable pageRequest = new PageRequest(model.getPage(), model.getOffset(), sort);
		
		return this.storyService.getStoryList(pageRequest);
		
	}

}


