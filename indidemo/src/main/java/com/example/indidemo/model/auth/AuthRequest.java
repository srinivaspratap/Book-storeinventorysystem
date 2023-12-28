package com.example.indidemo.model.auth;

public class AuthRequest {
    private String name;
    private String passwd;
    private String position;

    public AuthRequest() {
    }

    // Constructor with only the necessary fields
    public AuthRequest(String name, String passwd, String position) {
        this.name = name;
        this.passwd = passwd;
        this.position = position;
    }

    // Getters, setters, and toString method

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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    @Override
    public String toString() {
        return "AuthRequest [name=" + name + ", passwd=" + passwd + ", position=" + position + "]";
    }
}