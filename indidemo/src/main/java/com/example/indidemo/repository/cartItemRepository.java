package com.example.indidemo.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.indidemo.model.CartItem;

public  interface cartItemRepository extends JpaRepository<CartItem,Integer>{

    
}
