/**
 * 
 */
package com.daou.petstorage.Pet.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.daou.petstorage.Core.model.BaseModel;
import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.domain.FriendMap.Status;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.User.domain.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

/**
 * Create by hsim on 2017. 10. 17.
 */
@Getter
@Setter
@NoArgsConstructor
@Log4j
public class PetModel extends BaseModel {

	private static final Logger log = LoggerFactory.getLogger(PetModel.class);
	
	private String name ; 
	private String kind; 
	private String birthDay ; 
	private Storage profile;
	private String url ; 
	private User user; 
	
	private FriendMap.Status status ; 
	
	public PetModel(Pet pet){
		super(pet);
		
		this.name = pet.getName();
		this.kind = pet.getKind();
		this.birthDay = pet.getBirthDay();
		this.profile = pet.getProfile();
		this.user = pet.getUser();
		this.status = Status.REJECT;
	}
	
}
