package com.example.tramite_de_loteria.response;

import java.util.List;

import com.example.tramite_de_loteria.model.Tramite;


public class TipoTramiteResponse {
    private List<TipoTramite> tipoTramite;

    public List<TipoTramite> getTipoTramite(){
        return tipoTramite;
    }

    public void setTipoTramite(List<TipoTramite> tipoTramite){
        this.tipoTramite = tipoTramite;
    }
}
