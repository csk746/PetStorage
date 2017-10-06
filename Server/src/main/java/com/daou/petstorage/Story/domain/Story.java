/**
 * 
 */
package com.daou.petstorage.Story.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.User.domain.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Create by hsim on 2017. 8. 18.
 */

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Story extends BaseEntity {

	@ManyToOne
	private User user ; 
	
	@ManyToOne
	private Pet pet ; 
	
	@Column
	private long likeCount ; 
	
	@Column 
	private String title ; 
	
	@Column 
	private String text; 
}
