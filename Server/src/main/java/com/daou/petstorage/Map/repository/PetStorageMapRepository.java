package com.daou.petstorage.Map.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.PetMap.domain.PetStorageMap;
import com.daou.petstorage.Storage.domain.Storage;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface PetStorageMapRepository extends JpaRepository<PetStorageMap, Long>{
	
	List<PetStorageMap> findByStorage(Storage storage);
	List<PetStorageMap> findByPet(Pet pet);
	List<PetStorageMap> findByPet(Pet pet, Pageable page);
	PetStorageMap findByPetAndStorage(Pet pet, Storage storage);
}


