package com.example.indidemo.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.indidemo.Service.ImplementationService;
import com.example.indidemo.model.Book;
import com.example.indidemo.repository.BookRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminController {

    @Autowired BookRepository bookrepo;
    @Autowired ImplementationService impser;


    @GetMapping("/getbooks")
    public List<Book> get(){
        List<Book> book=new ArrayList<>();
        bookrepo.findAll().forEach(book::add);
        return book;
    }

    


    @PostMapping("/addbook")
    public String addbook(@RequestBody Book book){
        Book boo=bookrepo.save(new Book(0,book.getBookid(),book.getName(),book.getDescription(),book.getContent()));
        return "added book";
    }

    
    @PutMapping("/updatebook/{bookid}")
    public Book update(@PathVariable int bookid, @RequestBody Book book) {
        System.out.println("Updating book with ID: " + bookid);
        System.out.println("Updated book data: " + book);
        return impser.updateBook(bookid, book);
    }


    @DeleteMapping("/deletebook/{bookid}")
    public void delete(@PathVariable int bookid){
        impser.deleteBook(bookid);
    }

}
