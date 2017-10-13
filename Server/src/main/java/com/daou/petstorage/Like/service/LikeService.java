/**
 * 
 */
package com.daou.petstorage.Like.service;

import java.util.List;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.User.domain.User;

/**
 * Create by hsim on 2017. 10. 12.
 */
public interface LikeService {
	
	public Story likeStatusChange(Story story);
	public Comment likeStatusChange(Comment comment);
	
	public List<User> getLikeUsers(Story story);
	public List<User> getLikeUsers(Comment story);
	
	public boolean isIlikeItem(Story obj);
	public boolean isIlikeItem(Comment obj);

}
