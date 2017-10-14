package com.daou.petstorage.Security.account;

import java.util.Arrays;
import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.daou.petstorage.User.domain.User;


public class AccountUserDetails implements UserDetails {

	private static final Logger log = LoggerFactory.getLogger(AccountUserDetails.class);
	
	private static final long serialVersionUID = 1L;

	private User user;
	private String token;

	public AccountUserDetails(User account  ) {
		this.user = account;
	}
	
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Arrays.asList(new SimpleGrantedAuthority("USER" + user));
	}
	
	public String getUserId(){
		return this.user.getLoginId() ; 
	}
	
	public Long getId() {
		return this.user.getId();
	}

	public String getPassword() {
		return this.user.getPassword();
	}

	public String getUsername() {
		return this.user.getLoginId();
	}
	
	public String getLoginId() {
		return this.user.getLoginId();
	}

	public String getEmail() {
		return this.user.getEmail();
	}

	public String getName() {
		return this.user.getName();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	public String getProfileUrl(){
		if ( this.user.getProfile() != null){
			log.info("profile url :" + this.user.getProfile().getUrl());
			return this.user.getProfile().getUrl();
		}
		else{
			return "";
		}
	}

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetails#isAccountNonExpired()
	 */
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetails#isAccountNonLocked()
	 */
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetails#isCredentialsNonExpired()
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetails#isEnabled()
	 */
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
