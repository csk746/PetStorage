package com.daou.petstorage.Pet.service;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface PetService {
	
	public boolean petExistCheck(Pet pet, User user);
	public Pet save(Pet pet, User user);
	public Pet save(Pet pet );
	
	public Pet getPet(long petId);
}


