package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "tb_conceitos")
public class Conceito implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Usuario aluno;

    @ManyToOne
    @JoinColumn(name = "disciplina_id", nullable = false)
    private Disciplina disciplina;

    @Column(nullable = false)
    private String conceito;

    public Conceito() {}

    public Conceito(Usuario aluno, Disciplina disciplina, String conceito) {
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.conceito = conceito;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getAluno() {
        return aluno;
    }

    public void setAluno(Usuario aluno) {
        this.aluno = aluno;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public String getConceito() {
        return conceito;
    }

    public void setConceito(String conceito) {
        this.conceito = conceito;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conceito conceito1 = (Conceito) o;
        return Objects.equals(aluno, conceito1.aluno) &&
                Objects.equals(disciplina, conceito1.disciplina);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aluno, disciplina);
    }
}
