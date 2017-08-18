package com.daou.petstorage.Storage.service;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.model.StorageListModel;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface StorageService {

	public void saveImageFile(MultipartFile file, Long petId);
	public Storage save(Storage storage );
	public Storage getStorageByFileName(String fileName);
	public StorageListModel getFileList(Long petId, Pageable pageable);
}


