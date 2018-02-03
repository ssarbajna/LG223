package org.sudip.rest.exrest.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.sudip.rest.exrest.database.DatabaseClass;
import org.sudip.rest.exrest.model.Inventory;

public class InventoryService {
	private Map<Long, Inventory> inventories = DatabaseClass.getInventories();
	
	public List<Inventory> getAllInventories(){
		
		return new ArrayList<>(inventories.values());
	}
	
	public Inventory getInventory(long id) {
		return inventories.get(id);
	}
	
	public Inventory addInventory(Inventory inv) {
		inv.setId(inventories.size() + 1);
		inventories.put(inv.getId(), inv);
		return inv;
	}
	
	public Inventory updateInventory(Inventory inv) {
		if (inv.getId() <= 0)
			return null;
		
		inventories.put(inv.getId(), inv);
		return inv;
	}
	
	public Inventory removeInventory(long id) {
			return inventories.remove(id);
	}
}
