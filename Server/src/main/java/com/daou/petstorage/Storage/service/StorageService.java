package com.daou.petstorage.Storage.service;

import org.springframework.web.multipart.MultipartFile;

import com.daou.petstorage.Storage.domain.Storage;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface StorageService {

	public void saveImageFile(MultipartFile file, Long petId);
	public Storage save(Storage storage );
}


