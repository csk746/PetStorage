package com.daou.petstorage.User.Service;

import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Security.SecurityPasswordEncoder;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.User.repository.UserRepository;

/**
 * Created by hsim on 2017. 8. 13...
 */
@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository ; 
	
	@Autowired
	private SecurityPasswordEncoder passwordEncoder ; 

	private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	private final int defaultEncodeLength = "7110eda4d09e062aa5e4a390b0a572ac0d2c0220".length();
	
	@Override
	public boolean isExistUser(String loginId, String password) {
		// TODO Auto-generated method stub
		return this.userRepository.findByLoginIdAndPassword(loginId, password) != null ;
	}
	/* (non-Javadoc)
	 * @see com.daou.petstorage.User.Service.UserService#getUser(java.lang.Long)
	 */
	@Override
	public User getUser(Long id) {
		// TODO Auto-generated method stub
		return this.userRepository.findOne(id);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.User.Service.UserService#getUser(java.lang.String)
	 */
	@Override
	public User getUser(String loginId) {
		// TODO Auto-generated method stub
		return this.userRepository.findByLoginId(loginId);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.User.Service.UserService#getUser(java.lang.String, java.lang.String)
	 */
	@Override
	public User getUser(String loginId, String password) {
		// TODO Auto-generated method stub
		return this.userRepository.findByLoginIdAndPassword(loginId, password);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.User.Service.UserService#saveUser(com.daou.petstorage.User.domain.User, boolean)
	 */
	@Override
	public User saveUser(User user, boolean encode) {
		if ( user == null) return null ; 
		if ( encode ){
			user.setPassword(passwordEncoder.encodePassword(user.getPassword(), null));
		}
		return this.userRepository.save(user);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.User.Service.UserService#saveUser(java.util.List, boolean)
	 */
	
	@Override
	public boolean isExistUser(String loginId){
		assertNotNull(loginId);
		Long cnt = this.userRepository.countByLoginId(loginId);
		log.info("user exist check loginId : " + loginId + " select count : " + cnt );
		if ( cnt != null && cnt > 0 ) return true ; 
		return false ; 
	}
	
	@Override
	public List<User> saveUser(List<User> user, boolean encode) {
		// TODO Auto-generated method stub
		assertNotNull(user);
		
		for ( int i =0 ;i < user.size(); i ++){
			User u = user.get(i);
			assertNotNull(u.getLoginId());
			
			if ( isExistUser(u.getLoginId())) {
				user.remove(i--);
				continue ; 
			}
			u.setPassword(passwordEncoder.encodePassword(u.getPassword(), null));
		}
		
		
		return this.userRepository.save(user);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.User.Service.UserService#save(com.daou.petstorage.User.domain.User)
	 */
	@Override
	public User save(User user) {
		// TODO Auto-generated method stub
		assertNotNull(user);
		assertNotNull(user.getLoginId());
		
		return this.userRepository.save(user);
	}


}


