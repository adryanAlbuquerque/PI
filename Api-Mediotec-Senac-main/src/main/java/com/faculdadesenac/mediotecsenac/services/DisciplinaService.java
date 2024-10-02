package com.faculdadesenac.mediotecsenac.services;

import com.faculdadesenac.mediotecsenac.entities.Disciplina;
import com.faculdadesenac.mediotecsenac.repositories.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplinaService {
    @Autowired
    private DisciplinaRepository repository;

    public List<Disciplina> buscarTodas() {
        return repository.findAll();
    }

    public Disciplina buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Disciplina salvar(Disciplina disciplina) {
        return repository.save(disciplina);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
