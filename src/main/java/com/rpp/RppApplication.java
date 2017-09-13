package com.rpp;

import javax.persistence.EntityManagerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.vendor.HibernateJpaSessionFactoryBean;

@SpringBootApplication
@EnableAutoConfiguration
public class RppApplication {

	public static void main(String[] args) {
		SpringApplication.run(RppApplication.class, args);
		
	}
	
	@Bean
	public HibernateJpaSessionFactoryBean sessionFactory(EntityManagerFactory emf) {
		HibernateJpaSessionFactoryBean fact = new HibernateJpaSessionFactoryBean();
		fact.setEntityManagerFactory(emf);
		return fact;
	}
	
}
