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

    public CambioTitular(Integer id, Tramite tramite, String nuevoTitular, Integer nuevoTitularEstado, String dniNuevoTitular, Integer dniNuevoTitularEstado, String certificadoConducta, Integer certificadoConductaEstado, String certificadoRegistroDeudores, Integer certificadoRegistroDeudoresEstado, String notaLibreDeuda, Integer notaLibreDeudaEstado, String contratoSocial, Integer contratoSocialEstado, String estatuto, Integer estatutoEstado, String objetoSocial, Integer objetoSocialEstado, String cuentaBancaria, Integer cuentaBancariaEstado){
        this.id = id;
        this.tramite = tramite;
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
