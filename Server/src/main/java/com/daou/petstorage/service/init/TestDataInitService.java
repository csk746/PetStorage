package com.daou.petstorage.service.init;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.service.PetService;
import com.daou.petstorage.User.Service.UserService;
import com.daou.petstorage.User.domain.User;

/**
 * Created by hsim on 2017. 8. 13...
 */
@Service
public class TestDataInitService {

	private static final Logger log = LoggerFactory.getLogger(TestDataInitService.class);
	
	@Autowired private UserService userService ; 
	@Autowired private PetService petService ;
	
	
	private int getRandomNumber(){
		Random r  = new Random();
		return  r.nextInt(9000) + 1000;
		
	}
	
	private User getDefaultUser(String id, String name, String password){
		User user = new User();
		user.setLoginId(id);
		user.setName(name);
		user.setPassword(password);
		user.setEmail(id  + "@gmail.com");
		user.setGrade(0);
		user.setPhone("010-"+ this.getRandomNumber() + "-" + this.getRandomNumber());
		return user ; 
	}
	
	private Pet getDefaultPet(String name, String birthDay, String kind){
		
		Pet pet = new Pet();
		pet.setName(name);
		pet.setBirthDay(birthDay);
		pet.setKind(kind);
		
		return pet ; 
	}
	
	@Autowired
	public void setUserInit(){
		
		List<User> saveUserList = new ArrayList<>();
		
		saveUserList.add(this.getDefaultUser("admin", "관리자", "admin"));
		saveUserList.add(this.getDefaultUser("hsim", "임희섭", "1234"));
		
		this.userService.saveUser(saveUserList, true);
		
		User hsim = this.userService.getUser("hsim");
		Pet miho = getDefaultPet("미호", "2014-09-14", "스피츠");
		
		this.petService.save(miho, hsim);
		
	}

}


