package com.daou.petstorage.Storage.controller;

import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.daou.petstorage.Storage.domain.Storage;
import com.daou.petstorage.Storage.model.StorageListModel;
import com.daou.petstorage.Storage.service.StorageService;
import com.daou.petstorage.security.SpringSecurityContext;
import com.daou.petstorage.util.SortUtil;

/**
 * Created by hsim on 2017. 8. 13...
 */
@RestController 
@RequestMapping("/storage") 
public class StorageController {

	private static final Logger log = LoggerFactory.getLogger(StorageController.class);
	
	@Autowired private SpringSecurityContext securityContext ; 
	
	@Autowired private StorageService storageService ;
	
	@RequestMapping(value="/image/{petId}", method=RequestMethod.POST) 
	public void imageUpload( MultipartHttpServletRequest multiPartReq ,  @PathVariable long petId,  HttpServletResponse res ) {
		log.info("image upload request pet id : " + petId   + " and user = " + this.securityContext.getUser().getLoginId());
		MultipartFile file = multiPartReq.getFile("image");
		this.storageService.saveImageFile(file, petId);
		
	}
	
	@RequestMapping(value="/list/{petId}", method=RequestMethod.GET) 
	public @ResponseBody StorageListModel getImageList( @PathVariable long petId, HttpServletResponse res,
			@RequestParam(defaultValue = "0",   value = "page") int page,
			@RequestParam(defaultValue = "100",   value = "size") int size,
			@RequestParam(defaultValue = "id",  value = "field") String field,
			@RequestParam(defaultValue = "asc", value = "order") String order){
		
		log.info("request image list petId : " + petId + " page : " + page + " size : " + size + " field : " + field + " order : " + order);
		
		Sort sort = SortUtil.direction(order, field);
		Pageable pageRequest = new PageRequest(page, size, sort);
		
		return this.storageService.getFileList(petId, pageRequest);
	}
	
	@RequestMapping(value="/image/{fileName}", method=RequestMethod.GET) 
	public void getImageFile( @PathVariable String fileName, HttpServletResponse res){
		
		Storage storage = this.storageService.getStorageByFileName(fileName);
		
		if ( storage == null){
			res.setStatus(HttpStatus.NOT_FOUND.value());
			return ; 
		}
		
		res.setContentType("applicaiton/download;charset=utf-8");
		res.setHeader("Content-Disposition", "attachment; filename=\""+ fileName + ".jpg\";");
		res.setHeader("Content-Transfer-Encoding", "binary");

		try{
			ServletOutputStream outs = res.getOutputStream();
			outs.write(storage.getImage().getBytes(1, (int) storage.getImage().length()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
		
}




