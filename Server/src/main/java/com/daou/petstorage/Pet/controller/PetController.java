/**
 * 
 */
package com.daou.petstorage.Pet.controller;

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

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.service.PetService;
import com.daou.petstorage.common.model.CommonRequestModel;

/**
 * Create by hsim on 2017. 8. 18.
 */


@RestController
@RequestMapping("/pet")
public class PetController {

	@Autowired
	private PetService petService ;
	
	private static final Logger log = LoggerFactory.getLogger(PetController.class);
	
	
	@PostMapping(value ="/profile")
	public @ResponseBody Pet setProfilePhoto(@RequestBody CommonRequestModel reqModel){
		log.info("reqModel : " + reqModel.toString());
		return this.petService.setProfilePhoto(reqModel);
	}
	
	@GetMapping(value = "/list")
	public @ResponseBody List<Pet> getMyPetList(){
		return this.petService.getMyPets();
	}
	
	
	@GetMapping(value = "/detail/{id}")
	public @ResponseBody Pet getPet(@PathVariable Long id){
		return this.petService.getPet(id);
	}
		
}
