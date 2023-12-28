package com.example.indidemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.indidemo.model.Book;

public interface BookRepository extends JpaRepository<Book,Integer>{
    List<Book> findByBookid(int bookid);
    @Query("SELECT b.content FROM Book b WHERE b.bookid = :bookid")
    List<String> findContentByBookid(int bookid);
}
