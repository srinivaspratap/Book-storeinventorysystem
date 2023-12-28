package com.example.indidemo.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="cartdata")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="bookid")
    private int bookid;
    @Column(name="name")
    private String name;
    @Column(name="description")
    private String description;
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
    @Override
    public String toString() {
        return "CartItem [id=" + id + ", bookid=" + bookid + ", name=" + name + ", description=" + description + "]";
    }

    
}
