package com.example.indidemo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="AdminDetails")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name="position")
    private String position;
    @Column(name="passwd")
    private String passwd;
    public Admin() {
    }
    public Admin(int id, String name, String position, String passwd) {
        this.id = id;
        this.name = name;
        this.position = position;
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
    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }
    public String getPasswd() {
        return passwd;
    }
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
    @Override
    public String toString() {
        return "Admin [id=" + id + ", name=" + name + ", position=" + position + ", passwd=" + passwd + "]";
    }
    
}
