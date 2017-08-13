package com.daou.petstorage.User.Service;

import java.util.List;

import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface UserService {
	
	public boolean isExistUser(String loginId, String password);
	public User getUser(String loginId);
	public User getUser(String loginId, String password);
	public User save(User user);
	public User saveUser(User user, boolean encode);
	public List<User> saveUser(List<User> user, boolean encode);

}


