package com.daou.petstorage.Species.domain;


import javax.persistence.Column;
import javax.persistence.Entity;

import com.daou.petstorage.Core.domain.BaseEntity;

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
public class Species extends BaseEntity{

	@Column
	private String kind; 
	
	@Column String name ;
	
}
