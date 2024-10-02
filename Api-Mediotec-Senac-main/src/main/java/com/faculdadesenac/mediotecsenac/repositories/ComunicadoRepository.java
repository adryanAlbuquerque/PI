package com.faculdadesenac.mediotecsenac.repositories;

import com.faculdadesenac.mediotecsenac.entities.Comunicado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComunicadoRepository extends JpaRepository<Comunicado, Long> {
}
