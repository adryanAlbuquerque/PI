package com.faculdadesenac.mediotecsenac.services;

import com.faculdadesenac.mediotecsenac.entities.Conceito;
import com.faculdadesenac.mediotecsenac.repositories.ConceitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConceitoService {
    @Autowired
    private ConceitoRepository repository;

    public List<Conceito> buscarTodos() {
        return repository.findAll();
    }

    public Conceito buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Conceito salvar(Conceito conceito) {
        return repository.save(conceito);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
