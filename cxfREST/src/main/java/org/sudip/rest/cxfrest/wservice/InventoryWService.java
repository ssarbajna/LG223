package org.sudip.rest.cxfrest.wservice;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;

import org.sudip.rest.cxfrest.model.Inventory;
import org.sudip.rest.cxfrest.service.InventoryService;

@WebService
public class InventoryWService {
	InventoryService inventoryService = new InventoryService();
	
	@WebMethod
	public List<Inventory>getInventories(){
		List<Inventory> invs = inventoryService.getAllInventories();
		return invs;
	}
}
