package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tb_disciplinas")
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @OneToMany(mappedBy = "disciplina")
    private List<ProfessorDisciplina> professores;

    @OneToMany(mappedBy = "disciplina")
    private List<Conceito> conceitos;

    @OneToMany(mappedBy = "disciplina")
    private List<TurmaDisciplina> turmas;
    public Disciplina() {}

    public Disciplina(Long id, String nome, String descricao, List<ProfessorDisciplina> professores, List<Conceito> conceitos, List<TurmaDisciplina> turmas) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.professores = professores;
        this.conceitos = conceitos;
        this.turmas = turmas;
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<ProfessorDisciplina> getProfessores() {
        return professores;
    }

    public void setProfessores(List<ProfessorDisciplina> professores) {
        this.professores = professores;
    }

    public List<Conceito> getConceitos() {
        return conceitos;
    }

    public void setConceitos(List<Conceito> conceitos) {
        this.conceitos = conceitos;
    }

    public List<TurmaDisciplina> getTurmas() {
        return turmas;
    }

    public void setTurmas(List<TurmaDisciplina> turmas) {
        this.turmas = turmas;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Disciplina that = (Disciplina) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
