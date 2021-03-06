package com.qrkiosk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qrkiosk.domain.ReportViewVO;
import com.qrkiosk.service.FinanceService;

import reactor.util.annotation.Nullable;

@RestController()
public class FinanceController {
	@Autowired
	FinanceService fService;
	
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/enterprises/{eno}/finance")
	public Map<String,Object> getSales(@PathVariable("eno") int eno, 
									@RequestParam("ct")String categoryType, 
									@RequestParam("pc")String periodCategory, 
									@Nullable @RequestParam("mc")String menuCategory,
									@Nullable @RequestParam("m")String menu,
									@RequestParam("pt")String periodType,
									@RequestParam("sp")String startPeriod,
									@RequestParam("ep")String endPeriod){
		
		Map<String,Object> map = new HashMap<>();
		if(categoryType.equals("sales")) {
			map.put("year",fService.getSalesByYear(eno, startPeriod, endPeriod));
			map.put("quater", fService.getSalesByQuater(eno,startPeriod,endPeriod));
			map.put("month", fService.getSalesByMonth(eno, "Year", startPeriod, endPeriod));
			map.put("time", fService.getSalesByTime(eno, "Year", startPeriod, endPeriod));
		}else if(categoryType.equals("menu")) {
			map.put("year",fService.getMenuSalesByYear(eno, startPeriod, endPeriod, menu));
			map.put("quater", fService.getMenuSalesByQuater(eno, startPeriod, endPeriod, menu));
			map.put("month", fService.getMenuSalesByMonth(eno, "Year", startPeriod, endPeriod, menu));
			map.put("time", fService.getMenuSalesByTime(eno, "Year", startPeriod, endPeriod, menu));
		}
		
		Map<String,List<ReportViewVO>> temp = fService.getSalesList(eno, startPeriod, endPeriod);
		map.put("saleslist", temp);
		map.put("keylist", temp.keySet());
		
		return map;
	}
}

//if(periodCategory.equals("????????? ??????")) {
//	map = fService.getMenuSalesByYear(eno, startPeriod, endPeriod, menu);
//} else if(periodCategory.equals("????????? ??????")) {
//	map = fService.getMenuSalesByQuater(eno, startPeriod, endPeriod, menu);
//} else if (periodCategory.equals("?????? ??????")) {
//	map = fService.getMenuSalesByMonth(eno, periodType, startPeriod, endPeriod, menu);
//} else if (periodCategory.equals("?????? ??????")) {
//	
//}else if (periodCategory.equals("????????? ??????")) {
//	map = fService.getMenuSalesByTime(eno, periodType, startPeriod, endPeriod, menu);
//}

//if(periodCategory.equals("????????? ??????")) {
//	map = fService.getSalesByYear(eno, startPeriod, endPeriod);
//} else if(periodCategory.equals("????????? ??????")) {
//	map = fService.getSalesByQuater(eno,startPeriod,endPeriod);
//} else if (periodCategory.equals("?????? ??????")) {
//	map = fService.getSalesByMonth(eno, periodType, startPeriod, endPeriod);
//} else if (periodCategory.equals("?????? ??????")) {
//	
//}else if (periodCategory.equals("????????? ??????")) {
//	map = fService.getSalesByTime(eno, periodType, startPeriod, endPeriod);
//}
