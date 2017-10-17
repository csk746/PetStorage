package com.daou.petstorage.Friend.model;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Core.model.BaseModel;
import com.daou.petstorage.Storage.domain.Storage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by geonheelee on 2017. 10. 17..
 */
@NoArgsConstructor
@Getter
@Setter
public class PetModel{
    private String name ;
    private String url;
    private Storage profile;
}
