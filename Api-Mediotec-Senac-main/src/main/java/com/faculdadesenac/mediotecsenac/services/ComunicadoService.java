package com.faculdadesenac.mediotecsenac.services;

import com.faculdadesenac.mediotecsenac.entities.Comunicado;
import com.faculdadesenac.mediotecsenac.entities.Usuario;
import com.faculdadesenac.mediotecsenac.repositories.ComunicadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComunicadoService {
    @Autowired
    private ComunicadoRepository repository;

    @Autowired
    private UsuarioService usuarioService;

    public List<Comunicado> buscarTodos() {
        return repository.findAll();
    }

    public Comunicado buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Comunicado salvar(Comunicado comunicado) {
        return repository.save(comunicado);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
    public Usuario buscarUsuarioPorId(Long id) {
        return usuarioService.buscarUsuarioPorId(id);
    }
}
