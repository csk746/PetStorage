package com.daou.petstorage.Story.model;

import java.util.List;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.User.domain.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by hsim on 2017. 9. 3...
 */

@Getter
@Setter
@NoArgsConstructor
public class StoryModel{
	
	
	public StoryModel(Story story){
		this.user =  story.getUser() ;
		this.pet = story.getPet();
		this.likeCount = story.getLikeCount();
		this.title = story.getTitle(); 
		this.text = story.getText();
	}
	
	private User user ; 
	
	private Pet pet ; 
	
	private long likeCount ; 
	
	private String title ; 
	
	private String text; 
	
	private String urlList ; 
	
	private List<Comment> comments ; 
}


