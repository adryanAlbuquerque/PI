package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "turmas_disciplinas")
public class TurmaDisciplina implements Serializable {

    @EmbeddedId
    private TurmaDisciplinaId id;

    @ManyToOne
    @MapsId("turmaId")
    @JoinColumn(name = "turma_id")
    private Turma turma;

    @ManyToOne
    @MapsId("disciplinaId")
    @JoinColumn(name = "disciplina_id")
    private Disciplina disciplina;

    public TurmaDisciplina() {}

    public TurmaDisciplina(TurmaDisciplinaId id, Turma turma, Disciplina disciplina) {
        this.id = id;
        this.turma = turma;
        this.disciplina = disciplina;
    }

    public TurmaDisciplinaId getId() {
        return id;
    }

    public void setId(TurmaDisciplinaId id) {
        this.id = id;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TurmaDisciplina that = (TurmaDisciplina) o;
        return Objects.equals(turma, that.turma) &&
                Objects.equals(disciplina, that.disciplina);
    }

    @Override
    public int hashCode() {
        return Objects.hash(turma, disciplina);
    }
}
