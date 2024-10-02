package com.faculdadesenac.mediotecsenac.services;

import com.faculdadesenac.mediotecsenac.entities.ProfessorDisciplina;
import com.faculdadesenac.mediotecsenac.repositories.ProfessorDisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorDisciplinaService {
    @Autowired
    private ProfessorDisciplinaRepository repository;

    public List<ProfessorDisciplina> buscarTodos() {
        return repository.findAll();
    }

    public ProfessorDisciplina buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public ProfessorDisciplina salvar(ProfessorDisciplina professorDisciplina) {
        return repository.save(professorDisciplina);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
