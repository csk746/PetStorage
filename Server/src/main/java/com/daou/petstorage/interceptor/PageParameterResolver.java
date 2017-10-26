package com.daou.petstorage.interceptor;


import org.springframework.core.MethodParameter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.daou.petstorage.model.PageModel;
import com.daou.petstorage.util.ParameterMapper;
import com.daou.petstorage.util.SortUtil;

@Component
public class PageParameterResolver implements HandlerMethodArgumentResolver {
	
	/* (non-Javadoc)
	 * @see org.springframework.web.method.support.HandlerMethodArgumentResolver#supportsParameter(org.springframework.core.MethodParameter)
	 */
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		// TODO Auto-generated method stub
		return parameter.getParameterType() == Pageable.class ; 
	}

	/* (non-Javadoc)
	 * @see org.springframework.web.method.support.HandlerMethodArgumentResolver#resolveArgument(org.springframework.core.MethodParameter, org.springframework.web.method.support.ModelAndViewContainer, org.springframework.web.context.request.NativeWebRequest, org.springframework.web.bind.support.WebDataBinderFactory)
	 */
	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		// TODO Auto-generated method stub
		PageModel model = (PageModel) ParameterMapper.RequestParamaterToObject(webRequest, PageModel.class);
		Sort sort = SortUtil.direction(model.getOrder(), model.getField());
		return new PageRequest(model.getPage(), model.getSize(), sort);
	}

}