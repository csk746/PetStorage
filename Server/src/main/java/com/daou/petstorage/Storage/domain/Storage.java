package com.daou.petstorage.Storage.domain;

import java.io.File;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

import com.daou.petstorage.Pet.domain.Pet;
import com.daou.petstorage.Storage.util.BlobConverter;
import com.daou.petstorage.core.domain.BaseEntity;

import lombok.Getter;
import lombok.Setter;


/**
 * Created by hsim on 2017. 8. 12...
 */
@Getter
@Setter
@Entity
@Table(indexes = {@Index(columnList="fakeName")})
public class Storage extends BaseEntity{
	
	public Storage(){
		super();
	}
	public Storage(Pet pet){
		super();
		this.pet = pet ; 
	}

	@ManyToOne
	private Pet pet ;
	
	@Column
	private Blob image ; 
	
	@Column
	private String fakeName; 
	
	public InputStream getImageStream(){
		if ( this.image == null ) return null ; 
		try {
			return this.image.getBinaryStream();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null ;
		}
	}
	
	public void setImage(Blob image){
		this.image = image ; 
	}
	
	public void setImage(BlobConverter converter, File f ){
		if ( converter == null || f == null ) return ; 
		this.image = converter.fileToBlob(f);
	}
	
	public void setImage(BlobConverter converter, MultipartFile mFile ){
		if ( converter == null || mFile == null ) return ; 
		this.image = converter.multiPartFileToBlob(mFile);
	}
		
	public void setImage(BlobConverter converter, InputStream is, long length ){
		if ( converter == null || is == null || length < 1 ) return ; 
		this.image = converter.inputStreamToBlob(is, length);
	}

	
}
