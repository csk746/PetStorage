package com.daou.petstorage.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

/**
 * Created by hsim on 2017. 8. 13...
 */
@EnableAsync
@Configuration
public class SpringAsyncCoreConfig {

	private static final Logger log = LoggerFactory.getLogger(SpringAsyncCoreConfig.class);
	
	private final int corePoolSize = 5 ;
	private final int maxPoolSize = 10 ;
	private final int queueMaxSize = 50 ;
	
	@Bean
	public TaskExecutor taskExecutor() { 
		ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor(); 
		
		taskExecutor.setCorePoolSize(this.corePoolSize); 
		taskExecutor.setMaxPoolSize(this.maxPoolSize); 
		taskExecutor.setQueueCapacity(this.queueMaxSize); 
		
		return taskExecutor;
		
	}
	
	@Autowired
	private void logging(){ 
		log.info("---------------------ThreadPoolTaskExecutor Setting-----------------------");
		log.info("ThreadPoolTaskExecutor : corePoolSize : " + this.corePoolSize);
		log.info("ThreadPoolTaskExecutor : maxPoolSize : " + this.maxPoolSize);
		log.info("ThreadPoolTaskExecutor : queueMaxSize : " + this.queueMaxSize);
		log.info("---------------------ThreadPoolTaskExecutor Setting-----------------------\n");
		} 

}


