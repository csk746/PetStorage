package com.daou.petstorage.Pet.service;

import java.util.List;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.PetMap.model.AccessControl;
import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface PetService {
	
	public Pet setProfilePhoto(Pet pet );
	public List<Pet> setProfilePhoto(List<Pet> pet );
	
	public boolean petExistCheck(Pet pet, User user);
	public Pet save(Pet pet, User user);
	public Pet save(Pet pet );
	
	public Pet getPet(long petId);
	public List<Pet> getMyPets();
	public List<Pet> getMyPets(User user );
	
	public boolean isHavingPermission(User user, Pet pet , AccessControl ac );
	
	
}


