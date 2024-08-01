package com.soufiane.soufiane.service;

import com.soufiane.soufiane.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
