/**
 * 
 */
package com.daou.petstorage.Like.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.User.domain.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Create by hsim on 2017. 8. 18.
 */

@NoArgsConstructor
@Getter
@Setter
@Entity
public class LikeMap extends BaseEntity {

	public LikeMap(User user, Story story ) {
		super();
		this.user = user;
		this.story = story;
	}
	
	public LikeMap(User user,  Comment comment) {
		super();
		this.user = user;
		this.comment = comment;
	}

	@ManyToOne
	private User user ; 
	
	@ManyToOne
	private Story story ; 
	
	@ManyToOne
	private Comment comment; 
	
	
}
