package com.daou.petstorage.Storage.service;

import static org.junit.Assert.assertNotNull;

import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.daou.petstorage.Map.repository.PetStorageMapRepository;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.service.PetService;
import com.daou.petstorage.PetMap.domain.PetStorageMap;
import com.daou.petstorage.PetMap.model.AccessControl;
import com.daou.petstorage.Security.SecurityPasswordEncoder;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Species.domain.Species;
import com.daou.petstorage.Species.repository.SpeciesRepository;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.model.StorageListModel;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.Storage.util.BlobConverter;

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
	private SpeciesRepository speciesRepository ; 

	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private PetStorageMapRepository petStorageMapRepository ; 

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#saveImageFile(org.springframework.web.multipart.MultipartFile, java.lang.Long)
	 */
	@Override
	public Storage saveImageFile(MultipartFile file, Long petId) {
		// TODO Auto-generated method stub
		
		Pet pet = this.petService.getPet(petId);
		if ( pet == null ) return null; 
		
		Storage storage = new Storage();
		Blob image = this.blobConverter.multiPartFileToBlob(file);
		storage.setImage(image);
		storage = this.save(pet, storage);
		
		PetStorageMap storageMap = this.petStorageMapRepository.save(new PetStorageMap(storage, pet) );

		String dir = "/tmp/imagenet/tmp.jpg";
		File f = new File(dir);
		log.info("parent Dir : " +  f.getParent());
		
		if ( f.getParentFile().exists()){
			try {
				file.transferTo(f);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		RestTemplate restTemplate = new RestTemplate();
		//이미지 추론하는 데몬으로 리퀘스트.
		// /tmp/imagenet/tmp.jpg 에 저장하고 데몬은 같은 파일에 접근하여
		// 판단 결과를 result에 저장
		String result = restTemplate.getForObject("http://ghdoc.com:7000/ml",String.class);
		
		if ( result != null){
			String speicesStr [] = result.split(",");
			for ( String spe : speicesStr){
				Species species = this.speciesRepository.findByName(spe);
				if ( species != null){
					storage.setSpecies(species);
					break;
				}
			}
		}
		//		String filePath = request.getServletContext().getRealPath(dir);
		//		log.info(filePath);
		
		return this.save(pet, storage);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Storage.service.StorageService#save(com.daou.petstorage.Storage.domain.Storage)
	 */
	@Override
	public Storage save(Pet pet,Storage storage) {
		// TODO Auto-generated method stub
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
		return storage;
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
		
		boolean permission = this.petService.isHavingPermission(this.securityContext.getUser(), pet, AccessControl.READ);
		if ( !permission){
			log.info("pet storage access permission is not exist");
			return model ; 
		}
		
		List<PetStorageMap> mapList = this.petStorageMapRepository.findByPet(pet, page);
		
		if ( mapList!= null && !mapList.isEmpty()){
			for ( PetStorageMap map : mapList){
				urlList.add(map.getStorage().getUrl());
			}
		}
		model.setUrlList(urlList);
		
		return model ; 
	}

}


