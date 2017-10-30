package com.daou.petstorage.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import com.daou.petstorage.Security.account.AccountUserDetailsService;

/**
 * Created by geonheelee on 2017. 8. 11..
 */
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private ShaPasswordEncoder passwordEncoder;
	
	@Autowired 
	private AccountUserDetailsService userDetailsService ; 

	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER).and()
        .authorizeRequests()
        .antMatchers("/user/login").permitAll()
      //  .anyRequest().authenticated()
        .anyRequest().permitAll()
		.and().logout().logoutSuccessUrl("/");

        
    }
    
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}


}
