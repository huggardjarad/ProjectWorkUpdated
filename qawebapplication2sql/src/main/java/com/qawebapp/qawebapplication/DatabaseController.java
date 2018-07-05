package com.qawebapp.qawebapplication;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping(path="/app")
public class DatabaseController {
    @Autowired
    private EmployeeRepo employeeRepo;

    @RequestMapping(path="/add", method = RequestMethod.POST)
    public @ResponseBody String addNewUser(@RequestBody Employee employee){

        employeeRepo.save(employee);
        return "Added User";
    }
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Employee> getAllEmployees(){
        return employeeRepo.findAll();
    }

    @DeleteMapping(path="/remove/{id}")
    public @ResponseBody String deleteUser(@PathVariable long id){

        employeeRepo.deleteById(id);
        return "Deleted User";
    }

}
