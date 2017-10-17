package com.daou.petstorage.Friend.repository;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.User.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
@Repository
public interface FriendRepository extends JpaRepository<FriendMap, Long> {

    List<FriendMap> findByUserAndStatus(User user, FriendMap.Status status);

    List<FriendMap> findByPetAndStatus(Pet pet, FriendMap.Status status);

    FriendMap findByUserAndPet(User user, Pet pet);


}
