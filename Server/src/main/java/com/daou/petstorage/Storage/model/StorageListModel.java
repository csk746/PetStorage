/**
 * 
 */
package com.daou.petstorage.Storage.model;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.Getter;
import lombok.Setter;

/**
 * Create by hsim on 2017. 8. 18.
 */

@Getter
@Setter
public class StorageListModel {

	private static final Logger log = LoggerFactory.getLogger(StorageListModel.class);
	
	private List<String> urlList ;
}