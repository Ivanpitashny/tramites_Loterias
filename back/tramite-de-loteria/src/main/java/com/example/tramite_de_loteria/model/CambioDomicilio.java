package com.example.tramite_de_loteria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cambio_domicilio")
public class CambioDomicilio {
    public CambioDomicilio(){
        super();
    }

    public CambioDomicilio(Integer id, Tramite tramite, String nuevoDomicilio, Integer nuevoDomicilioEstado, Integer superficie, Integer superficieEstado, String ubicacion, Integer ubicacionEstado, String vidriera, Integer vidrieraEstado, String nivelSocioeconomico, Integer nivelSocioeconomicoEstado, String mercadoZona, Integer mercadoZonaEstado, Integer recaudacionEstimada, Integer recaudacionEstimadaEstado, String direccion, Integer direccionEstado, String localidad, Integer localidadEstado, String departamento, Integer departamentoEstado) {
        this.id = id;
        this.tramite = tramite;
        this.nuevoDomicilio = nuevoDomicilio;
        this.nuevoDomicilioEstado = nuevoDomicilioEstado;
        this.superficie = superficie;
        this.superficieEstado = superficieEstado;
        this.ubicacion = ubicacion;
        this.ubicacionEstado = ubicacionEstado;
        this.vidriera = vidriera;
        this.vidrieraEstado = vidrieraEstado;
        this.nivelSocioeconomico = nivelSocioeconomico;
        this.nivelSocioeconomicoEstado = nivelSocioeconomicoEstado;
        this.mercadoZona = mercadoZona;
        this.mercadoZonaEstado = mercadoZonaEstado;
        this.recaudacionEstimada = recaudacionEstimada;
        this.recaudacionEstimadaEstado = recaudacionEstimadaEstado;
        this.direccion = direccion;
        this.direccionEstado = direccionEstado;
        this.localidad = localidad;
        this.localidadEstado = localidadEstado;
        this.departamento = departamento;
        this.departamentoEstado = departamentoEstado;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cd_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "t_id")
    private Tramite tramite;

    @Column(name = "cd_nuevo_domicilio")
    private String nuevoDomicilio;

    @Column(name = "cd_nuevo_domicilio_e")
    private Integer nuevoDomicilioEstado;

    @Column(name = "cd_superficie")
    private Integer superficie;

    @Column(name = "cd_superficie_e")
    private Integer superficieEstado;

    @Column(name = "cd_ubicacion")
    private String ubicacion;

    @Column(name = "cd_ubicacion_e")
    private Integer ubicacionEstado;

    @Column(name = "cd_vidriera")
    private String vidriera;

    @Column(name = "cd_vidriera_e")
    private Integer vidrieraEstado;

    @Column(name = "cd_nivel_socioeconomico")
    private String nivelSocioeconomico;

    @Column(name = "cd_nivel_socioeconomico_e")
    private Integer nivelSocioeconomicoEstado;

    @Column(name = "cd_mercado_zona")
    private String mercadoZona;

    @Column(name = "cd_mercado_zona_e")
    private Integer mercadoZonaEstado;

    @Column(name = "cd_recaudacion_estimada")
    private Integer recaudacionEstimada;

    @Column(name = "cd_recaudacion_estimada_e")
    private Integer recaudacionEstimadaEstado;

    @Column(name = "cd_DA_direccion")
    private String direccion;

    @Column(name = "cd_DA_direccion_e")
    private Integer direccionEstado;

    @Column(name = "cd_DA_localidad")
    private String localidad;

    @Column(name = "cd_DA_localidad_e")
    private Integer localidadEstado;

    @Column(name = "cd_DA_departamento")
    private String departamento;

    @Column(name = "cd_DA_departamento_e")
    private Integer departamentoEstado;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Tramite getTramite() {
        return tramite;
    }

    public void setTramite(Tramite tramite) {
        this.tramite = tramite;
    }

    public String getNuevoDomicilio() {
        return nuevoDomicilio;
    }

    public void setNuevoDomicilio(String nuevoDomicilio) {
        this.nuevoDomicilio = nuevoDomicilio;
    }

    public Integer getNuevoDomicilioEstado() {
        return nuevoDomicilioEstado;
    }

    public void setNuevoDomicilioEstado(Integer nuevoDomicilioEstado) {
        this.nuevoDomicilioEstado = nuevoDomicilioEstado;
    }

    public Integer getSuperficie() {
        return superficie;
    }

    public void setSuperficie(Integer superficie) {
        this.superficie = superficie;
    }

    public Integer getSuperficieEstado() {
        return superficieEstado;
    }

    public void setSuperficieEstado(Integer superficieEstado) {
        this.superficieEstado = superficieEstado;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Integer getUbicacionEstado() {
        return ubicacionEstado;
    }

    public void setUbicacionEstado(Integer ubicacionEstado) {
        this.ubicacionEstado = ubicacionEstado;
    }

    public String getVidriera() {
        return vidriera;
    }

    public void setVidriera(String vidriera) {
        this.vidriera = vidriera;
    }

    public Integer getVidrieraEstado() {
        return vidrieraEstado;
    }

    public void setVidrieraEstado(Integer vidrieraEstado) {
        this.vidrieraEstado = vidrieraEstado;
    }

    public String getNivelSocioeconomico() {
        return nivelSocioeconomico;
    }

    public void setNivelSocioeconomico(String nivelSocioeconomico) {
        this.nivelSocioeconomico = nivelSocioeconomico;
    }

    public Integer getNivelSocioeconomicoEstado() {
        return nivelSocioeconomicoEstado;
    }

    public void setNivelSocioeconomicoEstado(Integer nivelSocioeconomicoEstado) {
        this.nivelSocioeconomicoEstado = nivelSocioeconomicoEstado;
    }

    public String getMercadoZona() {
        return mercadoZona;
    }

    public void setMercadoZona(String mercadoZona) {
        this.mercadoZona = mercadoZona;
    }

    public Integer getMercadoZonaEstado() {
        return mercadoZonaEstado;
    }

    public void setMercadoZonaEstado(Integer mercadoZonaEstado) {
        this.mercadoZonaEstado = mercadoZonaEstado;
    }

    public Integer getRecaudacionEstimada() {
        return recaudacionEstimada;
    }

    public void setRecaudacionEstimada(Integer recaudacionEstimada) {
        this.recaudacionEstimada = recaudacionEstimada;
    }

    public Integer getRecaudacionEstimadaEstado() {
        return recaudacionEstimadaEstado;
    }

    public void setRecaudacionEstimadaEstado(Integer recaudacionEstimadaEstado) {
        this.recaudacionEstimadaEstado = recaudacionEstimadaEstado;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Integer getDireccionEstado() {
        return direccionEstado;
    }

    public void setDireccionEstado(Integer direccionEstado) {
        this.direccionEstado = direccionEstado;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public Integer getLocalidadEstado() {
        return localidadEstado;
    }

    public void setLocalidadEstado(Integer localidadEstado) {
        this.localidadEstado = localidadEstado;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public Integer getDepartamentoEstado() {
        return departamentoEstado;
    }

    public void setDepartamentoEstado(Integer departamentoEstado) {
        this.departamentoEstado = departamentoEstado;
    }

    
}