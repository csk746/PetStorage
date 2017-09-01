/**
 * 
 */
package com.daou.petstorage.Comment.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.core.domain.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Create by hsim on 2017. 9. 1.
 */
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends BaseEntity{
	
	@ManyToOne
	private Story story ; 
	
	@ManyToOne
	private User user ; 
	
	@Column
	private String content; 
	
	@Column
	private long likeCount ; 

}
