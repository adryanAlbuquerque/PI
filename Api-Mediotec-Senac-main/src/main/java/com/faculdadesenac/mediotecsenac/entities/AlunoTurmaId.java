package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AlunoTurmaId implements Serializable {

    private Long alunoId;
    private Long turmaId;

    public AlunoTurmaId() {}

    public AlunoTurmaId(Long alunoId, Long turmaId) {
        this.alunoId = alunoId;
        this.turmaId = turmaId;
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
    }

    public Long getTurmaId() {
        return turmaId;
    }

    public void setTurmaId(Long turmaId) {
        this.turmaId = turmaId;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlunoTurmaId that = (AlunoTurmaId) o;
        return Objects.equals(alunoId, that.alunoId) &&
                Objects.equals(turmaId, that.turmaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(alunoId, turmaId);
    }
}

