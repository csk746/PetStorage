package com.daou.petstorage.User.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.daou.petstorage.core.domain.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by geonheelee on 2017. 8. 11..
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseEntity {
	
	@Column 
	String name ; 
	
	@Column 
	String loginId ; 
	
	@Column 
	String password ;
	
	@Column 
	int grade ; 
	
	@Column 
	String phone; 
	
	@Column 
	String email ; 
	
}
