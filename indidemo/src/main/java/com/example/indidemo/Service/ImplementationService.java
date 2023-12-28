package com.example.indidemo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.indidemo.model.Book;
import com.example.indidemo.repository.BookRepository;



@Service
public class ImplementationService implements BookseditService{
    @Autowired
    BookRepository bookrepo;
   

    @Override
    public Book updateBook(int bookid, Book book) {
        System.out.println("Updating book with ID: " + bookid);
        System.out.println("Updated book data: " + book);

        Book bookToUpdate = bookrepo.findById(bookid).orElseThrow();
        bookToUpdate.setBookid(book.getBookid());
        bookToUpdate.setName(book.getName());
        bookToUpdate.setDescription(book.getDescription());
        bookToUpdate.setContent(book.getContent());

        return bookrepo.save(bookToUpdate);
    }


    @Override
    public void deleteBook(int bookid) {
        try {
            bookrepo.deleteById(bookid);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            // Optionally, throw a custom exception or handle it appropriately
            throw new RuntimeException("Error deleting the book");
        }
    }
    
    
}
