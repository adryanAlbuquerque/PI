package com.faculdadesenac.mediotecsenac.dto;

import java.util.List;

public class ComunicadoDTO {
    private String titulo;
    private String conteudo;
    private Long autorId;
    private List<Long> destinatariosIds;

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