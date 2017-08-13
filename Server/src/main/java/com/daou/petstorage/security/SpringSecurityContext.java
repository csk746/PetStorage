package com.daou.petstorage.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.daou.petstorage.User.domain.User;
import com.daou.petstorage.security.account.AccountUserDetails;

@Component
public class SpringSecurityContext extends SecurityContextHolder {

    public Authentication getAuthentication() {
        return getContext().getAuthentication();
    }

    public User getUser() {
    	
    	AccountUserDetails accountUser = null ; 
    			
    	try{
    		accountUser = (AccountUserDetails) getContext().getAuthentication().getPrincipal();
    	}catch(ClassCastException e){
    		getContext().setAuthentication(null);
    		return null ; 
    	}
    	
    	if ( accountUser != null)
    		return accountUser.getUser(); 
    	
    	return null ; 
    }
  
}
