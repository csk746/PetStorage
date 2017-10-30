package com.daou.petstorage.Friend.service;

import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.domain.FriendMap.Status;
import com.daou.petstorage.Friend.model.FriendPetModel;
import com.daou.petstorage.Friend.repository.FriendRepository;
import com.daou.petstorage.Map.repository.PetUserMapRepository;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.model.PetModel;
import com.daou.petstorage.Pet.repository.PetRepository;
import com.daou.petstorage.PetMap.domain.PetUserMap;
import com.daou.petstorage.PetMap.model.AccessControl;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.User.repository.UserRepository;

import lombok.extern.log4j.Log4j;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
@Service
@Log4j
public class FriendServiceImpl implements FriendService {

	@Autowired
	FriendRepository friendRepository;

	@Autowired
	SpringSecurityContext springSecurityContext;

    @Autowired
    StorageRepository storageRepository;

    @Autowired
    PetRepository petRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PetUserMapRepository petUserMapRepository ; 

    @Override
    public List<FriendMap> findFollowPets() {
        		
/*        		
        		return friendRepository.findByUserAndStatus(springSecurityContext.getUser(), FriendMap.Status.SUCCESS)
                .stream()
                .map(friendMap -> friendMap.getPet())
                .map(FriendServiceImpl::entityToModel)
                .map(petModel -> {
                    petModel.setUrl(petModel.getProfile().getUrl());
                    return petModel;
                }).collect(Collectors.toList());
 */       
    	
        List<FriendMap> list = friendRepository.findByUserAndStatus(springSecurityContext.getUser(), FriendMap.Status.SUCCESS);
        List<Pet> myPets = this.petRepository.findByUser(this.springSecurityContext.getUser());
        list.addAll(friendRepository.findByPetInAndStatus(myPets , FriendMap.Status.SUCCESS));
        
        return list ; 
    }

    private static PetModel entityToModel(Pet pet){
        PetModel petModel = new PetModel(pet);
        return petModel;
    }

	@Override
	public List<FriendMap> findRequests() {
		List<Pet> pets = petRepository.findByUser(springSecurityContext.getUser());
		List<FriendMap> friendMaps = new ArrayList<>();
		for (Pet pet:pets){
			friendMaps.addAll(friendRepository.findByPetAndStatus(pet, FriendMap.Status.READY));
		}
		return friendMaps;
	}

	@Override
	public List<User> findByPet(Pet pet) {
		return friendRepository.findByPetAndStatus(pet, FriendMap.Status.READY).stream()
				.map(friendMap -> friendMap.getUser())
				.collect(Collectors.toList());
	}

	@Override
	public FriendMap requestFriend(long petId) {
		Pet pet = petRepository.findOne(petId);
		
		FriendMap friendMap = friendRepository.findByUserAndPet(springSecurityContext.getUser(), pet);
		
		if ( friendMap == null)
			friendMap = new FriendMap();
		
		friendMap.setPet(pet);
		friendMap.setUser(springSecurityContext.getUser());
		friendMap.setStatus(FriendMap.Status.READY);
		
		return friendRepository.save(friendMap);
	}

	@Override
	public FriendMap approveFirend(long petId, long userId) {
		log.info("petId : " + petId  + " userId : " + userId);
		Pet pet = petRepository.findOne(petId);
		User user = userRepository.findOne(userId);

		FriendMap friendMap = friendRepository.findByUserAndPet(user, pet);
		friendMap.setStatus(FriendMap.Status.SUCCESS);
		
		
		PetUserMap puMap = new PetUserMap();
		puMap.setAccessControl(AccessControl.READ.getBitValue() | AccessControl.WRITE.getBitValue());
		puMap.setPet(pet);
		puMap.setUser(user);
		puMap = this.petUserMapRepository.save(puMap);
		
		friendMap.setPetUserMap(puMap);
		
		return friendRepository.save(friendMap);
	}

	@Override
	public FriendMap rejectFriend(long petId, long userId) {
		Pet pet = petRepository.findOne(petId);
		User user = userRepository.findOne(userId);

		FriendMap friendMap = friendRepository.findByUserAndPet(user, pet);
		friendMap.setStatus(FriendMap.Status.REJECT);
		return friendRepository.save(friendMap);
	}
	@Override
	public FriendPetModel getFriendPets(Long id) {
		// TODO Auto-generated method stub
		FriendPetModel model = new FriendPetModel();

		User user = this.userRepository.findOne(id);
		List<Pet> petlist = this.petRepository.findByUser(user);
		model.setUser(user);
		model.addPets(petlist);
		
		
		User myInfo = this.userRepository.findOne(this.springSecurityContext.getUser().getId());

		for ( Pet pet :  petlist){
			if ( user.getId() == this.springSecurityContext.getUser().getId()){
				FriendMap map = new FriendMap();
				map.setPet(pet);
				map.setUser(user);
				map.setStatus(Status.SUCCESS);
				model.setFriendMap(map);
			}
			else{
				FriendMap map = this.friendRepository.findByUserAndPet(myInfo, pet);
				model.setFriendMap(map);
			}
		}

		return model;
	}

	/* (non-Javadoc)
	 * @see com.daou.petstorage.Friend.service.FriendService#setAccessControl(com.daou.petstorage.PetMap.domain.PetUserMap)
	 */
	@Override
	public PetUserMap setAccessControl(PetUserMap pumap) {
		// TODO Auto-generated method stub
		int ac = pumap.getAccessControl();
		pumap = this.petUserMapRepository.findOne(pumap.getId());
		assertNotNull(pumap);
		pumap.setAccessControl(ac);
		
		if ( !AccessControl.WRITE.isAccess(ac)){
			if ( pumap.getUser().getDefaultPetId() == pumap.getPet().getId()){
				List<PetUserMap> pumapList = this.petUserMapRepository.findByUser(pumap.getUser());
				pumap.getUser().setDefaultPetId(null);
				for ( PetUserMap map : pumapList){
					if ( AccessControl.WRITE.isAccess(map.getAccessControl())){
						pumap.getUser().setDefaultPetId(map.getPet().getId());
						break;
					}
				}
				this.userRepository.save(pumap.getUser());
			}
		}
		
		return this.petUserMapRepository.save(pumap);
	}
}
