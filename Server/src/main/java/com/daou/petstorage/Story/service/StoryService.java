/**
 * 
 */
package com.daou.petstorage.Story.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.daou.petstorage.Story.model.StoryModel;

/**
 * Create by hsim on 2017. 9. 8.
 */
public interface StoryService {

	public List<StoryModel> getStoryList(Pageable page);
}
