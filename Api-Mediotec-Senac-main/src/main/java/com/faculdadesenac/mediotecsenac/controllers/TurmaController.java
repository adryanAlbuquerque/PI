package com.faculdadesenac.mediotecsenac.controllers;

import com.faculdadesenac.mediotecsenac.entities.Turma;
import com.faculdadesenac.mediotecsenac.services.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turmas")
public class TurmaController {

    @Autowired
    private TurmaService service;

    @GetMapping
    public ResponseEntity<List<Turma>> buscarTodas() {
        List<Turma> lista = service.buscarTodas();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> buscarPorId(@PathVariable Long id) {
        Turma turma = service.buscarPorId(id);
        return turma != null ? new ResponseEntity<>(turma, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Turma> criar(@RequestBody Turma turma) {
        Turma salva = service.salvar(turma);
        return new ResponseEntity<>(salva, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Turma> atualizar(@PathVariable Long id, @RequestBody Turma turma) {
        Turma existente = service.buscarPorId(id);
        if (existente != null) {
            existente.setNome(turma.getNome()); // Nome da turma
            existente.setDisciplinas(turma.getDisciplinas()); // Relação com disciplinas
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
