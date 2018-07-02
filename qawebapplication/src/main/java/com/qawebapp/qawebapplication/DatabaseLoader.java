package com.qawebapp.qawebapplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepo repository;

    @Autowired
    public DatabaseLoader(EmployeeRepo repository){
        this.repository = repository;
    }
    @Override
    public void run(String... strings)throws Exception{
        this.repository.save(new Employee("Jim","Manfield", "j.m@gmail.com", "jimmyDaBomb"));
        this.repository.save(new Employee("Frank","Crabperson", "frankythecrab@gmail.com", "crabHandLuke"));
        this.repository.save(new Employee("Luke","Bingolottery", "bingoMan@gmail.com", "ILoveBingo22"));
    }
}
