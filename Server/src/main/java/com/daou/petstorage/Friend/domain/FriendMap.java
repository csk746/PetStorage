package com.daou.petstorage.Friend.domain;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.PetMap.domain.PetUserMap;
import com.daou.petstorage.User.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
public class FriendMap extends BaseEntity{

    @OneToOne
    private Pet pet;

    @OneToOne
    private User user;

    @Column
    private Status status ;
    
    @ManyToOne PetUserMap petUserMap ; 

    public enum Status {

        SUCCESS("SUCCESS"), READY("READY"), REJECT("REJECT");

        private final String value;

        Status(String value) {
            this.value = value;
        }
    }
}
