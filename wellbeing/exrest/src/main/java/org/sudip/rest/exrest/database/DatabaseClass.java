package org.sudip.rest.exrest.database;

import java.util.HashMap;
import java.util.Map;

import org.sudip.rest.exrest.model.Inventory;
import org.sudip.rest.exrest.model.TransactionOfAnInventory;

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
