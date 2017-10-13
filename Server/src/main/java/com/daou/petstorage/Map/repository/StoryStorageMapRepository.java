package com.daou.petstorage.Map.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.Story.domain.StoryStorageMap;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface StoryStorageMapRepository extends JpaRepository<StoryStorageMap, Long>{
	
	List<StoryStorageMap> findByStory(Story story );
	List<StoryStorageMap> findByStorage(Storage storage);
	List<StoryStorageMap> findByStoryAndStorage(Story story, Storage storage);
}


