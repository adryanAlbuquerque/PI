package com.faculdadesenac.mediotecsenac.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "professores_disciplinas")
public class ProfessorDisciplina implements Serializable {

    @EmbeddedId
    private ProfessorDisciplinaId id;

    @ManyToOne
    @MapsId("professorId")
    @JoinColumn(name = "professor_id")
    private Usuario professor;

    @ManyToOne
    @MapsId("disciplinaId")
    @JoinColumn(name = "disciplina_id")
    private Disciplina disciplina;

    public ProfessorDisciplina() {}

    public ProfessorDisciplina(ProfessorDisciplinaId id, Usuario professor, Disciplina disciplina) {
        this.id = id;
        this.professor = professor;
        this.disciplina = disciplina;
    }

    public ProfessorDisciplinaId getId() {
        return id;
    }

    public void setId(ProfessorDisciplinaId id) {
        this.id = id;
    }

    public Usuario getProfessor() {
        return professor;
    }

    public void setProfessor(Usuario professor) {
        this.professor = professor;
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
        ProfessorDisciplina that = (ProfessorDisciplina) o;
        return Objects.equals(professor, that.professor) &&
                Objects.equals(disciplina, that.disciplina);
    }

    @Override
    public int hashCode() {
        return Objects.hash(professor, disciplina);
    }


}
