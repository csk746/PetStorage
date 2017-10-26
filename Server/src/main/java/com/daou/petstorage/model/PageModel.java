/**
 * 
 */
package com.daou.petstorage.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Create by hsim on 2017. 10. 20.
 */

@Getter
@Setter
public class PageModel {

	private int size = 15; 
	private int page = 0 ; 
	private String field = "createdAt"; 
	private String order = "desc"; 
	
	public void setOffset(int offset){
		this.size = offset ; 
	}
	
	public void setOffSet(int offset){
		this.size = offset ; 
	}
}
