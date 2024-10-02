package com.faculdadesenac.mediotecsenac.controllers;

import com.faculdadesenac.mediotecsenac.entities.ProfessorDisciplina;
import com.faculdadesenac.mediotecsenac.services.ProfessorDisciplinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professor-disciplinas")
public class ProfessorDisciplinaController {

    @Autowired
    private ProfessorDisciplinaService service;

    @GetMapping
    public ResponseEntity<List<ProfessorDisciplina>> buscarTodos() {
        List<ProfessorDisciplina> lista = service.buscarTodos();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDisciplina> buscarPorId(@PathVariable Long id) {
        ProfessorDisciplina pd = service.buscarPorId(id);
        return pd != null ? new ResponseEntity<>(pd, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ProfessorDisciplina> criar(@RequestBody ProfessorDisciplina pd) {
        ProfessorDisciplina salvo = service.salvar(pd);
        return new ResponseEntity<>(salvo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDisciplina> atualizar(@PathVariable Long id, @RequestBody ProfessorDisciplina pd) {
        ProfessorDisciplina existente = service.buscarPorId(id);
        if (existente != null) {
            existente.setProfessor(pd.getProfessor());
            existente.setDisciplina(pd.getDisciplina());
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
