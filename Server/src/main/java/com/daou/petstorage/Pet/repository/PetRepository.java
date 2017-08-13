package com.daou.petstorage.Pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Pet.domain.Pet;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface PetRepository extends JpaRepository<Pet, Long>{

}


