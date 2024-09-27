package com.example.tramite_de_loteria.response;

import java.util.List;

import com.example.tramite_de_loteria.model.CambioDomicilio;

public class CambioDomicilioResponse{
    private List<CambioDomicilio> cambioDomicilio;

    public List<CambioDomicilio> getCambioDomicilio(){
        return cambioDomicilio;
    }

    public void setCambioDomicilio (List<CambioDomicilio> cambioDomicilio){
        this.cambioDomicilio = cambioDomicilio;
    }
}
