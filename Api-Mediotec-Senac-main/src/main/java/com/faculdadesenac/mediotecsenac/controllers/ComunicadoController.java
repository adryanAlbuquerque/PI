package com.faculdadesenac.mediotecsenac.controllers;

import com.faculdadesenac.mediotecsenac.dto.ComunicadoDTO;
import com.faculdadesenac.mediotecsenac.dto.ComunicadoResponseDTO;
import com.faculdadesenac.mediotecsenac.entities.Comunicado;
import com.faculdadesenac.mediotecsenac.entities.Usuario;
import com.faculdadesenac.mediotecsenac.services.ComunicadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/comunicados")
public class ComunicadoController {

    @Autowired
    private ComunicadoService service;

    @GetMapping
    public ResponseEntity<List<Comunicado>> buscarTodos() {
        List<Comunicado> lista = service.buscarTodos();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comunicado> buscarPorId(@PathVariable Long id) {
        Comunicado comunicado = service.buscarPorId(id);
        return comunicado != null ? new ResponseEntity<>(comunicado, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ComunicadoResponseDTO> criar(@Valid @RequestBody ComunicadoDTO comunicadoDTO) {
        Comunicado comunicado = new Comunicado();
        comunicado.setTitulo(comunicadoDTO.getTitulo());
        comunicado.setConteudo(comunicadoDTO.getConteudo());
        comunicado.setDataCriacao(LocalDateTime.now());


        Usuario autor = service.buscarUsuarioPorId(comunicadoDTO.getAutorId());
        if (autor != null) {
            comunicado.setAutor(autor);
        }

        List<Usuario> destinatarios = new ArrayList<>();
        for (Long id : comunicadoDTO.getDestinatariosIds()) {
            Usuario destinatario = service.buscarUsuarioPorId(id);
            if (destinatario != null) {
                destinatarios.add(destinatario);
            }
        }
        comunicado.setDestinatarios(destinatarios);

        Comunicado salvo = service.salvar(comunicado);


        ComunicadoResponseDTO response = new ComunicadoResponseDTO();
        response.setId(salvo.getId());
        response.setTitulo(salvo.getTitulo());
        response.setConteudo(salvo.getConteudo());
        response.setAutorId(salvo.getAutor().getId());
        response.setDestinatariosIds(salvo.getDestinatarios().stream().map(Usuario::getId).toList());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comunicado> atualizar(@PathVariable Long id, @RequestBody Comunicado comunicado) {
        Comunicado existente = service.buscarPorId(id);
        if (existente != null) {
            existente.setConteudo(comunicado.getConteudo());
            existente.setDestinatarios(comunicado.getDestinatarios());
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
