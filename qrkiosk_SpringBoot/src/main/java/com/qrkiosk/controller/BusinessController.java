package com.qrkiosk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qrkiosk.domain.BusinessVO;
import com.qrkiosk.elasticsearch.document.BusinessDocument;
import com.qrkiosk.elasticsearch.service.BusinessService;
import com.qrkiosk.mapper.BusinessDAO;
import com.qrkiosk.mapper.TableDAO;

import reactor.util.annotation.Nullable;

@RestController()
public class BusinessController {
	@Autowired
	private BusinessDAO businessDao;
	@Autowired
	private TableDAO tableDao;
	
	private final BusinessService service;
	
	@Autowired
	public BusinessController(BusinessService service) {
		this.service = service;
	}

	@GetMapping("/{eno}")
	public BusinessDocument findById(@PathVariable final int eno) {
		return service.findById(eno);
	}
	
	//search system by Elasticsearch
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/search")
	public ResponseEntity<List<BusinessDocument>> findBusinessBySearchInCafe(@RequestParam(value = "q") String q,@RequestParam(value = "option") String option) {
		System.out.println(option);
		List<BusinessDocument> list = null;
		if(option.equals("undefined")) {
			list =  service.findBusinessByKeyword(q);
		} else if(option.equals("rest")) {
			list =  service.findBusinessByKeywordInRestaurant(q);
		} else if(option.equals("cafe")) {
			list =  service.findBusinessByKeywordInCafe(q);
		} else {
			list = null;
		}
		//else if(option.equals("region")) {} 
		
		if(list != null) {
			for(BusinessDocument business : list) {
				business.setSeat(tableDao.getSeatNum(business.getEno()));
				business.setOccupied(tableDao.getOccupiedNum(business.getEno()));
			}
		}
		return new ResponseEntity<>(list,HttpStatus.BAD_REQUEST.OK);
	}
	
	
	//mysql like search by concat method
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/boot/businesses")
	public ResponseEntity<List<BusinessVO>> getBusinesses(@RequestParam String search) {
		search = search.replace(" ", "|");
		System.out.println(search);
		List<BusinessVO> list = businessDao.getBusinessList(search);
		
		for(BusinessVO business : list) {
			business.setSeat(tableDao.getSeatNum(business.getEno()));
			business.setOccupied(tableDao.getOccupiedNum(business.getEno()));
		}
		
		return new ResponseEntity<>(list,HttpStatus.BAD_REQUEST.OK);
	}
}
