package com.daou.petstorage.Storage.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Story.domain.Story;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface StorageRepository extends JpaRepository<Storage, Long>{
	
	public List<Storage> findByPet(Pet pet, Pageable page);
	public Storage findByFakeName(String fakeName);
	public Storage findByPet(Pet pet);
	public List<Storage> findByStory(Story story );
	public List<Storage> findByPetAndIsProfile(Pet pet, boolean isProfile);

}


