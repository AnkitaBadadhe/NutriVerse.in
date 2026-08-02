package com.nutriverse.domain.repository;

import com.nutriverse.domain.model.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, UUID> {
    List<Practitioner> findBySpecialty(String specialty);
    List<Practitioner> findByIsAvailableTrue();
}
