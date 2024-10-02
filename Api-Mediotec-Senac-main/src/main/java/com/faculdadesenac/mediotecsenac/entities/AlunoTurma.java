package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "alunos_turmas")
public class AlunoTurma implements Serializable {

    @EmbeddedId
    private AlunoTurmaId id;

    @ManyToOne
    @MapsId("alunoId")
    @JoinColumn(name = "aluno_id")
    private Usuario aluno;

    @ManyToOne
    @MapsId("turmaId")
    @JoinColumn(name = "turma_id")
    private Turma turma;

    public AlunoTurma() {}

    public AlunoTurma(Usuario aluno, Turma turma) {
        this.aluno = aluno;
        this.turma = turma;
        this.id = new AlunoTurmaId(aluno.getId(), turma.getId());
    }

    public AlunoTurmaId getId() {
        return id;
    }

    public void setId(AlunoTurmaId id) {
        this.id = id;
    }

    public Usuario getAluno() {
        return aluno;
    }

    public void setAluno(Usuario aluno) {
        this.aluno = aluno;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlunoTurma that = (AlunoTurma) o;
        return Objects.equals(aluno, that.aluno) &&
                Objects.equals(turma, that.turma);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aluno, turma);
    }
}
