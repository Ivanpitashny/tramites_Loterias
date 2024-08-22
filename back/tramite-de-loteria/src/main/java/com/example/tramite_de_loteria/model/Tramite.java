package com.example.tramite_de_loteria.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Tramite")
public class Tramite {
    public Tramite(){
        super();
    }

    public Tramite(Integer id, String estado, LocalDate fechaInicio, LocalDate fechaFin, Integer tipoTramiteId, Integer usuarioId){
        this.id = id;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.tipoTramiteId = tipoTramiteId;
        this.usuarioId = usuarioId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "t_id")
    private Integer id;

    @Column(name = "t_estado")
    private String estado;

    @Column(name = "t_fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "t_fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "tt_id")
    private Integer tipoTramiteId;

    @Column(name = "usr_id")
    private Integer usuarioId;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Integer getTipoTramiteId() {
        return tipoTramiteId;
    }

    public void setTipoTramiteId(Integer tipoTramiteId) {
        this.tipoTramiteId = tipoTramiteId;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }
}
