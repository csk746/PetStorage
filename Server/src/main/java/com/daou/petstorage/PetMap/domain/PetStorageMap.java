/**
 * 
 */
package com.daou.petstorage.PetMap.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Storage.domain.Storage;

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
public class PetStorageMap extends BaseEntity {

	
	
	
	public PetStorageMap(Storage storage, Pet pet) {
		super();
		this.storage = storage;
		this.pet = pet;
	}

	@ManyToOne
	private Storage storage ; 
	
	@ManyToOne
	private Pet pet ; 
	
}
