package com.example.tramite_de_loteria.response;

public class CambioDomicilioResponseRest extends ResponseRest{
    private CambioDomicilioResponse cambioDomicilioResponse = new CambioDomicilioResponse();

    public CambioDomicilioResponse getCambioDomicilioResponse(){
        return cambioDomicilioResponse;
    }

    public void setCambioDomicilioResponse(CambioDomicilioResponse cambioDomicilioResponse){
        this.cambioDomicilioResponse = cambioDomicilioResponse;
    }
}
