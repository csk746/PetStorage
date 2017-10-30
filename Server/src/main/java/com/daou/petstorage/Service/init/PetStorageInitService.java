package com.daou.petstorage.Service.init;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.repository.PetRepository;
import com.daou.petstorage.Species.repository.SpeciesRepository;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.service.StorageService;
import com.daou.petstorage.Storage.util.BlobConverter;

/**
 * Created by hsim on 2017. 8. 13...
 */
@Service
public class PetStorageInitService implements ApplicationListener<ContextRefreshedEvent>{

	private static final Logger log = LoggerFactory.getLogger(PetStorageInitService.class);
	
	/* (non-Javadoc)
	 * @see org.springframework.context.ApplicationListener#onApplicationEvent(org.springframework.context.ApplicationEvent)
	 */
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		log.info("--------------StartUp PetStorage---------------");
	}

}


