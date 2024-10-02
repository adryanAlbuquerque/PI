package com.faculdadesenac.mediotecsenac.services;

import com.faculdadesenac.mediotecsenac.entities.AlunoTurma;
import com.faculdadesenac.mediotecsenac.repositories.AlunoTurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoTurmaService {
    @Autowired
    private AlunoTurmaRepository repository;

    public List<AlunoTurma> buscarTodos() {
        return repository.findAll();
    }

    public AlunoTurma buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AlunoTurma salvar(AlunoTurma alunoTurma) {
        return repository.save(alunoTurma);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
