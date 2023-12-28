package com.example.indidemo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.indidemo.model.Book;
import com.example.indidemo.model.CartItem;
import com.example.indidemo.repository.BookRepository;
import com.example.indidemo.repository.cartItemRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    BookRepository bookrepo;
    @Autowired
    cartItemRepository cartitemrepo;

    @GetMapping("/getbook")
    public List<Book> get() {
        List<Book> book = new ArrayList<>();
        bookrepo.findAll().forEach(book::add);
        return book;
    }

    @GetMapping("/getcontent/{bookid}")
    public List<String> getContentByBookId(@PathVariable int bookid) {
        System.out.println("Received bookid: " + bookid);
        List<String> contentList = bookrepo.findContentByBookid(bookid);
        return contentList;
    }

    @PostMapping("/cart/store")
    public String storeCart(@RequestBody List<CartItem> cartItems) {
        // Save cart items in the database
        cartitemrepo.saveAll(cartItems);
        return "Cart data stored successfully";
    }

    @PostMapping("/cart/remove")
    public String removeFromCart(@RequestBody List<CartItem> cartItems) 
    {
        try {
            // Remove cart items from the database
            cartitemrepo.deleteAll(cartItems);
            return "Cart data removed successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error removing cart data: " + e.getMessage();
        }
    }

    

    @GetMapping("/cart")
    public List<CartItem> gets(){
        List<CartItem> l=new ArrayList<>();
        cartitemrepo.findAll().forEach(l::add);
        return l;
    }

}
