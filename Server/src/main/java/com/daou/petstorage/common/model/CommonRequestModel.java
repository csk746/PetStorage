/**
 * 
 */
package com.daou.petstorage.common.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Create by hsim on 2017. 9. 8.
 */
@Getter
@Setter
@ToString
public class CommonRequestModel {

	private static final Logger log = LoggerFactory.getLogger(CommonRequestModel.class);
	
	private Long id ; 
	private Long petId; 
	private String comment ; 
	private String url ; 

	private int page ; 
	private int offset ; 
	private String order ; 
	private String field ; 
	private String content ; 
	
	public String getFakeName(){
		if ( url == null ) return null ; 
		return url.replaceAll("storage", "").replaceAll("image", "").replaceAll("/", "").trim();
	}
}
