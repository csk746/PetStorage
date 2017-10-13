package com.daou.petstorage.Core.model;

import java.util.Date;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by geonheelee on 2017. 8. 11..
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
public class BaseModel {
    private Long id;
    private Date createdAt;
    private Date updatedAt;

    public BaseModel(BaseEntity baseEntity) {
        this.id = baseEntity.getId();
        this.createdAt = baseEntity.getCreatedAt();
        this.updatedAt = baseEntity.getUpdatedAt();
    }
}
