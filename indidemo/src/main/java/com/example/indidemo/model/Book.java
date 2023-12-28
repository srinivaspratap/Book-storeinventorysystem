package com.example.indidemo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="BookDetails")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="boookid")
    private int bookid;
    @Column(name="name")
    private String name;
    @Column(name="description")
    private String description;
    @Column(name="Content",columnDefinition = "TEXT")
    private String content;
    public Book() {
    }
    public Book(int id, int bookid, String name, String description,String content) {
        this.id = id;
        this.bookid = bookid;
        this.name = name;
        this.description = description;
        this.content=content;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getBookid() {
        return bookid;
    }
    public void setBookid(int bookid) {
        this.bookid = bookid;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
     public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    @Override
    public String toString() {
        return "Book [id=" + id + ", bookid=" + bookid + ", name=" + name + ", description=" + description
                + ", content=" + content + "]";
    }
   
   
    
}
