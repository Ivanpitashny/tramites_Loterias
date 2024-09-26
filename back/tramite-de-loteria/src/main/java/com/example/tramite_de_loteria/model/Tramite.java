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

    public Tramite(Integer id, String tipo, String estado, LocalDate fecha_inicio, LocalDate fecha_fin, Integer usuarioId, String nombre, Integer nro_seguimiento, String motivo, String localidad, Integer permiso, String agente, String sub_agente, String razon_social, String domicilio_comercial, String observaciones){
        this.id = id;
        this.tipo = tipo;
        this.estado = estado;
        this.fechaInicio = fecha_inicio;
        this.fechaFin = fecha_fin;
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.nro_seguimiento = nro_seguimiento;
        this.motivo = motivo;
        this.localidad = localidad;
        this.permiso = permiso;
        this.agente = agente;
        this.sub_agente = sub_agente;
        this.razon_social = razon_social;
        this.domicilio_comercial = domicilio_comercial;
        this.observaciones = observaciones;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "t_id")
    private Integer id;

    @Column(name = "t_tipo")
    private String tipo;

    @Column(name = "t_estado")
    private String estado;

    @Column(name = "t_fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "t_fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "usr_id")
    private Integer usuarioId;

    @Column(name = "t_name")
    private String nombre;

    @Column(name = "t_nro_seguimiento")
    private Integer nro_seguimiento;

    @Column(name = "t_motivo")
    private String motivo;

    @Column(name = "t_localidad")
    private String localidad;

    @Column(name = "t_permiso")
    private Integer permiso;

    @Column(name = "t_agente")
    private String agente;

    @Column(name = "t_sub_agente")
    private String sub_agente;

    @Column(name = "t_razon_social")
    private String razon_social;

    @Column(name = "t_domicilio_comercial")
    private String domicilio_comercial;

    @Column(name = "t_observaciones")
    private String observaciones;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getNro_seguimiento() {
        return nro_seguimiento;
    }

    public void setNro_seguimiento(Integer nro_seguimiento) {
        this.nro_seguimiento = nro_seguimiento;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public Integer getPermiso() {
        return permiso;
    }

    public void setPermiso(Integer permiso) {
        this.permiso = permiso;
    }

    public String getAgente() {
        return agente;
    }

    public void setAgente(String agente) {
        this.agente = agente;
    }

    public String getSub_agente() {
        return sub_agente;
    }

    public void setSub_agente(String sub_agente) {
        this.sub_agente = sub_agente;
    }

    public String getRazon_social() {
        return razon_social;
    }

    public void setRazon_social(String razon_social) {
        this.razon_social = razon_social;
    }

    public String getDomicilio_comercial() {
        return domicilio_comercial;
    }

    public void setDomicilio_comercial(String domicilio_comercial) {
        this.domicilio_comercial = domicilio_comercial;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
