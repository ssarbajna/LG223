package org.sudip.rest.cxfrest.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TransactionOfAnInventory {
	private long id;
	private String transactionOfInventory;
	private Date created;
	private String creator;
	
	public TransactionOfAnInventory() {
		
	}
	
	public TransactionOfAnInventory(long id, String inventory, String creator) {
		this.id = id;
		this.transactionOfInventory = inventory;
		this.created = new Date();
		this.creator = creator;
	}
	
	public String getInventory() {
		return transactionOfInventory;
	}
	public void setInventory(String inventory) {
		this.transactionOfInventory = inventory;
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
