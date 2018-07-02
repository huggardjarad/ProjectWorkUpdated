package com.qawebapp.qawebapplication;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomepageControlApp {

    @RequestMapping("/homepage")
    public String homePage(){
        return "Homepage.html";
    }


}
