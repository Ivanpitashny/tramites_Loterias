package com.example.tramite_de_loteria.response;

import java.util.List;

import com.example.tramite_de_loteria.model.Autorizacion;

public class AutorizacionResponse {

    private List<Autorizacion> autorizacion;

    public List<Autorizacion> getAutorizacion() {
        return autorizacion;
    }

    public void setAutorizacion(List<Autorizacion> autorizacion) {
        this.autorizacion = autorizacion;
    }

}
