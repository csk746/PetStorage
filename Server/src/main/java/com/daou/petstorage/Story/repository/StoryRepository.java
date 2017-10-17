package com.daou.petstorage.Story.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Story.domain.Story;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface StoryRepository extends JpaRepository<Story, Long>{

	public Page<Story> findByPet(Pet pet, Pageable page);
}


