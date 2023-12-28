package com.example.indidemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.indidemo.model.User;

public interface UserRepository extends JpaRepository<User,Integer>{
    User findByNameAndPasswd(String name,String passwd);
}
