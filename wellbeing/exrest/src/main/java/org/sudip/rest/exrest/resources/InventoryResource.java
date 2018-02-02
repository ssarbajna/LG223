package org.sudip.rest.exrest.resources;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.sudip.rest.exrest.model.Inventory;
import org.sudip.rest.exrest.service.InventoryService;

@Path("/inventories")
public class InventoryResource {
	InventoryService inventoryService = new InventoryService();
	
	@GET
	@Produces(MediaType.APPLICATION_XML)
	public List<Inventory> getInventories() {
		return inventoryService.getAllInventories();
	}
}
