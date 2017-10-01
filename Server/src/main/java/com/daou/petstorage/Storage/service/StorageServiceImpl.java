package com.daou.petstorage.Storage.service;

import static org.junit.Assert.assertNotNull;

import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.service.PetService;
import com.daou.petstorage.PetMap.model.AccessControl;
import com.daou.petstorage.Security.SecurityPasswordEncoder;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.model.StorageListModel;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.Storage.util.BlobConverter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

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
	
	@Autowired
	private SecurityPasswordEncoder encoder ;

	@Autowired
	private HttpServletRequest request;

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#saveImageFile(org.springframework.web.multipart.MultipartFile, java.lang.Long)
	 */
	@Override
	public Storage saveImageFile(MultipartFile file, Long petId) {
		// TODO Auto-generated method stub
		
		Pet pet = this.petService.getPet(petId);
		if ( pet == null ) return null; 
		
		Storage storage = new Storage(pet);
		Blob image = this.blobConverter.multiPartFileToBlob(file);
		storage.setImage(image);

		String dir = "/tmp/imagenet/tmp.jpg";

		File f = new File(dir);

		try {
			file.transferTo(f);
		} catch (IOException e) {
			e.printStackTrace();
		}

//		String filePath = request.getServletContext().getRealPath(dir);
//		log.info(filePath);
		return this.save(storage);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#save(com.daou.petstorage.Storage.domain.Storage)
	 */
	@Override
	public Storage save(Storage storage) {
		// TODO Auto-generated method stub
		Pet pet = storage.getPet();
		assertNotNull(pet);
		assertNotNull(securityContext.getUser());
		
		String fakePlanText = pet.getId() + ":" + securityContext.getUser().getLoginId() + System.currentTimeMillis();
		String fakeName = this.encoder.encodePassword(fakePlanText, null);
		storage.setFakeName(fakeName);
		
		return this.storageRepository.save(storage);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#getStorageByFileName(java.lang.String)
	 */
	@Override
	public Storage getStorageByFileName(String fileName) {
		// TODO Auto-generated method stub
		Storage storage = this.storageRepository.findByFakeName(fileName);
		if ( storage == null ){ return null ; }
		
		boolean permission = this.petService.isHavingPermission(this.securityContext.getUser(), storage.getPet(), AccessControl.READ);
		return storage ; 
		//if ( permission ) return storage ; 
		//return null ; 
		
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#getFileList(java.lang.Long, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public StorageListModel getFileList(Long petId, Pageable page) {
		// TODO Auto-generated method stub
		
		StorageListModel model = new StorageListModel();
		
		List<String> urlList = new ArrayList<>();
		Pet pet = this.petService.getPet(petId);
		if ( pet == null) {
			log.error("petId is invalid : " + petId);
			return model ; 
		}
		
		List<Storage> stList = this.storageRepository.findByPet(pet, page);
		
		if ( stList != null && !stList.isEmpty()){
			for ( Storage st : stList)
			urlList.add("/storage/image/" + st.getFakeName());
		}
		model.setUrlList(urlList);
		
		return model ; 
	}

}


