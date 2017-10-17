package com.daou.petstorage.Species.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daou.petstorage.Species.domain.Species;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface SpeciesRepository extends JpaRepository<Species, Long>{

	public Species findByName( String name);
}


