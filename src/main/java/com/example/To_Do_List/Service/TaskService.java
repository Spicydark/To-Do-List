package com.example.To_Do_List.Service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.To_Do_List.DTO.TaskSearchRequest;
import com.example.To_Do_List.Model.Task;
import com.example.To_Do_List.Repository.TaskRepo;
import com.example.To_Do_List.Specification.TaskSpecification;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepo repo;

    public List<Task> getAllTasks() {

        return repo.findAll();

    }

    public Task addTasks(Task task) {
        
        return repo.save(task);
    }

    public List<Task> searchTasks(TaskSearchRequest request) {
        return repo.findAll(TaskSpecification.filterTasks(request));
    }

    public int deleteTasks(TaskSearchRequest request) {
        List<Task> tasksToDelete = repo.findAll(TaskSpecification.filterTasks(request));
        
        if (tasksToDelete.isEmpty()) {
            return 0;
        }
    
        repo.deleteAll(tasksToDelete);
        return tasksToDelete.size();
    }

    public List<Task> markTasksAsDone(TaskSearchRequest request) {
        List<Task> tasks = repo.findAll(TaskSpecification.filterTasks(request));
    
        if (tasks.isEmpty()) {
            return Collections.emptyList(); // No matching tasks
        }
    
        for (Task task : tasks) {
            task.setStatus("Done"); // Mark each found task as Done
        }
    
        return repo.saveAll(tasks); // Save all updated tasks
    }
    
    
}
