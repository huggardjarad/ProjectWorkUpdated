package com.qawebapp.qawebapplication;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomepageControlApp {

    @RequestMapping("/homepage")
    public String homePage(){
        return "Homepage.html";
    }


}
