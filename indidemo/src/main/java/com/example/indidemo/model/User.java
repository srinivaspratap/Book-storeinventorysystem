package com.example.indidemo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="UserDetails")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="name")
    private String name;
    @Column(name = "passwd")
    private String passwd;
    public User() {
    }
    public User(int id, String name, String passwd) {
        this.id = id;
        this.name = name;
        this.passwd = passwd;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPasswd() {
        return passwd;
    }
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", passwd=" + passwd + "]";
    }
    
}
