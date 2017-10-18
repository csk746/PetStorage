package com.daou.petstorage.User.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Storage.domain.Storage;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Created by geonheelee on 2017. 8. 11..
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(indexes = {@Index(columnList="loginId")})
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
	
	@ManyToOne
	Storage profile; 
	
	@Column
	Long defaultPetId ; 
	
}
