/**
 * 
 */
package com.daou.petstorage.Story.service;

import static org.junit.Assert.assertNotNull;

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
import com.daou.petstorage.Like.service.LikeService;
import com.daou.petstorage.Map.repository.StoryStorageMapRepository;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.repository.PetRepository;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.Story.domain.StoryStorageMap;
import com.daou.petstorage.Story.model.StoryModel;
import com.daou.petstorage.Story.repository.StoryRepository;
import com.daou.petstorage.common.model.CommonRequestModel;
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
	@Autowired private SpringSecurityContext securityContext ; 
	@Autowired private LikeService likeService ; 
	@Autowired private StoryStorageMapRepository storyStorageMapRepository ; 
	@Autowired private PetRepository petRepository ; 
	 
	

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Story.service.StoryService#getStoryList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public List<StoryModel> getStoryList(CommonRequestModel model, Pageable page) {
		// TODO Auto-generated method stub
		
		Page<Story> storyPage = null; 
		
		if ( model.getPetId() == null){
			storyPage = this.storyRepository.findAll(page);
		}
		else{
			Pet pet = this.petRepository.findOne(model.getPetId());
			storyPage = this.storyRepository.findByPet(pet,page);
		}
		List<StoryModel> modelList = new ArrayList<>();
		
		for ( Story s : storyPage.getContent()){
			StoryModel sModel = new StoryModel(s);
			sModel.setIlike(this.likeService.isIlikeItem(s));
			List<Storage> stlist = this.getStorageList(s);
			List<Comment> commentList = this.commentRepository.findByStory(s);
			sModel.setStorageList(stlist);
			sModel.setComments(commentList);
			modelList.add(sModel);
		}
		
		
		return modelList ;
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Story.service.StoryService#plusLikeCount(com.daou.petstorage.common.model.CommonRequestModel)
	 */
	@Override
	public StoryModel changeLikeStatus(Long id) {
		// TODO Auto-generated method stub
		Story story = this.storyRepository.findOne(id);
		if ( story == null) return new StoryModel();
		
		story = this.likeService.likeStatusChange(story);
		
		return new StoryModel(story);
		
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Story.service.StoryService#addComment(com.daou.petstorage.common.model.CommonRequestModel)
	 */
	@Override
	public StoryModel addComment(CommonRequestModel model) {
		// TODO Auto-generated method stub
		Story story = this.storyRepository.findOne(model.getId());
		if ( story == null) return new StoryModel();
		
		Comment comment = new Comment();
		comment.setStory(story);
		comment.setContent(model.getComment());
		comment.setLikeCount(0);
		if ( this.securityContext.getUser() != null){
			comment.setUser(this.securityContext.getUser());
		}
		
		comment = this.commentRepository.save(comment);
		
		return new StoryModel(story);
		
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Story.service.StoryService#getStorageList(com.daou.petstorage.Story.domain.Story)
	 */
	@Override
	public List<Storage> getStorageList(Story story) {
		// TODO Auto-generated method stub
		List<StoryStorageMap> mapList = this.storyStorageMapRepository.findByStory(story);
		
		List<Storage> storageList = new ArrayList<>();
		for ( StoryStorageMap map : mapList){
			storageList.add(map.getStorage());
		}
		return storageList ; 
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Story.service.StoryService#createStory(com.daou.petstorage.common.model.CommonRequestModel)
	 */
	@Override
	public StoryModel createStory(CommonRequestModel model) {
		// TODO Auto-generated method stub
		Story story = new Story();
		story.setUser(this.securityContext.getUser());
		Pet pet = this.petRepository.findOne(model.getId());
		assertNotNull(pet);
		story.setPet(pet);
		story.setText(model.getContent());
		story.setTitle(model.getContent());
		
		Storage storage = this.storageRepository.findByFakeName(model.getFakeName());
		assertNotNull(storage);
		
		story = this.storyRepository.save(story);
		
		StoryStorageMap map = this.storyStorageMapRepository.save(new StoryStorageMap(story, storage));
		
		return new StoryModel(story);
	}

}
