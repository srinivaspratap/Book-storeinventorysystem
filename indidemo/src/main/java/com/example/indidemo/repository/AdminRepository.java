package com.example.indidemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.indidemo.model.Admin;

public interface AdminRepository extends JpaRepository<Admin ,Integer>{
    Admin findByNameAndPositionAndPasswd(String name,String position,String passwd);
}
