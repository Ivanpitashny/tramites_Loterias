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
@Table(name = "cambio_titular")
public class CambioTitular {

    public CambioTitular(){
        super();
    }

    public CambioTitular(Integer id, Tramite tramite,  Integer nro_seguimiento, String motivo, String localidad, Integer permiso, String agente, String sub_agente, String razon_social, String domicilio_comercial, String observaciones, String nuevoTitular, Integer nuevoTitularEstado, String dniNuevoTitular, Integer dniNuevoTitularEstado, String certificadoConducta, Integer certificadoConductaEstado, String certificadoRegistroDeudores, Integer certificadoRegistroDeudoresEstado, String notaLibreDeuda, Integer notaLibreDeudaEstado, String contratoSocial, Integer contratoSocialEstado, String estatuto, Integer estatutoEstado, String objetoSocial, Integer objetoSocialEstado, String cuentaBancaria, Integer cuentaBancariaEstado){
        this.id = id;
        this.tramite = tramite;
        this.nro_seguimiento = nro_seguimiento;
        this.motivo = motivo;
        this.localidad = localidad;
        this.permiso = permiso;
        this.agente = agente;
        this.sub_agente = sub_agente;
        this.razon_social = razon_social;
        this.domicilio_comercial = domicilio_comercial;
        this.observaciones = observaciones;
        this.nuevoTitular = nuevoTitular;
        this.nuevoTitularEstado = nuevoTitularEstado;
        this.dniNuevoTitular = dniNuevoTitular;
        this.dniNuevoTitularEstado = dniNuevoTitularEstado;
        this.certificadoConducta = certificadoConducta;
        this.certificadoConductaEstado = certificadoConductaEstado;
        this.certificadoRegistroDeudores = certificadoRegistroDeudores;
        this.certificadoRegistroDeudoresEstado = certificadoRegistroDeudoresEstado;
        this.notaLibreDeuda = notaLibreDeuda;
        this.notaLibreDeudaEstado = notaLibreDeudaEstado;
        this.contratoSocial = contratoSocial;
        this.contratoSocialEstado = contratoSocialEstado;
        this.estatuto = estatuto;
        this.estatutoEstado = estatutoEstado;
        this.objetoSocial = objetoSocial;
        this.objetoSocialEstado = objetoSocialEstado;
        this.cuentaBancaria = cuentaBancaria;
        this.cuentaBancariaEstado = cuentaBancariaEstado;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ct_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "t_id")
    private Tramite tramite;

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

    @Column(name = "ct_nuevo_titular")
    private String nuevoTitular;

    @Column(name = "ct_nuevo_titular_e")
    private Integer nuevoTitularEstado;

    @Column(name = "ct_dni_nuevo_titular")
    private String dniNuevoTitular;

    @Column(name = "ct_dni_nuevo_titular_e")
    private Integer dniNuevoTitularEstado;

    @Column(name = "ct_certificado_conducta")
    private String certificadoConducta;

    @Column(name = "ct_certificado_conducta_e")
    private Integer certificadoConductaEstado;

    @Column(name = "ct_certificado_registro_deudores")
    private String certificadoRegistroDeudores;

    @Column(name = "ct_certificado_registro_deudores_e")
    private Integer certificadoRegistroDeudoresEstado;

    @Column(name = "ct_nota_libre_deuda")
    private String notaLibreDeuda;

    @Column(name = "ct_nota_libre_deuda_e")
    private Integer notaLibreDeudaEstado;

    @Column(name = "ct_contrato_social")
    private String contratoSocial;

    @Column(name = "ct_contrato_social_e")
    private Integer contratoSocialEstado;

    @Column(name = "ct_estatuto")
    private String estatuto;

    @Column(name = "ct_estatuto_e")
    private Integer estatutoEstado;

    @Column(name = "ct_objeto_social")
    private String objetoSocial;

    @Column(name = "ct_objeto_social_e")
    private Integer objetoSocialEstado;

    @Column(name = "ct_cuenta_bancaria")
    private String cuentaBancaria;

    @Column(name = "ct_cuenta_bancaria_e")
    private Integer cuentaBancariaEstado;

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

    public String getNuevoTitular() {
        return nuevoTitular;
    }

    public void setNuevoTitular(String nuevoTitular) {
        this.nuevoTitular = nuevoTitular;
    }

    public Integer getNuevoTitularEstado() {
        return nuevoTitularEstado;
    }

    public void setNuevoTitularEstado(Integer nuevoTitularEstado) {
        this.nuevoTitularEstado = nuevoTitularEstado;
    }

    public String getDniNuevoTitular() {
        return dniNuevoTitular;
    }

    public void setDniNuevoTitular(String dniNuevoTitular) {
        this.dniNuevoTitular = dniNuevoTitular;
    }

    public Integer getDniNuevoTitularEstado() {
        return dniNuevoTitularEstado;
    }

    public void setDniNuevoTitularEstado(Integer dniNuevoTitularEstado) {
        this.dniNuevoTitularEstado = dniNuevoTitularEstado;
    }

    public String getCertificadoConducta() {
        return certificadoConducta;
    }

    public void setCertificadoConducta(String certificadoConducta) {
        this.certificadoConducta = certificadoConducta;
    }

    public Integer getCertificadoConductaEstado() {
        return certificadoConductaEstado;
    }

    public void setCertificadoConductaEstado(Integer certificadoConductaEstado) {
        this.certificadoConductaEstado = certificadoConductaEstado;
    }

    public String getCertificadoRegistroDeudores() {
        return certificadoRegistroDeudores;
    }

    public void setCertificadoRegistroDeudores(String certificadoRegistroDeudores) {
        this.certificadoRegistroDeudores = certificadoRegistroDeudores;
    }

    public Integer getCertificadoRegistroDeudoresEstado() {
        return certificadoRegistroDeudoresEstado;
    }

    public void setCertificadoRegistroDeudoresEstado(Integer certificadoRegistroDeudoresEstado) {
        this.certificadoRegistroDeudoresEstado = certificadoRegistroDeudoresEstado;
    }

    public String getNotaLibreDeuda() {
        return notaLibreDeuda;
    }

    public void setNotaLibreDeuda(String notaLibreDeuda) {
        this.notaLibreDeuda = notaLibreDeuda;
    }

    public Integer getNotaLibreDeudaEstado() {
        return notaLibreDeudaEstado;
    }

    public void setNotaLibreDeudaEstado(Integer notaLibreDeudaEstado) {
        this.notaLibreDeudaEstado = notaLibreDeudaEstado;
    }

    public String getContratoSocial() {
        return contratoSocial;
    }

    public void setContratoSocial(String contratoSocial) {
        this.contratoSocial = contratoSocial;
    }

    public Integer getContratoSocialEstado() {
        return contratoSocialEstado;
    }

    public void setContratoSocialEstado(Integer contratoSocialEstado) {
        this.contratoSocialEstado = contratoSocialEstado;
    }

    public String getEstatuto() {
        return estatuto;
    }

    public void setEstatuto(String estatuto) {
        this.estatuto = estatuto;
    }

    public Integer getEstatutoEstado() {
        return estatutoEstado;
    }

    public void setEstatutoEstado(Integer estatutoEstado) {
        this.estatutoEstado = estatutoEstado;
    }

    public String getObjetoSocial() {
        return objetoSocial;
    }

    public void setObjetoSocial(String objetoSocial) {
        this.objetoSocial = objetoSocial;
    }

    public Integer getObjetoSocialEstado() {
        return objetoSocialEstado;
    }

    public void setObjetoSocialEstado(Integer objetoSocialEstado) {
        this.objetoSocialEstado = objetoSocialEstado;
    }

    public String getCuentaBancaria() {
        return cuentaBancaria;
    }

    public void setCuentaBancaria(String cuentaBancaria) {
        this.cuentaBancaria = cuentaBancaria;
    }

    public Integer getCuentaBancariaEstado() {
        return cuentaBancariaEstado;
    }

    public void setCuentaBancariaEstado(Integer cuentaBancariaEstado) {
        this.cuentaBancariaEstado = cuentaBancariaEstado;
    }
    
}
