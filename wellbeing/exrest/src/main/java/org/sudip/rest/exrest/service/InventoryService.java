package org.sudip.rest.exrest.service;

import java.util.ArrayList;
import java.util.List;

import org.sudip.rest.exrest.model.Inventory;

public class InventoryService {
	public List<Inventory> getAllInventories(){
		Inventory i1 = new Inventory(1L,"Hello World!", "Sudip");
		Inventory i2 = new Inventory(2L,"Hello Jersey", "Sudip");
		List<Inventory> list = new ArrayList<Inventory>();
		list.add(i1);
		list.add(i2);
		
		return list;
		};

}
