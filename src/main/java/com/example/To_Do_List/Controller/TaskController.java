package com.example.To_Do_List.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.To_Do_List.DTO.TaskSearchRequest;
import com.example.To_Do_List.Model.Task;
import com.example.To_Do_List.Service.TaskService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class TaskController {
    
    @Autowired
    private TaskService service;

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        return new ResponseEntity<>(service.getAllTasks(), HttpStatus.OK);
    }

    @PostMapping("/tasks")
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        try {
            Task savedTask = service.addTasks(task);
            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/search")
    public List<Task> searchTasks(@RequestBody TaskSearchRequest request) {
        return service.searchTasks(request);
    }

    @DeleteMapping("/tasks/delete")
    public ResponseEntity<String> deleteTasks(@RequestBody TaskSearchRequest request) {
        int deletedCount = service.deleteTasks(request);
        if (deletedCount == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No matching tasks found.");
        }
        return ResponseEntity.ok("Deleted " + deletedCount + " task(s) successfully.");
    }

    @PatchMapping("/tasks/done")
    public ResponseEntity<?> markTasksAsDone(@RequestBody TaskSearchRequest request) {
    List<Task> updatedTasks = service.markTasksAsDone(request);
    if (updatedTasks.isEmpty()) {
        return new ResponseEntity<>("No matching tasks found", HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(updatedTasks, HttpStatus.OK);
}

}
