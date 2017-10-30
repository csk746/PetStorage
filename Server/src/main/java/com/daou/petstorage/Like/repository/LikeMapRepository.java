package com.daou.petstorage.Like.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Like.domain.LikeMap;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface LikeMapRepository extends JpaRepository<LikeMap, Long>{
	
	public List<LikeMap> findByUser(User user);
	public List<LikeMap> findByStory(Story story);
	public List<LikeMap> findByComment(Comment comment);
	public LikeMap findByUserAndStory(User user, Story story);
	public LikeMap findByUserAndComment(User user, Comment story);
	public Long countByStory(Story story);
	public Long countByComment(Comment story);
	
}


