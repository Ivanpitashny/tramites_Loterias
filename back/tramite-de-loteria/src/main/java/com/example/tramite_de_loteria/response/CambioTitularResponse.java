package com.example.tramite_de_loteria.response;

import java.util.List;

import com.example.tramite_de_loteria.model.CambioTitular;

public class CambioTitularResponse {
     private List<CambioTitular> cambioTitular;

    public List<CambioTitular> getCambioTitular(){
        return cambioTitular;
    }

    public void setCambioTitular (List<CambioTitular> cambioTitular){
        this.cambioTitular = cambioTitular;
    }
}
