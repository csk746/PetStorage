/**
 * 
 */
package com.daou.petstorage.Like.service;

import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Comment.domain.Comment;
import com.daou.petstorage.Comment.repository.CommentRepository;
import com.daou.petstorage.Like.domain.LikeMap;
import com.daou.petstorage.Like.repository.LikeMapRepository;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Story.domain.Story;
import com.daou.petstorage.Story.repository.StoryRepository;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.User.repository.UserRepository;

/**
 * Create by hsim on 2017. 10. 12.
 */
@Service
public class LikeServiceImpl implements LikeService{

	private static final Logger log = LoggerFactory.getLogger(LikeServiceImpl.class);
	
	@Autowired private LikeMapRepository likeMapRepository ; 
	@Autowired private UserRepository userRepository ; 
	@Autowired private StoryRepository storyrRepository ; 
	@Autowired private CommentRepository commentRepository; 
	@Autowired private SpringSecurityContext securityContext ; 

	
	private User getMyInfo(){
		User myInfo = this.securityContext.getUser();
		assertNotNull(myInfo);
		return myInfo ; 
	}
	/* (non-Javadoc)
	 * @see com.daou.petstorage.Like.service.Likeservice#likeStatusChange(com.daou.petstorage.Story.domain.Story)
	 */
	@Override
	public Story likeStatusChange(Story story) {
		// TODO Auto-generated method stub
		User myInfo = this.getMyInfo();
		LikeMap map = this.likeMapRepository.findByUserAndStory(myInfo, story);
		if ( map != null ){
			this.likeMapRepository.delete(map);
		}
		else{
			map = new LikeMap(myInfo, story);
			map = this.likeMapRepository.save(map);
		}
		
		long likeCnt = this.likeMapRepository.countByStory(story);
		story.setLikeCount(likeCnt);
		return this.storyrRepository.save(story);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Like.service.Likeservice#likeStatusChange(com.daou.petstorage.Comment.domain.Comment)
	 */
	@Override
	public Comment likeStatusChange(Comment comment) {
		// TODO Auto-generated method stub
		User myInfo = this.getMyInfo();
		LikeMap map = this.likeMapRepository.findByUserAndComment(myInfo, comment);
		if ( map != null ){
			this.likeMapRepository.delete(map);
		}
		else{
			map = new LikeMap(myInfo, comment);
			map = this.likeMapRepository.save(map);
		}
		
		comment.setLikeCount(this.likeMapRepository.countByComment(comment));
		return this.commentRepository.save(comment);
	}

	private List<User> getUserListFromLikeMapList(List<LikeMap> likeMaps){
		List<User> users = new ArrayList<>();
		for ( LikeMap map : likeMaps){
			users.add(map.getUser());
		}
		return users ; 
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Like.service.Likeservice#getLikeUsers(com.daou.petstorage.Story.domain.Story)
	 */
	@Override
	public List<User> getLikeUsers(Story story) {
		// TODO Auto-generated method stub
		List<LikeMap> likeMaps = this.likeMapRepository.findByStory(story);
		return this.getUserListFromLikeMapList(likeMaps);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Like.service.Likeservice#getLikeUsers(com.daou.petstorage.Comment.domain.Comment)
	 */
	@Override
	public List<User> getLikeUsers(Comment comment) {
		// TODO Auto-generated method stub
		List<LikeMap> likeMaps = this.likeMapRepository.findByComment(comment);
		return this.getUserListFromLikeMapList(likeMaps);
		
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Like.service.Likeservice#isIlikeItem(com.daou.petstorage.Story.domain.Story)
	 */
	@Override
	public boolean isIlikeItem(Story obj) {
		// TODO Auto-generated method stub
		User myInfo = this.getMyInfo();
		return this.likeMapRepository.findByUserAndStory(myInfo, obj) != null ; 
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Like.service.Likeservice#isIlikeItem(com.daou.petstorage.Comment.domain.Comment)
	 */
	@Override
	public boolean isIlikeItem(Comment obj) {
		// TODO Auto-generated method stub
		User myInfo = this.getMyInfo();
		return this.likeMapRepository.findByUserAndComment(myInfo, obj) != null ; 
	}
}
