package com.daou.petstorage.Storage.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;

import javax.persistence.EntityManager;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.jpa.internal.EntityManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by hsim on 2017. 8. 12...
 * 
 */
@Component
public class BlobConverter {
	
	@Autowired
	private EntityManager entityManager; 
	
	
	public Blob multiPartFileToBlob(MultipartFile mFile){
		
		Session hSession = ((EntityManagerImpl)entityManager.getDelegate()).getSession();
		
		try {
			return Hibernate.getLobCreator(hSession).createBlob(mFile.getInputStream(), mFile.getSize());
		} catch (HibernateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null ;
	}
	
	public Blob inputStreamToBlob(InputStream is, long length){
		Session hSession = ((EntityManagerImpl)entityManager.getDelegate()).getSession();
		return Hibernate.getLobCreator(hSession).createBlob(is, length);
	}
		
	public Blob fileToBlob(File f ){
		if ( f == null || !f.exists() ) return null ; 
		
		Session hSession = ((EntityManagerImpl)entityManager.getDelegate()).getSession();
		
		InputStream is;
		try {
			is = new FileInputStream(f);
		return Hibernate.getLobCreator(hSession).createBlob(is, f.length());
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null ;
	}

	

}
