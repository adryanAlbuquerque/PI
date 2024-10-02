package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tb_comunicados")
public class Comunicado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String conteudo;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Usuario autor;

    @ManyToMany
    @JoinTable(
            name = "tb_comunicado_destinatarios",
            joinColumns = @JoinColumn(name = "comunicado_id"),
            inverseJoinColumns = @JoinColumn(name = "destinatario_id")
    )
    private List<Usuario> destinatarios;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    public Comunicado() {
        this.dataCriacao = LocalDateTime.now();
    }

    public Comunicado(Long id, LocalDateTime dataCriacao, List<Usuario> destinatarios, Usuario autor, String conteudo, String titulo) {
        this.id = id;
        this.dataCriacao = dataCriacao;
        this.destinatarios = destinatarios;
        this.autor = autor;
        this.conteudo = conteudo;
        this.titulo = titulo;
    }

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

    public Usuario getAutor() {
        return autor;
    }

    public void setAutor(Usuario autor) {
        this.autor = autor;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public List<Usuario> getDestinatarios() {
        return destinatarios;
    }

    public void setDestinatarios(List<Usuario> destinatarios) {
        this.destinatarios = destinatarios;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comunicado comunicado = (Comunicado) o;
        return Objects.equals(id, comunicado.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
