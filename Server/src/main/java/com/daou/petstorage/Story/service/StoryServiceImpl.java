/**
 * 
 */
package com.daou.petstorage.Story.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Comment.repository.CommentRepository;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.Story.model.StoryModel;
import com.daou.petstorage.Story.repository.StoryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Create by hsim on 2017. 9. 8.
 */

@Service
public class StoryServiceImpl implements StoryService{

	private static final Logger log = LoggerFactory.getLogger(StoryServiceImpl.class);
	
	@Autowired private StoryRepository storyRepository ;
	@Autowired private StorageRepository storageRepository ; 
	@Autowired private CommentRepository commentRepository ; 
	@Autowired private ObjectMapper objMapper ; 

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Story.service.StoryService#getStoryList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public List<StoryModel> getStoryList(Pageable page) {
		// TODO Auto-generated method stub
		Page<Story> storyPage = this.storyRepository.findAll(page);
		List<StoryModel> modelList = new ArrayList<>();
		
		for ( Story s : storyPage.getContent()){
			StoryModel sModel = new StoryModel(s);
			List<Storage> stlist = this.storageRepository.findByStory(s);
			List<Comment> commentList = this.commentRepository.findByStory(s);
			sModel.setStorageList(stlist);
			sModel.setComments(commentList);
			modelList.add(sModel);
		}
		
		
		return modelList ;
	}
}
