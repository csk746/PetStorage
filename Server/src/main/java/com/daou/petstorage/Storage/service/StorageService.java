package com.daou.petstorage.Storage.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.daou.petstorage.Storage.domain.Storage;

/**
 * Created by hsim on 2017. 8. 13...
 */
public interface StorageService {

	public void saveImageFile(MultipartFile file, Long petId);
	public Storage save(Storage storage );
	public Storage getStorageByFileName(String fileName);
	public List<String> getFileList(Long petId, Pageable pageable);
}


