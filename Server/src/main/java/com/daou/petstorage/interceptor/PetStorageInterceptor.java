/**
 * 
 */
package com.daou.petstorage.interceptor;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.daou.petstorage.Security.SpringSecurityContext;

import lombok.extern.slf4j.Slf4j;

/**
 * Create by hsim on 2017. 9. 8.
 */
@Slf4j
@Component
public class PetStorageInterceptor implements HandlerInterceptor{

	@Autowired private SpringSecurityContext securityContext ; 
	
	private static final Logger log = LoggerFactory.getLogger(PetStorageInterceptor.class);
	
		
	private String getParameterStr(HttpServletRequest req){

		Map<String, String[]>	paramMap = req.getParameterMap();
		String str ="";
		
		for ( String key : paramMap.keySet()){
			str += key + " : " +req.getParameter(key) + "\n";
		}
		
		return str ; 
	}

	private String getHeaderStr(HttpServletRequest req){

		Enumeration<String> headers = req.getHeaderNames();
		String headerStr = "";
		
		while ( headers.hasMoreElements()){
			String hn = headers.nextElement();
			headerStr += hn +  " : " ;
			headerStr += req.getHeader(hn) + "\n";
		}
		return headerStr;
		
	}
	
	private String getHttpFullStr(HttpServletRequest req){
		
		String str = "\n------------------------------------------------------------------------\n";
		if ( this.securityContext != null && this.securityContext.getUser() != null){
			str += "Request User :  " + this.securityContext.getUser().toString();
			str += "\n------------------------------------------------------------------------\n";
		}
		str += "Request Method :  " + req.getMethod() ;
		str += "\n------------------------------------------------------------------------\n";
		str += "Request Url : " +  req.getRequestURL()  ;
		str += "\n------------------------------------------------------------------------\n";
		str += "Request client ip : "   + req.getRemoteAddr()  ; 
		str += "\n------------------------------------------------------------------------\n";
		
		
		str += "HEADER\n------------------------------------------------------------------------\n";
		str +=  this.getHeaderStr(req) ;
		if ( req.getParameterNames() != null && req.getParameterNames().hasMoreElements()){
			str += "PARAMETER\n------------------------------------------------------------------------\n";
			str +=  this.getParameterStr(req);
		}
		str += "\n------------------------------------------------------------------------\n";
		
		
		
		return str ; 
	}
	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.HandlerInterceptor#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		
		//log.info(this.getHttpFullStr(request));
		return true;
	}

	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.HandlerInterceptor#postHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, org.springframework.web.servlet.ModelAndView)
	 */
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.HandlerInterceptor#afterCompletion(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
	 */
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
		
	}
}
