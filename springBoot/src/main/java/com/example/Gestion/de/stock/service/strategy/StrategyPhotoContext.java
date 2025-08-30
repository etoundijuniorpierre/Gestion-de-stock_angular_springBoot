package com.example.Gestion.de.stock.service.strategy;// package com.example.Gestion.de.stock.service; (Adjust package as needed)

import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Setter;

import java.io.InputStream;

@Service
public class StrategyPhotoContext {

  private final BeanFactory beanFactory;
  private Strategy strategy; // Value changes, so not final

  @Setter
  private String context;

  @Autowired
  public StrategyPhotoContext(BeanFactory beanFactory) {
    this.beanFactory = beanFactory;
  }

  public Object savePhoto(String context, Integer id, InputStream photo, String title) { // Removed throws FlickrException
    determinContext(context);
    return strategy.savePhoto(id, photo, title);
  }

  private void determinContext(String context) {
    final String beanName = context + "Strategy";
    switch (context) {
      case "article":
        strategy = beanFactory.getBean(beanName, SaveArticlePhoto.class);
        break;
      case "client" :
        strategy = beanFactory.getBean(beanName, SaveClientPhoto.class);
        break;
      case "fournisseur" :
        strategy = beanFactory.getBean(beanName, SaveFournisseurPhoto.class);
        break;
      case "entreprise" :
        strategy = beanFactory.getBean(beanName, SaveEntreprisePhoto.class);
        break;
      case "utilisateur" :
        strategy = beanFactory.getBean(beanName, SaveUtilisateurPhoto.class);
        break;
      default: throw new InvalidOperationException("Contexte inconnue pour l'enregistrement de la photo", ErrorCodes.UNKNOWN_CONTEXT);
    }
  }
}