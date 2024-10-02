package com.faculdadesenac.mediotecsenac.controllers;

import com.faculdadesenac.mediotecsenac.entities.AlunoTurma;
import com.faculdadesenac.mediotecsenac.services.AlunoTurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aluno-turmas")
public class AlunoTurmaController {

    @Autowired
    private AlunoTurmaService service;

    @GetMapping
    public ResponseEntity<List<AlunoTurma>> buscarTodos() {
        List<AlunoTurma> lista = service.buscarTodos();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoTurma> buscarPorId(@PathVariable Long id) {
        AlunoTurma alunoTurma = service.buscarPorId(id);
        return alunoTurma != null ? new ResponseEntity<>(alunoTurma, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<AlunoTurma> criar(@RequestBody AlunoTurma alunoTurma) {
        AlunoTurma salvo = service.salvar(alunoTurma);
        return new ResponseEntity<>(salvo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoTurma> atualizar(@PathVariable Long id, @RequestBody AlunoTurma alunoTurma) {
        AlunoTurma existente = service.buscarPorId(id);
        if (existente != null) {
            existente.setAluno(alunoTurma.getAluno()); // Supondo relação com Aluno
            existente.setTurma(alunoTurma.getTurma()); // Supondo relação com Turma
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
