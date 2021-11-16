package com.qrkiosk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qrkiosk.domain.BusinessVO;
import com.qrkiosk.mapper.BusinessDAO;

@RestController()
public class BusinessController {
	@Autowired
	private BusinessDAO businessDao;
	
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/boot/businesses")
	public ResponseEntity<List<BusinessVO>> getBusinesses(@RequestParam String search) {
		search = search.replace(" ", "|");
		List<BusinessVO> list = businessDao.getBusinessList(search);
		
		return new ResponseEntity<>(list,HttpStatus.BAD_REQUEST.OK);
	}
}
