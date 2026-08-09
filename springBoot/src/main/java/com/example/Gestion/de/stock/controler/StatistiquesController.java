package com.example.Gestion.de.stock.controler;

import com.example.Gestion.de.stock.controler.controllerApi.StatistiquesApi;
import com.example.Gestion.de.stock.dto.StatistiquesDto;
import com.example.Gestion.de.stock.service.StatistiquesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT + "/statistiques")
public class StatistiquesController implements StatistiquesApi {

    private final StatistiquesService statistiquesService;

    @Autowired
    public StatistiquesController(StatistiquesService statistiquesService) {
        this.statistiquesService = statistiquesService;
    }

    @Override
    @GetMapping(path = "/summary", produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
    public StatistiquesDto getStatistiques() {
        return statistiquesService.getStatistiques();
    }
}
