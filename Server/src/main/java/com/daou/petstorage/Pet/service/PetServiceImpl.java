package com.daou.petstorage.Pet.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.repository.PetRepository;
import com.daou.petstorage.User.Service.UserService;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.User.repository.UserRepository;
import com.daou.petstorage.security.SpringSecurityContext;

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
		
		pet.setMaster(user);
		pet = this.petRepository.save(pet);
		if ( pet != null){
			user.setDefaultPet(pet);
			user = this.userService.save(user );
		}
		
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
			return user.getDefaultPet();
		}
		else{
			return pet ; 
		}
	}

}


