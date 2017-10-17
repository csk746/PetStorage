package com.daou.petstorage.Friend.controller;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Friend.service.FriendService;
import com.daou.petstorage.Pet.controller.PetController;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Security.SpringSecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(value ="/pet")
    public @ResponseBody
    List<Pet> getMyPetFirends(){
        return friendService.findMyPetFriends();
    }

    @GetMapping(value ="/request/receive")
    public @ResponseBody List<FriendMap> getReceiveRequests(){
        return friendService.findRequests();
    }

    @PostMapping(value ="/request/{petId}")
    public void requestFriend(@PathVariable long petId){
        friendService.requestFriend(petId);
    }

    @PostMapping(value ="/reject/{petId}/{userId}")
    public void rejectFriend(@PathVariable long petId, @PathVariable long userId){
        friendService.rejectFriend(petId, userId);

    }
}
