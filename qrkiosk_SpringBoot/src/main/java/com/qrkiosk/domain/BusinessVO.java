package com.qrkiosk.domain;

public class BusinessVO {
	private int eno;
	private String password;
	private String ename;
	private String postcode;
	private String road_address;
	private String jibun_address;
	private	String detail_address;
	private String phone;
	private String email;
	private String confirm;
	private String introduction;
	private int open1;
	private int close1;
	private int open2;
	private int close2;
	private String valid;
	private String eimage;
	private String ecategory;
	private int seat;
	private int occupied;
	
	public int getSeat() {
		return seat;
	}
	public void setSeat(int seat) {
		this.seat = seat;
	}
	public int getOccupied() {
		return occupied;
	}
	public void setOccupied(int occupied) {
		this.occupied = occupied;
	}
	public String getJibun_address() {
		return jibun_address;
	}
	public void setJibun_address(String jibun_address) {
		this.jibun_address = jibun_address;
	}
	public String getEimage() {
		return eimage;
	}
	public void setEimage(String eimage) {
		this.eimage = eimage;
	}
	public String getEcategory() {
		return ecategory;
	}
	public void setEcategory(String ecategory) {
		this.ecategory = ecategory;
	}
	public int getEno() {
		return eno;
	}
	public void setEno(int eno) {
		this.eno = eno;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEname() {
		return ename;
	}
	public void setEname(String ename) {
		this.ename = ename;
	}
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	public String getRoad_address() {
		return road_address;
	}
	public void setRoad_address(String road_address) {
		this.road_address = road_address;
	}
	public String getDetail_address() {
		return detail_address;
	}
	public void setDetail_address(String detail_address) {
		this.detail_address = detail_address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getConfirm() {
		return confirm;
	}
	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public int getOpen1() {
		return open1;
	}
	public void setOpen1(int open1) {
		this.open1 = open1;
	}
	public int getClose1() {
		return close1;
	}
	public void setClose1(int close1) {
		this.close1 = close1;
	}
	public int getOpen2() {
		return open2;
	}
	public void setOpen2(int open2) {
		this.open2 = open2;
	}
	public int getClose2() {
		return close2;
	}
	public void setClose2(int close2) {
		this.close2 = close2;
	}
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}
}
