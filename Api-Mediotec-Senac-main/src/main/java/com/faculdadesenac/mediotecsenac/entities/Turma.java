package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tb_turmas")
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String ano;
    @Column(nullable = false)
    private String semestre;

    @OneToMany(mappedBy = "turma")
    private List<TurmaDisciplina> disciplinas;

    @OneToMany(mappedBy = "turma")
    private List<AlunoTurma> alunos;

    public Turma() {}

    public Turma(Long id, String nome, String ano, String semestre, List<TurmaDisciplina> disciplinas, List<AlunoTurma> alunos) {
        this.id = id;
        this.nome = nome;
        this.ano = ano;
        this.semestre = semestre;
        this.disciplinas = disciplinas;
        this.alunos = alunos;
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

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getSemestre() {
        return semestre;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }

    public List<TurmaDisciplina> getDisciplinas() {
        return disciplinas;
    }

    public void setDisciplinas(List<TurmaDisciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }

    public List<AlunoTurma> getAlunos() {
        return alunos;
    }

    public void setAlunos(List<AlunoTurma> alunos) {
        this.alunos = alunos;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Turma turma = (Turma) o;
        return Objects.equals(id, turma.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
