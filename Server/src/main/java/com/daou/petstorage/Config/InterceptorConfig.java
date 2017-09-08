package com.daou.petstorage.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter {

  @Autowired 
  HandlerInterceptor PetStorageInterceptor ;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(this.PetStorageInterceptor);
  }
}