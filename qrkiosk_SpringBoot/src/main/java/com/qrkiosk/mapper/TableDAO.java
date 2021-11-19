package com.qrkiosk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface TableDAO {
	@Select("select count(tno) from etable where eno=${eno}")
	public int getSeatNum(@Param("eno") int eno);
	@Select("select count(tno) from etable where eno=${eno} and state='y'")
	public int getOccupiedNum(@Param("eno") int eno);
}
