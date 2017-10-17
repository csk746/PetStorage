package com.daou.petstorage.Friend.service;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.model.FriendPetModel;
import com.daou.petstorage.Friend.model.PetModel;
import com.daou.petstorage.Friend.repository.FriendRepository;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.repository.PetRepository;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.Storage.repository.StorageRepository;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.User.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Created by geonheelee on 2017. 10. 17..
 */
@Service
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

    @Override
    public List<PetModel> findFollowPets() {
        return friendRepository.findByUserAndStatus(springSecurityContext.getUser(), FriendMap.Status.SUCCESS)
                .stream()
                .map(friendMap -> friendMap.getPet())
                .map(FriendServiceImpl::entityToModel)
                .map(petModel -> {
                    petModel.setUrl(petModel.getProfile().getUrl());
                    return petModel;
                }).collect(Collectors.toList());
    }

    private static PetModel entityToModel(Pet pet){
        PetModel petModel = new PetModel();
        petModel.setName(pet.getName());
        petModel.setProfile(pet.getProfile());
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
        return friendRepository.findByPetAndStatus(pet, FriendMap.Status.READY).
                stream()
                .map(friendMap -> friendMap.getUser())
                .collect(Collectors.toList());
    }

    @Override
    public void requestFriend(long petId) {
        Pet pet = petRepository.findOne(petId);
        FriendMap friendMap = new FriendMap();
        friendMap.setPet(pet);
        friendMap.setUser(springSecurityContext.getUser());
        friendMap.setStatus(FriendMap.Status.READY);
        friendRepository.save(friendMap);
    }

    @Override
    public void appriveFirend(User user, Pet pet) {
        FriendMap friendMap = friendRepository.findByUserAndPet(user, pet);
        friendMap.setStatus(FriendMap.Status.SUCCESS);
        friendRepository.save(friendMap);
    }

    @Override
    public void rejectFriend(long petId, long userId) {
        Pet pet = petRepository.findOne(petId);
        User user = userRepository.findOne(userId);

        FriendMap friendMap = friendRepository.findByUserAndPet(user, pet);
        friendMap.setStatus(FriendMap.Status.REJECT);
        friendRepository.save(friendMap);
    }
    @Override
	public FriendPetModel getFriendPets(Long id) {
		// TODO Auto-generated method stub
		FriendPetModel model = new FriendPetModel();
		
		User user = this.userRepository.findOne(id);
		List<Pet> petlist = this.petRepository.findByUser(user);
		model.addPets(petlist);
		
		for ( Pet pet :  petlist){
			FriendMap map = this.friendRepository.findByUserAndPet(user, pet);
			model.setFriendMap(map);
		}
		
		return model;
	}
}
