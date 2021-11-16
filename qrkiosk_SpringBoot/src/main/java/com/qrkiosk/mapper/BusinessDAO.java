package com.qrkiosk.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.qrkiosk.domain.BusinessVO;

@Mapper
public interface BusinessDAO {
	@Select("select * from enterprise where concat(ename,road_address,jibun_address,ecategory) regexp #{search}")
	public List<BusinessVO> getBusinessList (@Param("search") String search); 
}




//(select * from (select * from enterprise where jibun_address regexp #{search} and where road_address regexp #{search}) "
//		+ "where ecatagory regexp #{search}) "
//+ "where ename regexp #{search}"
//	
	
	
	
	
	
//@Select("select * from (select * from (select * from enterprise where ename regexp #{search}) as name  where ecategory regexp #{search}) as category where jibun_address regexp #{search} or road_address regexp #{search}")
//public List<BusinessVO> getBusinessList1 (@Param("search") String search); 
//@Select("select * from (select * from (select * from enterprise where ename regexp #{search}) as name where jibun_address regexp #{search} or road_address regexp #{search}) as address where ecategory regexp #{search}")
//public List<BusinessVO> getBusinessList2 (@Param("search") String search);
//@Select("select * from (select * from (select * from enterprise where ecategory regexp #{search}) as category where jibun_address regexp #{search} or road_address regexp #{search}) as address where ename regexp #{search}")
//public List<BusinessVO> getBusinessList3 (@Param("search") String search);
//@Select("select * from (select * from (select * from enterprise where ecategory regexp #{search}) as category where ename regexp #{search} ) as name where jibun_address regexp #{search} or road_address regexp #{search}")
//public List<BusinessVO> getBusinessList4 (@Param("search") String search);
//@Select("select * from (select * from (select * from enterprise where jibun_address regexp #{search} or road_address regexp #{search}) as address where ename regexp #{search} ) as name where ecategory regexp #{search}")
//public List<BusinessVO> getBusinessList5 (@Param("search") String search);
//@Select("select * from (select * from (select * from enterprise where jibun_address regexp #{search} or road_address regexp #{search}) as address where ecategory regexp #{search}) as category where ename regexp #{search}")
//public List<BusinessVO> getBusinessList6 (@Param("search") String search);
	
	
	



//	"<script>",
//	"select * from ",
//		"(select * from ",
//			"(select * from enterprise where jibun_address in",
//			  "<foreach collection='array' item='str' seperator =', ' open='(' close=')'>#{str}</foreach>)",
//		  " where ecategory in",
//		  "<foreach collection='array' item='str' seperator =', ' open='(' close=')'>#{str}</foreach>)",
//		" where ename in",
//		"<foreach collection='array' item='str' seperator =', ' open='(' close=')'>#{str}</foreach>)",
//		"</script>"