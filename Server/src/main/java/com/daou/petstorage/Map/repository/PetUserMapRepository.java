package com.daou.petstorage.Map.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.PetMap.domain.PetUserMap;
import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface PetUserMapRepository extends JpaRepository<PetUserMap, Long>{
	
	List<PetUserMap> findByUser(User user);
	List<PetUserMap> findByPet(Pet pet);
	PetUserMap findByPetAndUser(Pet pet, User user);
}


