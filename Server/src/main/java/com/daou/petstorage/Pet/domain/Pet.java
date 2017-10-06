package com.daou.petstorage.Pet.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.User.domain.User;

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
	
	@Column
	private String profileUrl;
	
	@ManyToOne
	private User user; 
	
}
