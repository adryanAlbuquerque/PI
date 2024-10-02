package com.faculdadesenac.mediotecsenac.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tb_usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoUsuario tipoUsuario;

    @OneToMany(mappedBy = "professor")
    private List<ProfessorDisciplina> disciplinas;

    @OneToMany(mappedBy = "aluno")
    private List<Conceito> conceitos;

    @OneToMany(mappedBy = "aluno")
    private List<AlunoTurma> turmas;

    @OneToMany(mappedBy = "autor")
    @JsonIgnore
    private List<Comunicado> comunicados;

    public Usuario() {}

    public Usuario(Long id, String nome, String email, String senha, TipoUsuario tipoUsuario, List<ProfessorDisciplina> disciplinas, List<Conceito> conceitos, List<AlunoTurma> turmas, List<Comunicado> comunicados) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
        this.disciplinas = disciplinas;
        this.conceitos = conceitos;
        this.turmas = turmas;
        this.comunicados = comunicados;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public List<ProfessorDisciplina> getDisciplinas() {
        return disciplinas;
    }

    public void setDisciplinas(List<ProfessorDisciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }

    public List<Conceito> getConceitos() {
        return conceitos;
    }

    public void setConceitos(List<Conceito> conceitos) {
        this.conceitos = conceitos;
    }

    public List<AlunoTurma> getTurmas() {
        return turmas;
    }

    public void setTurmas(List<AlunoTurma> turmas) {
        this.turmas = turmas;
    }

    public List<Comunicado> getComunicados() {
        return comunicados;
    }

    public void setComunicados(List<Comunicado> comunicados) {
        this.comunicados = comunicados;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
