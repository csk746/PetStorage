package com.daou.petstorage.Friend.service;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.repository.FriendRepository;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.repository.PetRepository;
import com.daou.petstorage.Security.SpringSecurityContext;
import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.User.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
public class FriendServiceImpl implements FriendService {

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    SpringSecurityContext springSecurityContext;

    @Autowired
    PetRepository petRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Pet> findMyPetFriends() {
        return friendRepository.findByUserAndStatus(springSecurityContext.getUser(), FriendMap.Status.SUCCESS);
    }

    @Override
    public List<FriendMap> findRequests() {
        List<Pet> pets = petRepository.findByUser(springSecurityContext.getUser());


        return null;
    }

    private Stream<FriendMap> find(List<Pet> pets){
        List<FriendMap> friendMaps = new ArrayList<>();
        for (Pet pet : pets){

        }
        return friendMaps.stream();
    }

    @Override
    public List<User> findByPet(Pet pet) {
        return friendRepository.findByPetAndStatus(pet, FriendMap.Status.READY);
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
}
