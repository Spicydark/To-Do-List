package com.example.To_Do_List.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.To_Do_List.Model.Task;

@Repository
public interface TaskRepo extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task>{
    
    // @Query("SELECT t from Task t WHERE "+
    // "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    // "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    // List<Task> searchTasks(String keyword);
}
