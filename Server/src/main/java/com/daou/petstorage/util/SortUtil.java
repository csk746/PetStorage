package com.daou.petstorage.util;

import org.springframework.data.domain.Sort;

public class SortUtil {

   public static Sort direction(String order,String field){
        Sort.Direction de;
        if (order.equals("desc")) {
            de = Sort.Direction.DESC;
        } else {
            de = Sort.Direction.ASC;
        }

        Sort.Order or = new Sort.Order(de, field);
        return new Sort(or);
    }
}
