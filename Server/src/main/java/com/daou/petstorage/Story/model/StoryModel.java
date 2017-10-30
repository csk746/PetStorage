package com.daou.petstorage.Story.model;

import java.util.ArrayList;
import java.util.List;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Comment.model.CommentModel;
import com.daou.petstorage.Core.model.BaseModel;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Storage.domain.Storage;
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
public class StoryModel extends BaseModel{
	
	
	public StoryModel(Story story){
		super(story);
		this.user =  story.getUser() ;
		this.pet = story.getPet();
		this.likeCount = story.getLikeCount();
		this.title = story.getTitle(); 
		this.text = story.getText();
	}
	
	private User user ; 
	
	private Pet pet ; 
	
	private long likeCount ; 
	
	private boolean ilike;
	
	private String title ; 
	
	private String text; 
	
	private List<String> urlList ; 
	
	private List<CommentModel> comments ; 
	
	public void setStorageList(List<Storage> list){
		if ( list == null || list.isEmpty() ) return ; 
		
		this.urlList = new ArrayList<>();
		for ( Storage s : list){
			this.urlList.add(s.getUrl());
		}
	}
	
	public void setComments(List<Comment> comments){
		this.comments = new ArrayList<>();
		for ( Comment c : comments){
			this.comments.add(new CommentModel(c));
		}
	}
	
}


