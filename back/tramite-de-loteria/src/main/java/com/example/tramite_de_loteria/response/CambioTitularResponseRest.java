package com.example.tramite_de_loteria.response;

public class CambioTitularResponseRest extends ResponseRest{
    private CambioTitularResponse cambioTitularResponse = new CambioTitularResponse();

    public CambioTitularResponse getCambioTitularResponse(){
        return cambioTitularResponse;
    }

    public void setCambioTitularResponse(CambioTitularResponse cambioTitularResponse){
        this.cambioTitularResponse = cambioTitularResponse;
    }
}
