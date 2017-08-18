package com.daou.petstorage.User.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface UserRepository extends JpaRepository<User, Long>{

	Long countByLoginId(String loginId);
	User findByLoginId(String loginId);
	User findByLoginIdAndPassword(String loginId, String password);
}


