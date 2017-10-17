package com.daou.petstorage.Friend.service;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.model.FriendPetModel;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.User.domain.User;

import java.util.List;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
public interface FriendService {
    FriendPetModel getFriendPets(Long id);
    List<Pet> findMyPetFriends();
    List<FriendMap> findRequests();
    List<User> findByPet(Pet pet);
    void requestFriend(long petId);
    void appriveFirend(User user, Pet pet);
    void rejectFriend(long petId, long userId);
}
