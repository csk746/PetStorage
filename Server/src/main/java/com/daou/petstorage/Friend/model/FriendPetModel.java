/**
 * 
 */
package com.daou.petstorage.Friend.model;

import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import com.daou.petstorage.Friend.domain.FriendMap;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Pet.model.PetModel;
import com.daou.petstorage.User.domain.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

/**
 * Create by hsim on 2017. 10. 17.
 */
@Log4j
@Getter
@Setter
@NoArgsConstructor
public class FriendPetModel {

	private User user ; 
	private List<PetModel> pets ; 
	
	public void addPets(List<Pet> ps){
		if ( ps == null) return ; 
		if ( this.pets == null) this.pets = new ArrayList<>();
		for ( Pet pet : ps){
			this.pets.add(new PetModel(pet));
		}
	}
	
	public void setFriendMap(FriendMap map ){
		if ( map == null) return ; 
		assertNotNull(this.user);
		
		if ( pets != null && map.getPet() != null){
			for ( PetModel pet : pets){
				if ( pet.getId() == map.getPet().getId()){
					pet.setStatus(map.getStatus());
				}
			}
		}
	}
	
	public void setFriendMaps(List<FriendMap> maps){
		assertNotNull(maps);
		for ( FriendMap map : maps){
			this.setFriendMap(map);
		}
	}
}
