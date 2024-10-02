package com.faculdadesenac.mediotecsenac.dto;

import java.util.List;

public class ComunicadoResponseDTO {
    private Long id;
    private String titulo;
    private String conteudo;
    private Long autorId;
    private List<Long> destinatariosIds;

    // Construtores
    public ComunicadoResponseDTO() {}

    public ComunicadoResponseDTO(Long id, String titulo, String conteudo, Long autorId, List<Long> destinatariosIds) {
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.autorId = autorId;
        this.destinatariosIds = destinatariosIds;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Long getAutorId() {
        return autorId;
    }

    public void setAutorId(Long autorId) {
        this.autorId = autorId;
    }

    public List<Long> getDestinatariosIds() {
        return destinatariosIds;
    }

    public void setDestinatariosIds(List<Long> destinatariosIds) {
        this.destinatariosIds = destinatariosIds;
    }
}
