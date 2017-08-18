package com.daou.petstorage.Storage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Storage.domain.Storage;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface StorageRepository extends JpaRepository<Storage, Long>{
	

}


