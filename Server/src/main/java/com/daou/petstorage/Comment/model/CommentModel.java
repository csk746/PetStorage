/**
 * 
 */
package com.daou.petstorage.Comment.model;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Core.model.BaseModel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

/**
 * Create by hsim on 2017. 9. 29.
 */
@Log4j
@Getter
@Setter
@NoArgsConstructor
public class CommentModel extends BaseModel{
	
	private Long userId ; 
	private String userName ; 
	private String content ;
	/**
	 * 
	 */
	public CommentModel(Comment comment) {
		// TODO Auto-generated constructor stub
		super(comment);
		this.userId = comment.getUser().getId();
		this.userName= comment.getUser().getName();
		this.content = comment.getContent();
	}
	

}
