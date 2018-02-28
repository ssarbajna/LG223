package org.sudip.rest.cxfrest.database;

import java.util.HashMap;
import java.util.Map;

import org.sudip.rest.cxfrest.model.Inventory;
import org.sudip.rest.cxfrest.model.TransactionOfAnInventory;

public class DatabaseClass {
	private static Map<Long,Inventory> inventories = new HashMap<Long,Inventory>();
	private static Map<Long,TransactionOfAnInventory> transactionsOfInventories = new HashMap<Long,TransactionOfAnInventory>();
	
	public static Map<Long,Inventory> getInventories(){
		return inventories;
	}
	
	public static Map<Long,TransactionOfAnInventory> getTransactionsOfInventories(){
		return transactionsOfInventories;
	}

}
