package org.sudip.rest.exrest.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Inventory {
	private long id;
	private String inventory;
	private Date created;
	private String creator;
	
	public Inventory() {
		
	}
	
	public Inventory(long id, String inventory, String creator) {
		this.id = id;
		this.inventory = inventory;
		this.created = new Date();
		this.creator = creator;
	}
	
	public String getInventory() {
		return inventory;
	}
	public void setInventory(String inventory) {
		this.inventory = inventory;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}

}
