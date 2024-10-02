package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProfessorDisciplinaId implements Serializable {

    private Long professorId;
    private Long disciplinaId;

    public ProfessorDisciplinaId() {}

    public ProfessorDisciplinaId(Long professorId, Long disciplinaId) {
        this.professorId = professorId;
        this.disciplinaId = disciplinaId;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
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
        ProfessorDisciplinaId that = (ProfessorDisciplinaId) o;
        return Objects.equals(professorId, that.professorId) &&
                Objects.equals(disciplinaId, that.disciplinaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(professorId, disciplinaId);
    }
}
