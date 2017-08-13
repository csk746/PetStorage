package com.daou.petstorage.Storage.service;

import java.sql.Blob;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.service.PetService;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.Storage.util.BlobConverter;
import com.daou.petstorage.security.SpringSecurityContext;

/**
 * Created by hsim on 2017. 8. 13...
 */
@Service
public class StorageServiceImpl implements StorageService{

	private static final Logger log = LoggerFactory.getLogger(StorageServiceImpl.class);
	
	@Autowired
	private SpringSecurityContext securityContext ; 
	
	@Autowired
	private StorageRepository storageRepository ; 
	
	@Autowired
	private BlobConverter blobConverter ;
	
	@Autowired
	private PetService petService;

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#saveImageFile(org.springframework.web.multipart.MultipartFile, java.lang.Long)
	 */
	@Override
	public void saveImageFile(MultipartFile file, Long petId) {
		// TODO Auto-generated method stub
		
		Pet pet = this.petService.getPet(petId);
		if ( pet == null ) return ; 
		
		Storage storage = new Storage(pet);
		Blob image = this.blobConverter.multiPartFileToBlob(file);
		storage.setImage(image);
		
		this.storageRepository.save(storage);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#save(com.daou.petstorage.Storage.domain.Storage)
	 */
	@Override
	public Storage save(Storage storage) {
		// TODO Auto-generated method stub
		Pet pet = storage.getPet();
		
		if ( pet.getMaster().getLoginId().equals(this.securityContext.getUser().getLoginId())){
			//save
			return this.storageRepository.save(storage);
		}
		else{
			return null; 
		}
	}

}


