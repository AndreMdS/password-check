/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.xdev.passwordcheck.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author X
 */
@Controller
public class MainController {
    
    @GetMapping("/")
    public String redirect(){
        return "redirect:/passwordVerify";
    }
    
    @GetMapping("/passwordVerify")
    public ModelAndView mainPageGet(){
        ModelAndView view = new ModelAndView("MainPage");
        return view;
    }
    
}
