package com.daou.petstorage.Config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.daou.petstorage.interceptor.PageParameterResolver;
import com.daou.petstorage.interceptor.ParameterResolver;

@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter {

	@Autowired 
	HandlerInterceptor PetStorageInterceptor ;

	@Autowired ParameterResolver parameterResolver ;
	@Autowired PageParameterResolver pageParamaeterResolver;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(this.PetStorageInterceptor);

	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		// TODO Auto-generated method stub
		argumentResolvers.add(parameterResolver);
		argumentResolvers.add(pageParamaeterResolver);

	}


}