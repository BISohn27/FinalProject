package com.qrkiosk.elasticsearch.service;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import com.qrkiosk.elasticsearch.document.BusinessDocument;
import com.qrkiosk.elasticsearch.repository.BusinessRepository;

@Service
public class BusinessService {
	private BusinessRepository repository;
	
	@Qualifier("elasticsearchTemplate")
    @Autowired
	private ElasticsearchOperations elasticsearchOperations;
	
	@Autowired
	public BusinessService(BusinessRepository repository) {
		this.repository = repository;
	}
	
	public void save(final BusinessDocument business) {
		repository.save(business);
	}
	
	public BusinessDocument findById(final int eno) {
		return repository.findById(eno).orElse(null);
	}
	
	public  List<BusinessDocument> findBusinessByKeyword(final String search) {
		 NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
				  .withQuery(QueryBuilders.multiMatchQuery(search)
				    .field("ecategory")
				    .field("jibun_address")
				    .field("road_address")
				    .field("ename")
				    .field("introduction")
				    .field("detail_address")
				    .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
				    .operator(Operator.AND))
				  	.build();
		 List<BusinessDocument> list = new ArrayList<>();
		 
		 try {
			 SearchHits<BusinessDocument> searchHits = elasticsearchOperations.search(
				      searchQuery, 
				      BusinessDocument.class,
				      IndexCoordinates.of("business"));
			 
			 for(SearchHit<BusinessDocument> hit : searchHits) {
				 BusinessDocument business= hit.getContent();
				 list.add(business);
			 }
			 
		 }catch(Exception e) {
			 e.printStackTrace();
		 }
		 return list;	    
	 }

	public  List<BusinessDocument> findBusinessByKeywordInRestaurant(final String search) {
		List<BusinessDocument> list = new ArrayList<>();
		BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		boolQueryBuilder.must(QueryBuilders.matchQuery("ecategory", "식당"));
		boolQueryBuilder.must(QueryBuilders.multiMatchQuery(search)
												.field("jibun_address")
												.field("ecategory")
											    .field("road_address")
											    .field("ename")
											    .field("introduction")
											    .field("detail_address")
											    .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
											    .operator(Operator.AND));
		
		try {
			NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(boolQueryBuilder).build();
			SearchHits<BusinessDocument> searchHits = elasticsearchOperations.search(
					nativeSearchQuery, 
				      BusinessDocument.class,
				      IndexCoordinates.of("business"));
			 
			 for(SearchHit<BusinessDocument> hit : searchHits) {
				 BusinessDocument business= hit.getContent();
				 list.add(business);
			 }
		}catch(Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	public  List<BusinessDocument> findBusinessByKeywordInCafe(final String search) {
		List<BusinessDocument> list = new ArrayList<>();
		BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		boolQueryBuilder.must(QueryBuilders.matchQuery("ecategory", "카페"));
		boolQueryBuilder.must(QueryBuilders.multiMatchQuery(search)
												.field("jibun_address")
												.field("ecategory")
											    .field("road_address")
											    .field("ename")
											    .field("introduction")
											    .field("detail_address")
											    .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
											    .operator(Operator.AND));
		
		try {
			NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withQuery(boolQueryBuilder).build();
			SearchHits<BusinessDocument> searchHits = elasticsearchOperations.search(
					nativeSearchQuery, 
				      BusinessDocument.class,
				      IndexCoordinates.of("business"));
			 
			 for(SearchHit<BusinessDocument> hit : searchHits) {
				 BusinessDocument business= hit.getContent();
				 list.add(business);
			 }
		}catch(Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
//	public  List<BusinessDocument> findBusinessByKeywordInRegion(final String search) {
//		
//	}
}









//public void findByProductName(final String search) {
//    Query searchQuery = new StringQuery("{\"query\": {\"multi_match\" : {\"query\":\""+search+"\",\"fields\": [\"road_address\",\"jibun_address\",\"ecategory\",\"ename\"],\"operator\":\"and\"}}}");
//    
//    		//"{\"query\":{\"combined_fields\":{\"query\":\""+ search+ "\",\"fields\":[\"road_address\",\"jibun_address\",\"ecategory\",\"ename\"],\"operator\":\"and\"}}}"
//    		
//    
//    SearchHits<Business> business = elasticsearchOperations.search(
//      searchQuery, 
//      Business.class,
//      IndexCoordinates.of("business"));
//    
 
