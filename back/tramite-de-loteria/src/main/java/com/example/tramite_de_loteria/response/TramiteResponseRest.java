package com.example.tramite_de_loteria.response;

public class TramiteResponseRest extends ResponseRest{
    private TramiteResponse tramiteResponse = new TramiteResponse();

    public TramiteResponse getTramiteResponse(){
        return tramiteResponse;
    }

    public void setTramiteResponse(TramiteResponse tramiteResponse){
        this.tramiteResponse = tramiteResponse;
    }
}
