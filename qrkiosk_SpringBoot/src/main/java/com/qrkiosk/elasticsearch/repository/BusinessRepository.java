package com.qrkiosk.elasticsearch.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.qrkiosk.elasticsearch.document.BusinessDocument;

public interface BusinessRepository extends ElasticsearchRepository<BusinessDocument, Integer>{
}
