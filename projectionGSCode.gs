function iterateOverDays() {  
  // a variable to point to the target row in result sheet
  var tgtRow = 2;
  
  //grab the input sheet
  var sheet = SpreadsheetApp.getActive().getSheetByName("projectionInp");
  //grab current bal for pncChkBal, chaseCrCrdBal, aaaCrCrdBal
  var currPncChkBal = sheet.getRange(3, 2).getValue();
  var currChaseCrCrdBal = sheet.getRange(4, 2).getValue();
  var currAaaCrCrdBal = sheet.getRange(5, 2).getValue();
  var currBalCap360chk = sheet.getRange(3, 4).getValue();
  var currPncSavBal = sheet.getRange(4, 4).getValue();
  var currEMGDBal = sheet.getRange(5, 4).getValue();
  
  //grab noOfDay2project
  var noOfDay2project = sheet.getRange(2, 4).getValue();
 //grab startDay
  var startDay = sheet.getRange(2, 2).getValue();
  
  //1. create variable for running total for pncChkBal
  var runningPncChkBal = currPncChkBal;
  //2. create variable for running total for chaseCrCrdBal
  var runningChaseCrCrdBal = currChaseCrCrdBal;
  //3. create variable for running total for aaaCrCrdBal
  var runningAaaCrCrdBal = currAaaCrCrdBal;
  //4. create variable for running total for cap360ChkBal
  var runningCap360ChkBal = currBalCap360chk;
  //5. create variable for running total for pncSavBal
  var runningPncSavBal = currPncSavBal;
  //6. create variable for running total for EMGDBal
  var runningEMGDBal = currEMGDBal;
  
  // create an object variousBals{} of these to be passed to subsequent functions 
  //// element 1 = pncChkBal, element 2 = chaseCrCrdBal, element 3 = aaaCrCrdBal, element 4 = runningCap360ChkBal, element 5 = pncSavBal
  var variousBals = {runningPncChkBal:runningPncChkBal, currChaseCrCrdBal:currChaseCrCrdBal, currAaaCrCrdBal:currAaaCrCrdBal, runningCap360ChkBal:runningCap360ChkBal,
                     runningPncSavBal:runningPncSavBal, runningEMGDBal:runningEMGDBal, currActivityString: "Start: "};
  Logger.log("Beginning running totals: PNCchk=" + variousBals.runningPncChkBal + " Chase= " + variousBals.currChaseCrCrdBal + 
             " aaa= " + variousBals.currAaaCrCrdBal + " cap360Chk= " + variousBals.runningCap360ChkBal + " PNCsav= " + variousBals.runningPncSavBal +
            " EMGD= " + variousBals.runningEMGDBal);
  
  //grab the range for rules
  var ruleRange = sheet.getRange(7, 1, 51, 5);   // starting at row=7, col=1 for 51 rows 5 columns
  //TODO: will try to get the rules range from a namedrange in input sheet

  // grab the result sheet, clear result sheet and write out start time of the process
  var resultSheet = SpreadsheetApp.getActive().getSheetByName("result");
  resultSheet.clear();
  resultSheet.getRange(tgtRow, 1).setValue("Process started: " + new Date());
  
  tgtRow++; // write out header on next row
  
  // write out header record on the result table plus opening balances
  resultSheet.getRange(tgtRow, 1).setValue("Date");
  resultSheet.getRange(tgtRow, 2).setValue("PNCchkBal");
  resultSheet.getRange(tgtRow, 3).setValue("ChaseCrCrdBal");
  resultSheet.getRange(tgtRow, 4).setValue("AaaCrCrdBal");
  resultSheet.getRange(tgtRow, 5).setValue("Cap360ChkBal");
  resultSheet.getRange(tgtRow, 6).setValue("PNCsavBal");
  resultSheet.getRange(tgtRow, 7).setValue("EMGDBal");
  resultSheet.getRange(tgtRow, 8).setValue("Hint");
  
  tgtRow++; // write out opening balances on next row
    
  resultSheet.getRange(tgtRow, 1).setValue(startDay);  
  resultSheet.getRange(tgtRow, 2).setValue(variousBals.runningPncChkBal);
  resultSheet.getRange(tgtRow, 3).setValue(variousBals.currChaseCrCrdBal);
  resultSheet.getRange(tgtRow, 4).setValue(variousBals.currAaaCrCrdBal);
  resultSheet.getRange(tgtRow, 5).setValue(variousBals.runningCap360ChkBal);
  resultSheet.getRange(tgtRow, 6).setValue(variousBals.runningPncSavBal);
  resultSheet.getRange(tgtRow, 7).setValue(variousBals.runningEMGDBal);
  resultSheet.getRange(tgtRow, 8).setValue("Opening balances");  
  
  //loop over days by incrementing the date by one for noOfDay2project times
  for (var i=0; i<noOfDay2project; i++){
    var stDay = new Date(startDay);
       var currentDate = new Date(stDay.setDate(stDay.getDate()+i)); 
  //// increment tgtRow pointer
    tgtRow++;
    Logger.log(currentDate + "  will be going to " + tgtRow + " row in result sheet") ;
  ////call func to iterate over the rules range for current date
    iterateOverRange(currentDate, ruleRange, variousBals);
    // print running totals after the possible manipulation inside the function
    Logger.log("After func manipulation running totals: PNCchk=" + variousBals.runningPncChkBal + " Chase= " + variousBals.currChaseCrCrdBal +
               " aaa= " + variousBals.currAaaCrCrdBal + " Cap360Chk= " + variousBals.runningCap360ChkBal + " PNCsav= " + variousBals.runningPncSavBal +
              " EMGD= " + variousBals.runningEMGDBal);
  // write current date, 3 balances to the tgtRow in result sheet    
    resultSheet.getRange(tgtRow, 1).setValue(currentDate);
    resultSheet.getRange(tgtRow, 2).setValue(variousBals.runningPncChkBal);
    resultSheet.getRange(tgtRow, 3).setValue(variousBals.currChaseCrCrdBal);
    resultSheet.getRange(tgtRow, 4).setValue(variousBals.currAaaCrCrdBal);
    resultSheet.getRange(tgtRow, 5).setValue(variousBals.runningCap360ChkBal);
    resultSheet.getRange(tgtRow, 6).setValue(variousBals.runningPncSavBal);
    resultSheet.getRange(tgtRow, 7).setValue(variousBals.runningEMGDBal);
    resultSheet.getRange(tgtRow, 8).setValue(variousBals.currActivityString);
    // then reset the string
    variousBals.currActivityString = "Start: ";
  }
  //end loop
  
}

function iterateOverRange(currentDate, aRange, variousBals) {
  //Logger.log("Received running totals: PNC=" + variousBals.runningPncChkBal + " Chase= " + variousBals.currChaseCrCrdBal + " aaa= " + variousBals.currAaaCrCrdBal);
  
  //passed in range has columns for dayOfXXXX, itemcategory, itemName, tranAmount, cash/credit indicator
  var rangeRowContent = "rangeRowContent: ";  // to print the content for debug purpose
  var numRows = aRange.getNumRows();
  var numCols = aRange.getNumColumns(); 
  //get dayOfWeek corresponding to  currentDate in variable dayOfWeek
  var dayOfWeek = currentDate.getDay();
  // get dayOfMonth corresponding to  currentDate in variable dayOfMonth
  var dayOfMonth = currentDate.getDate();

  // loop over from the first to last row of the passed in range
    for (var i = 1; i <= numRows; i++) {
       for (var j = 1; j <= numCols; j++) {
         var currentValue = aRange.getCell(i,j).getValue();
         rangeRowContent = rangeRowContent + " | " + currentValue;  // build the debug string
      }

      // for each row of the range operateOnBalances() will be called with parameters: currentDate, values from columns of current rule row, running balances
      var dayFromCurrentRule = aRange.getCell(i,1).getValue();
      var itemCategory1FromCurrentRule = aRange.getCell(i,2).getValue();
      var itemNameFromCurrentRule = aRange.getCell(i,3).getValue();
      var amountFromCurrentRule = aRange.getCell(i,4).getValue();
      var cash_creditFromCurrentRule = aRange.getCell(i,5).getValue();
      operateOnBalances(currentDate, dayFromCurrentRule, itemCategory1FromCurrentRule, itemNameFromCurrentRule, amountFromCurrentRule,cash_creditFromCurrentRule,variousBals);
      
      //Logger.log(rangeRowContent);
      if (itemCategory1FromCurrentRule=="adhoc"){  // for debug purpose
        Logger.log("###ATTENTION: currentDate= " + currentDate.getTime() + " dayFromRule= " + dayFromCurrentRule.getTime());
      }

      rangeRowContent = "rangeRowContent: ";  // reset the debug string as preparation for next row in the range
    }
   
  // end loop
      Logger.log("got it" + " Date=" + currentDate + " dayOfWeek= " + dayOfWeek + " dayOfMonth= " + dayOfMonth + " range=" + aRange.getDisplayValue());
}

function operateOnBalances(currentDate, dayFromRule, itemCategory1FromRule, itemNameFromRule, amountFromRule,cash_creditFromRule, variousBals){
  //Logger.log("Into operateOnBalances");
  //manipulate elements inside the passed object for debugging purpose
  
  //variousBals.currChaseCrCrdBal++;
  //variousBals.currAaaCrCrdBal++;
  //get dayOfWeek corresponding to  currentDate in variable dayOfWeek
  var dayOfWeek = currentDate.getDay();
  // get dayOfMonth corresponding to  currentDate in variable dayOfMonth
  var dayOfMonth = currentDate.getDate();
  

  // if this is a weekly item and dayOfWeek of current day in iteration matches the day number in current row
   if (itemCategory1FromRule =="weeklyItem" && dayOfWeek==dayFromRule){ // if value in 2nd column is 'weeklyItem'  
     Logger.log("From Balance Operation: this is a weekly item! and a match found with current day");
     applyTransaction2CurrentBalance (itemNameFromRule, cash_creditFromRule, variousBals, amountFromRule);

   }
    
      // if this is a monthly item and dayOfMonth of current day in iteration matches the day number in current row
     if (itemCategory1FromRule =="monthlyItem" && dayOfMonth==dayFromRule){ // if value in 2nd column is 'monthlyItem'  
       Logger.log("From Balance Operation: this is a monthly item!");
       applyTransaction2CurrentBalance (itemNameFromRule, cash_creditFromRule, variousBals, amountFromRule);
     }

      ////// if cash/credit indicator = CRA then apply tranAmount to aaaCrCrdBal running total
  // if this is a adhoc item and date value of current day in iteration matches the date in current rule
  if (itemCategory1FromRule=="adhoc" && currentDate.getTime() == dayFromRule.getTime()){ // date match is through getTime()
     Logger.log("From Balance Operation: this is a adhoc item!");
     applyTransaction2CurrentBalance (itemNameFromRule, cash_creditFromRule, variousBals, amountFromRule);
  }
  
}

function applyTransaction2CurrentBalance (itemNameFromRule, cash_creditFromRule, variousBals, amountFromRule){
     // if cash/credit indicator = CA then apply tranAmount to pncChkBal running total
     if (cash_creditFromRule == 'CA'){
       applTran2CurrBalPNCchk (variousBals, amountFromRule);
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + amountFromRule + ":" + cash_creditFromRule;
      }

     // if cash/credit indicator = CAS then apply tranAmount to pncSavBal running total
     if (cash_creditFromRule == 'CAS'){
        applTran2CurrBalPNCsav (variousBals, amountFromRule);
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + amountFromRule + ":" + cash_creditFromRule;
      }
     
     // if cash/credit indicator = CACC then apply tranAmount to cap360ChkBal running total
     if (cash_creditFromRule == 'CACC'){
       applTran2CurrBalCap360Chk(variousBals, amountFromRule);
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + amountFromRule + ":" + cash_creditFromRule;
      }

     // if cash/credit indicator = CAEMGD then apply tranAmount to EMGDBal running total
     if (cash_creditFromRule == 'CAEMGD'){
       applTran2CurrBalEmgd(variousBals, amountFromRule);
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + amountFromRule + ":" + cash_creditFromRule;
      }

     // if cash/credit indicator = CRCH then apply tranAmount to chaseCrCrdBal running total
     if (cash_creditFromRule == 'CRCH'){
       variousBals.currChaseCrCrdBal = variousBals.currChaseCrCrdBal + amountFromRule;
       Logger.log("Applying to Chase credit card");
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + amountFromRule + ":" + cash_creditFromRule;
      }

     // if cash/credit indicator = CRAA then apply tranAmount to aaaCrCrdBal running total
     if (cash_creditFromRule == 'CRAA'){
       variousBals.currAaaCrCrdBal = variousBals.currAaaCrCrdBal + amountFromRule;
       Logger.log("Applying to AAA credit card");
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + amountFromRule + ":" + cash_creditFromRule;
      }

     // handle special case of cr crd payment CACRCH, CACRAA, CACRCO
     if (cash_creditFromRule == 'CACRCH'){
       variousBals.runningPncChkBal = variousBals.runningPncChkBal + variousBals.currChaseCrCrdBal;
       // save variousBals.currChaseCrCrdBal before resetting itin order to report in activity string
       var tempChaseCrCrdBal = variousBals.currChaseCrCrdBal;
       variousBals.currChaseCrCrdBal = 0;
       Logger.log("Applying to Balance Payment of Chase credit card");
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + tempChaseCrCrdBal + ":" + cash_creditFromRule;
      }
     if (cash_creditFromRule == 'CACRAA'){
       variousBals.runningPncChkBal = variousBals.runningPncChkBal + variousBals.currAaaCrCrdBal;
       // save variousBals.currChaseCrCrdBal before resetting itin order to report in activity string
       var tempAaaCrCrdBal = variousBals.currAaaCrCrdBal;
       variousBals.currAaaCrCrdBal = 0;
       Logger.log("Applying to Balance Payment of AAA credit card");
       // build activity string
       variousBals.currActivityString = variousBals.currActivityString + "," + itemNameFromRule + ":" + tempAaaCrCrdBal + ":" + cash_creditFromRule;
      }
}

function applTran2CurrBalPNCchk (variousBals, amountFromRule) {
  Logger.log("Applying to PNCchk");
  variousBals.runningPncChkBal = variousBals.runningPncChkBal + amountFromRule;

}

function applTran2CurrBalPNCsav (variousBals, amountFromRule) {
  Logger.log("Applying to PNCsav");
  variousBals.runningPncSavBal = variousBals.runningPncSavBal + amountFromRule;

}

function applTran2CurrBalCap360Chk (variousBals, amountFromRule) {
  Logger.log("Applying to CapitalOne360Checking");
  variousBals.runningCap360ChkBal = variousBals.runningCap360ChkBal + amountFromRule;
}

function applTran2CurrBalCap360Sav () {
  
}

function applTran2CurrBalEmgd (variousBals, amountFromRule) {
  Logger.log("Applying to EMGD");
  variousBals.runningEMGDBal = variousBals.runningEMGDBal + amountFromRule;
}

function applTran2CurrBalCRcrd () {
  
}
