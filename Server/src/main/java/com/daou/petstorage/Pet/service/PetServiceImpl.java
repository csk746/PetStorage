package com.daou.petstorage.Pet.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.repository.PetRepository;
import com.daou.petstorage.PetMap.domain.PetUserMap;
import com.daou.petstorage.PetMap.model.AccessControl;
import com.daou.petstorage.PetMap.repository.PetUserMapRepository;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.User.Service.UserService;
import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */

@Service
public class PetServiceImpl implements PetService {

	
	@Autowired
	private SpringSecurityContext securityContext ; 
	
	@Autowired
	private UserService userService; 
	
	@Autowired
	private PetRepository petRepository ; 
	
	@Autowired
	private PetUserMapRepository petUserMapRepository ; 
	
	@Autowired StorageRepository storageRepository ; 
	
	
	private static final Logger log = LoggerFactory.getLogger(PetServiceImpl.class);

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#save(com.daou.petstorage.Pet.domain.Pet, com.daou.petstorage.User.domain.User)
	 */
	
	@Override
	public Pet save(Pet pet, User user) {
		// TODO Auto-generated method stub
		if ( pet == null ) return null ; 
		if ( user == null ){
			log.info("pet Save operator but user is null search security context");
			return this.save(pet);
		}
		if (this.petExistCheck(pet, user) ){
			log.info("pet name : " + pet.getName() + " and user id " + user.getLoginId() + " is exist save fail" );
			return null ; 
		}
		
		pet.setUser(user);
		
		pet = this.petRepository.save(pet);
		
		PetUserMap puMap = new PetUserMap();
		puMap.setAccessControl(AccessControl.getAllAccessValue());
		puMap.setUser(user);
		puMap.setPet(pet);
		
		puMap = this.petUserMapRepository.save(puMap);
		
		
		
		return pet;
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#save(com.daou.petstorage.Pet.domain.Pet)
	 */
	@Override
	public Pet save(Pet pet) {
		// TODO Auto-generated method stub
		User user = securityContext.getUser();
		if ( user == null) return null ; 
		log.info("login security context user is : " + user.toString());
		
		return this.save(pet, user);
		
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#getPet(long)
	 */
	@Override
	public Pet getPet(long petId) {
		// TODO Auto-generated method stub
		
		Pet pet = this.petRepository.findOne(petId);
		if ( pet == null){
			User user = this.userService.getUser(this.securityContext.getUser().getLoginId());
			List<PetUserMap> puMap = this.petUserMapRepository.findByUser(user);
			
			if ( puMap != null && !puMap.isEmpty()){
				pet = puMap.get(0).getPet();
			}
			
		}
		return this.setProfilePhoto(pet); 
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#petExistCheck(com.daou.petstorage.Pet.domain.Pet, com.daou.petstorage.User.domain.User)
	 */
	@Override
	public boolean petExistCheck(Pet pet, User user) {
		// TODO Auto-generated method stub
		
		Pet dbPet = this.petRepository.findByNameAndUser(pet.getName(), user);
		log.info("pet Exist check pet Name : " + pet.getName() + " user id : " + user.getLoginId() + " exist : "  + dbPet==null ? "false": "true");
		return dbPet == null ? false : true ;
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#isHavingPermission(com.daou.petstorage.User.domain.User, com.daou.petstorage.Pet.domain.Pet, com.daou.petstorage.PetMap.model.AccessControl)
	 */
	@Override
	public boolean isHavingPermission(User user, Pet pet, AccessControl ac) {
		// TODO Auto-generated method stub
		PetUserMap puMap = this.petUserMapRepository.findByPetAndUser(pet, user);
		if ( puMap == null) return false ; 
		
		log.info(user.getLoginId() + " user request access pet" +  pet.getName()  + " accessControl " + ac + " permission is " + ac.isAccess(puMap.getAccessControl()));
		
		return ac.isAccess(puMap.getAccessControl());
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#getMyPets(com.daou.petstorage.User.domain.User)
	 */
	@Override
	public List<Pet> getMyPets(User user) {
		// TODO Auto-generated method stub
		if ( user == null  ) { user = this.securityContext.getUser(); }
		if ( user == null) return null ; 
		
		return this.petRepository.findByUser(user);
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#getMyPets()
	 */
	@Override
	public List<Pet> getMyPets() {
		// TODO Auto-generated method stub
		return this.setProfilePhoto(this.getMyPets(null));
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#setProfilePhoto(com.daou.petstorage.Pet.domain.Pet)
	 */
	@Override
	public Pet setProfilePhoto(Pet pet) {
		List<Storage> storages = this.storageRepository.findByPetAndIsProfile(pet, true);
		if ( storages != null && !storages.isEmpty()) {
			pet.setProfileUrl(storages.get(0).getFakeName());
		}
		return pet ; 
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Pet.service.PetService#setProfilePhoto(java.util.List)
	 */
	@Override
	public List<Pet> setProfilePhoto(List<Pet> pet) {
		// TODO Auto-generated method stub
		for ( Pet  p : pet){
			this.setProfilePhoto(p);
		}
		return pet ; 
		
	}

}


