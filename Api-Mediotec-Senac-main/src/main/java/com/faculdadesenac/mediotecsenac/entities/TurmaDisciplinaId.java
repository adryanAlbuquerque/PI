package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TurmaDisciplinaId implements Serializable {

    private Long turmaId;
    private Long disciplinaId;

    public TurmaDisciplinaId() {}

    public TurmaDisciplinaId(Long turmaId, Long disciplinaId) {
        this.turmaId = turmaId;
        this.disciplinaId = disciplinaId;
    }

    public Long getTurmaId() {
        return turmaId;
    }

    public void setTurmaId(Long turmaId) {
        this.turmaId = turmaId;
    }

    public Long getDisciplinaId() {
        return disciplinaId;
    }

    public void setDisciplinaId(Long disciplinaId) {
        this.disciplinaId = disciplinaId;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TurmaDisciplinaId that = (TurmaDisciplinaId) o;
        return Objects.equals(turmaId, that.turmaId) &&
                Objects.equals(disciplinaId, that.disciplinaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(turmaId, disciplinaId);
    }
}
