package com.daou.petstorage.Pet.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.core.domain.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Created by hsim on 2017. 8. 12...
 */

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Pet extends BaseEntity{

	@Column
	private String name ; 
	
	@Column
	private String kind; 
	
	@Column
	private String birthDay ; 
	
	@ManyToOne
	private User user; 
	
}
