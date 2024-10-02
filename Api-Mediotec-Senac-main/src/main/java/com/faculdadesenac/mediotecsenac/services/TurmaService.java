package com.faculdadesenac.mediotecsenac.services;

import com.faculdadesenac.mediotecsenac.entities.Turma;
import com.faculdadesenac.mediotecsenac.repositories.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurmaService {
    @Autowired
    private TurmaRepository repository;

    public List<Turma> buscarTodas() {
        return repository.findAll();
    }

    public Turma buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Turma salvar(Turma turma) {
        return repository.save(turma);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
