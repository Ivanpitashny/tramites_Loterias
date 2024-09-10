package com.example.tramite_de_loteria.response;

public class TipoTramiteResponseRest extends ResponseRest{
    private TipoTramiteResponse tipoResponse = new TipoTramiteResponse();

    public TipoTramiteResponse getTipoTramiteResponse(){
        return tipoResponse;
    }

    public void setTipoTramiteResponse(TipoTramiteResponse tipotramite){
        this.tipoResponse = tipotramite;
    }
    
}
