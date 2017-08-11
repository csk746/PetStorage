package com.daou.petstorage.test;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by geonheelee on 2017. 8. 11..
 */
@RestController
public class TestController {

    @GetMapping(value = "/test")
    public boolean test(){
        System.out.println("테스트");
        return true;
    }

}
