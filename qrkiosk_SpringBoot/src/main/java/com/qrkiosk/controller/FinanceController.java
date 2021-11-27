package com.qrkiosk.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
		Map<String,Object> map = null;
		if(categoryType.equals("sales")) {
			if(periodCategory.equals("년도별 매출")) {
				map = fService.getSalesByYear(eno, startPeriod, endPeriod);
			} else if(periodCategory.equals("분기별 매출")) {
				map = fService.getSalesByQuater(eno,startPeriod,endPeriod);
			} else if (periodCategory.equals("월별 매출")) {
				map = fService.getSalesByMonth(eno, periodType, startPeriod, endPeriod);
			} else if (periodCategory.equals("일별 매출")) {
				
			}else if (periodCategory.equals("시간별 매출")) {
				map = fService.getSalesByTime(eno, periodType, startPeriod, endPeriod);
			}
		}else if(categoryType.equals("menu")) {
			if(periodCategory.equals("년도별 매출")) {
				map = fService.getMenuSalesByYear(eno, startPeriod, endPeriod, menu);
			} else if(periodCategory.equals("분기별 매출")) {
				map = fService.getMenuSalesByQuater(eno, startPeriod, endPeriod, menu);
			} else if (periodCategory.equals("월별 매출")) {
				map = fService.getMenuSalesByMonth(eno, periodType, startPeriod, endPeriod, menu);
			} else if (periodCategory.equals("일별 매출")) {
				
			}else if (periodCategory.equals("시간별 매출")) {
				map = fService.getMenuSalesByTime(eno, periodType, startPeriod, endPeriod, menu);
			}
		}
		return map;
	}
}
