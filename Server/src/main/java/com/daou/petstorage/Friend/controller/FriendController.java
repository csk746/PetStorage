
package com.daou.petstorage.Friend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.model.FriendPetModel;
import com.daou.petstorage.Friend.service.FriendService;
import com.daou.petstorage.Pet.controller.PetController;
import com.daou.petstorage.Pet.model.PetModel;
import com.daou.petstorage.PetMap.domain.PetUserMap;
import com.daou.petstorage.Security.SpringSecurityContext;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
@RestController
@RequestMapping("/friend")
public class FriendController {

    @Autowired
    FriendService friendService;

    @Autowired
    SpringSecurityContext springSecurityContext;

    private static final Logger log = LoggerFactory.getLogger(PetController.class);

    @GetMapping(value ="/user/{userId}")
    public @ResponseBody FriendPetModel getAnotherUserPetList(@PathVariable long userId){
    	return this.friendService.getFriendPets(userId);
    }
    
    @GetMapping(value ="/pet")
    public @ResponseBody List<FriendMap> getMyPetFirends(){
        return friendService.findFollowPets();
    }

    @GetMapping(value ="/request/receive")
    public @ResponseBody List<FriendMap> getReceiveRequests(){
        return friendService.findRequests();
    }

    @PostMapping(value ="/accessControl")
    public @ResponseBody PetUserMap setAccessControl(@RequestBody PetUserMap puMap){
        return friendService.setAccessControl(puMap);
    }
    
    @PostMapping(value ="/request/{petId}")
    public FriendMap requestFriend(@PathVariable long petId){
        return friendService.requestFriend(petId);
    }

    @PostMapping(value ="/reject/{petId}/{userId}")
    public FriendMap rejectFriend(@PathVariable long petId, @PathVariable long userId){
        return friendService.rejectFriend(petId, userId);

    }

    @PostMapping(value ="/approve/{petId}/{userId}")
    public FriendMap approveFriend(@PathVariable long petId, @PathVariable long userId){
        return friendService.approveFirend(petId, userId);

    }
}
