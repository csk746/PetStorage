/**
 * 
 */
package com.daou.petstorage.Story.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.Story.model.StoryModel;
import com.daou.petstorage.common.model.CommonRequestModel;

/**
 * Create by hsim on 2017. 9. 8.
 */
public interface StoryService {

	public List<Storage> getStorageList(Story story);
	public List<StoryModel> getStoryList(Pageable page);
	public StoryModel changeLikeStatus(Long id);
	public StoryModel addComment(CommonRequestModel model);
}
