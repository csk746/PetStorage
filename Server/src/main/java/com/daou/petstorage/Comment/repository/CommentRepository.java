package com.daou.petstorage.Comment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Story.domain.Story;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	public List<Comment> findByStory(Story story );

}


