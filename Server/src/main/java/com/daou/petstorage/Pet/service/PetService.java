package com.daou.petstorage.Pet.service;

import java.util.List;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.PetMap.model.AccessControl;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.common.model.CommonRequestModel;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface PetService {
	
	public boolean petExistCheck(Pet pet, User user);
	public Pet save(Pet pet, User user);
	public Pet save(Pet pet );
	
	public Pet getPet(long petId);
	public List<Pet> getMyPets();
	public List<Pet> getMyPets(User user );
	
	public boolean isHavingPermission(User user, Pet pet , AccessControl ac );
	
	public Pet setProfilePhoto(CommonRequestModel model);
	public Pet setDefaultPet(CommonRequestModel model);
	
	
}


