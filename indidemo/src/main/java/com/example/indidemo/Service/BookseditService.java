package com.example.indidemo.Service;

import com.example.indidemo.model.Book;

public interface BookseditService {

    public Book updateBook(int bookid,Book book);
    public void deleteBook(int bookid);
}
