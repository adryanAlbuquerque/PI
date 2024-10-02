package com.faculdadesenac.mediotecsenac.controllers;

import com.faculdadesenac.mediotecsenac.entities.Conceito;
import com.faculdadesenac.mediotecsenac.services.ConceitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conceitos")
public class ConceitoController {

    @Autowired
    private ConceitoService service;

    @GetMapping
    public ResponseEntity<List<Conceito>> buscarTodos() {
        List<Conceito> lista = service.buscarTodos();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conceito> buscarPorId(@PathVariable Long id) {
        Conceito conceito = service.buscarPorId(id);
        return conceito != null ? new ResponseEntity<>(conceito, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Conceito> criar(@RequestBody Conceito conceito) {
        Conceito salvo = service.salvar(conceito);
        return new ResponseEntity<>(salvo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conceito> atualizar(@PathVariable Long id, @RequestBody Conceito conceito) {
        Conceito existente = service.buscarPorId(id);
        if (existente != null) {
            existente.setConceito(conceito.getConceito());
            existente.setAluno(conceito.getAluno()); //
            existente.setDisciplina(conceito.getDisciplina()); //
            service.salvar(existente);
            return new ResponseEntity<>(existente, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
