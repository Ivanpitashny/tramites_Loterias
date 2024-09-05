package com.example.tramite_de_loteria.response;

import java.util.List;

import com.example.tramite_de_loteria.model.Tramite;

public class TramiteResponse {
    private List<Tramite> tramite;

    public List<Tramite> getTramite(){
        return tramite;
    }

    public void setTramite(List<Tramite> tramite){
        this.tramite = tramite;
    }
}
