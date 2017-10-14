/**
 * 
 */
package com.daou.petstorage.Story.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.daou.petstorage.Core.domain.BaseEntity;
import com.daou.petstorage.Storage.domain.Storage;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Create by hsim on 2017. 8. 18.
 */

@NoArgsConstructor
@Getter
@Setter
@Entity
public class StoryStorageMap extends BaseEntity {
	
	public StoryStorageMap(Story story, Storage storage) {
		super();
		this.story = story;
		this.storage = storage;
	}

	@ManyToOne
	private Story story;
	
	@ManyToOne
	private Storage storage;
}
