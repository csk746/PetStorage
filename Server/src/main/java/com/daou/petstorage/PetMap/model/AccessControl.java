/**
 * 
 */
package com.daou.petstorage.PetMap.model;

/**
 * Create by hsim on 2017. 8. 18.
 */
public enum AccessControl {
	
	MASTER(0), READ(1),WRITE(2);

	private final int value;
	
	AccessControl(int value){
		this.value = value ; 
	}
	
	public int getBitValue(){
		return 1 << this.value ;
	}
	
	public boolean isAccess(int v){
		return (v & this.getBitValue()) > 0 ;
	}
		
	public static int getAllAccessValue(){
		
		AccessControl [] values = AccessControl.values();
		
		int acValue = 0 ; 
		
		for ( AccessControl ac : values){
			acValue |= ac.getBitValue();
		}
		
		return acValue ; 
	}
	

	public static int getAccessValue(AccessControl ...values){
		
		if ( values == null ) return 0 ; 
		int acValue = 0 ; 
		
		for ( AccessControl ac : values){
			acValue |= ac.getBitValue();
		}
		
		return acValue ; 
	}
	
}
