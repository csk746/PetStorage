/**
 * 
 */
package com.daou.petstorage.PetMap.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.core.domain.BaseEntity;

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
public class PetUserMap extends BaseEntity {

	@ManyToOne
	private User user ; 
	
	@ManyToOne
	private Pet pet ; 
	
	@Column
	private int accessControl; // is enum value - AccessControl
	
}
