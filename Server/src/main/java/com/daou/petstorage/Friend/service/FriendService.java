package com.daou.petstorage.Friend.service;

import java.util.List;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.model.FriendPetModel;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.PetMap.domain.PetUserMap;
import com.daou.petstorage.User.domain.User;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
public interface FriendService {
    List<FriendMap> findFollowPets();
    List<FriendMap> findRequests();
    List<User> findByPet(Pet pet);
    FriendMap approveFirend(long petId, long userId);
    FriendMap rejectFriend(long petId, long userId);
    FriendPetModel getFriendPets(Long id);
    FriendMap requestFriend(long petId);
    PetUserMap setAccessControl(PetUserMap pumap);
}

