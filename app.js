'use strict';  
const escHtml = (value) => String(value ?? '')  
  .replace(/&/g,'&amp;')  
  .replace(/</g,'&lt;')  
  .replace(/>/g,'&gt;')  
  .replace(/"/g,'&quot;')  
  .replace(/'/g,'&#39;');  
const escAttr = escHtml;  
const uniqueList = (items) => [...new Set((items || []).filter(item => item !== undefined && item !== null && item !== ''))];  
let consultantByNorm={};
let consultantNACache=new Set();
let consultantColorMap={};
  
const members=[{"name": "Tom Craddick", "party": "R", "district": 82, "seniority": 1, "committees": ["Energy Resources", "Transportation, CH"]}, {"name": "Senfronia Thompson", "party": "D", "district": 141, "seniority": 2, "committees": ["Licensing & Administrative Procedures, VCH", "State Affairs"]}, {"name": "Harold Dutton, Jr.", "party": "D", "district": 142, "seniority": 3, "committees": ["Judiciary & Civil Jurisprudence", "Public Education"]}, {"name": "John Smithee", "party": "R", "district": 86, "seniority": 4, "committees": ["Criminal Jurisprudence, CH", "State Affairs"]}, {"name": "Yvonne Davis", "party": "D", "district": 111, "seniority": 5, "committees": ["Land & Resource Management", "State Affairs"]}, {"name": "Richard Raymond", "party": "D", "district": 42, "seniority": 6, "committees": ["Elections", "State Affairs"]}, {"name": "Charlie Geren", "party": "R", "district": 99, "seniority": 7, "committees": ["General Investigating", "House Administration, CH", "Licensing & Administrative Procedures", "State Affairs"]}, {"name": "Todd Hunter", "party": "R", "district": 32, "seniority": 8, "committees": ["Calendars, CH", "Land & Resource Management", "Public Education"]}, {"name": "Ryan Guillen", "party": "R", "district": 31, "seniority": 9, "committees": ["Agriculture & Livestock, CH", "Redistricting", "State Affairs"]}, {"name": "Trey Martinez Fischer", "party": "D", "district": 116, "seniority": 10, "committees": ["Culture, Recreation & Tourism", "Ways & Means, VCH"]}, {"name": "Alma Allen", "party": "D", "district": 131, "seniority": 11, "committees": ["Corrections", "Public Education"]}, {"name": "Hubert Vo", "party": "D", "district": 149, "seniority": 12, "committees": ["Insurance, VCH", "Pensions, Investments & Financial Services"]}, {"name": "Armando Martinez", "party": "D", "district": 39, "seniority": 13, "committees": ["Appropriations", "House Administration", "Natural Resources, VCH"]}, {"name": "Rafael Anchia", "party": "D", "district": 103, "seniority": 14, "committees": ["Environmental Regulation", "State Affairs"]}, {"name": "Ana Hernandez", "party": "D", "district": 143, "seniority": 15, "committees": ["Calendars", "Licensing & Administrative Procedures", "State Affairs, VCH"]}, {"name": "Donna Howard", "party": "D", "district": 48, "seniority": 16, "committees": ["Appropriations", "Higher Education, VCH"]}, {"name": "Drew Darby", "party": "R", "district": 72, "seniority": 17, "committees": ["Energy Resources, CH", "House Administration", "State Affairs"]}, {"name": "Angie Chen Button", "party": "R", "district": 112, "seniority": 18, "committees": ["House Administration", "Trade, Workforce & Economic Development, CH", "Ways & Means"]}, {"name": "Armando Walle", "party": "D", "district": 140, "seniority": 19, "committees": ["Appropriations", "Licensing & Administrative Procedures"]}, {"name": "J.M. Lozano", "party": "R", "district": 43, "seniority": 20, "committees": ["Appropriations", "Corrections"]}, {"name": "Sergio Munoz, Jr.", "party": "D", "district": 36, "seniority": 21, "committees": ["Agriculture & Livestock", "Ways & Means"]}, {"name": "Ron Reynolds", "party": "D", "district": 27, "seniority": 22, "committees": ["Energy Resources", "Environmental Regulation", "House Administration"]}, {"name": "Joe Moody", "party": "D", "district": 78, "seniority": 23, "committees": ["Criminal Jurisprudence", "General Investigating", "House Administration", "Judiciary & Civil Jurisprudence"]}, {"name": "Chris Turner", "party": "D", "district": 101, "seniority": 24, "committees": ["State Affairs", "Ways & Means"]}, {"name": "Bobby Guerra", "party": "D", "district": 41, "seniority": 25, "committees": ["Agriculture & Livestock, VCH", "Energy Resources", "Redistricting"]}, {"name": "Mary Gonzalez", "party": "D", "district": 75, "seniority": 26, "committees": ["Appropriations, VCH", "Natural Resources"]}, {"name": "Cecil Bell, Jr.", "party": "R", "district": 3, "seniority": 27, "committees": ["Intergovernmental Affairs, CH", "Natural Resources"]}, {"name": "Gene Wu", "party": "D", "district": 137, "seniority": 28, "committees": ["Appropriations", "Criminal Jurisprudence, VCH", "Redistricting"]}, {"name": "Nicole Collier", "party": "D", "district": 95, "seniority": 29, "committees": ["Appropriations", "Public Health"]}, {"name": "Jeff Leach", "party": "R", "district": 67, "seniority": 30, "committees": ["Calendars", "Judiciary & Civil Jurisprudence, CH", "Public Education"]}, {"name": "Oscar Longoria", "party": "D", "district": 35, "seniority": 31, "committees": ["Licensing & Administrative Procedures", "Trade, Workforce & Economic Development"]}, {"name": "Trent Ashby", "party": "R", "district": 9, "seniority": 32, "committees": ["Natural Resources", "Public Education"]}, {"name": "Greg Bonnen", "party": "R", "district": 24, "seniority": 33, "committees": ["Appropriations, CH", "General Investigating"]}, {"name": "Giovanni Capriglione", "party": "R", "district": 98, "seniority": 34, "committees": ["Delivery of Government Efficiency, CH", "Ways & Means"]}, {"name": "Toni Rose", "party": "D", "district": 110, "seniority": 35, "committees": ["Appropriations", "Calendars, VCH", "Human Services"]}, {"name": "Ken King", "party": "R", "district": 88, "seniority": 36, "committees": ["House Administration", "State Affairs, CH"]}, {"name": "Terry Canales", "party": "D", "district": 40, "seniority": 37, "committees": ["Calendars", "Homeland Security, Public Safety & Veterans' Affairs", "Transportation", "Transportation"]}, {"name": "James Frank", "party": "R", "district": 69, "seniority": 38, "committees": ["Public Education", "Public Health"]}, {"name": "Alan Schoolcraft", "party": "R", "district": 44, "seniority": 39, "committees": ["Pensions, Investments & Financial Services", "Public Education"]}, {"name": "John Bryant", "party": "D", "district": 114, "seniority": 40, "committees": ["Pensions, Investments & Financial Services", "Public Education"]}, {"name": "Will Metcalf", "party": "R", "district": 16, "seniority": 41, "committees": ["Culture, Recreation & Tourism, CH", "State Affairs"]}, {"name": "Dade Phelan", "party": "R", "district": 21, "seniority": 42, "committees": ["Licensing & Administrative Procedures, CH", "State Affairs"]}, {"name": "Gary VanDeaver", "party": "R", "district": 1, "seniority": 43, "committees": ["Higher Education", "Public Health, CH"]}, {"name": "Matt Shaheen", "party": "R", "district": 66, "seniority": 44, "committees": ["Elections, CH", "Higher Education"]}, {"name": "Morgan Meyer", "party": "R", "district": 108, "seniority": 45, "committees": ["House Administration", "Ways & Means, CH"]}, {"name": "Dennis Paul", "party": "R", "district": 129, "seniority": 46, "committees": ["Insurance", "Transportation", "Transportation"]}, {"name": "Dustin Burrows", "party": "R", "district": 83, "seniority": 47, "committees": ["Speaker of the House"]}, {"name": "Brooks Landgraf", "party": "R", "district": 81, "seniority": 48, "committees": ["Environmental Regulation, CH", "Judiciary & Civil Jurisprudence"]}, {"name": "Ramon Romero, Jr.", "party": "D", "district": 90, "seniority": 49, "committees": ["Calendars", "Licensing & Administrative Procedures", "Natural Resources"]}, {"name": "Tony Tinderholt", "party": "R", "district": 94, "seniority": 50, "committees": ["Delivery of Government Efficiency", "Higher Education"]}, {"name": "Philip Cortez", "party": "D", "district": 117, "seniority": 51, "committees": ["Homeland Security, Public Safety & Veterans' Affairs", "Intergovernmental Affairs"]}, {"name": "Mary Ann Perez", "party": "D", "district": 144, "seniority": 52, "committees": ["Licensing & Administrative Procedures", "Transportation, VCH", "Transportation"]}, {"name": "Diego Bernal", "party": "D", "district": 123, "seniority": 53, "committees": ["Public Education, VCH", "Ways & Means"]}, {"name": "Briscoe Cain", "party": "R", "district": 128, "seniority": 54, "committees": ["Agriculture & Livestock", "Delivery of Government Efficiency"]}, {"name": "Cole Hefner", "party": "R", "district": 5, "seniority": 55, "committees": ["Homeland Security, Public Safety & Veterans' Affairs, CH", "Redistricting", "Transportation", "Transportation"]}, {"name": "Barbara Gervin-Hawkins", "party": "D", "district": 120, "seniority": 56, "committees": ["Appropriations", "Redistricting", "Ways & Means"]}, {"name": "Stan Lambert", "party": "R", "district": 71, "seniority": 57, "committees": ["Higher Education", "Pensions, Investments & Financial Services, CH"]}, {"name": "Tom Oliverson", "party": "R", "district": 130, "seniority": 58, "committees": ["Appropriations", "Environmental Regulation", "Redistricting"]}, {"name": "Jay Dean", "party": "R", "district": 7, "seniority": 59, "committees": ["Energy Resources", "Insurance, CH"]}, {"name": "Valoree Swanson", "party": "R", "district": 150, "seniority": 60, "committees": ["Elections", "Human Services"]}, {"name": "Gina Hinojosa", "party": "D", "district": 49, "seniority": 61, "committees": ["Land & Resource Management", "Public Education"]}, {"name": "Terry Wilson", "party": "R", "district": 20, "seniority": 62, "committees": ["Intergovernmental Affairs", "Public Education"]}, {"name": "Steve Toth", "party": "R", "district": 15, "seniority": 63, "committees": ["Elections", "Environmental Regulation"]}, {"name": "Mike Schofield", "party": "R", "district": 132, "seniority": 64, "committees": ["Judiciary & Civil Jurisprudence", "Public Health"]}, {"name": "James Talarico", "party": "D", "district": 50, "seniority": 65, "committees": ["House Administration", "Public Education", "Trade, Workforce & Economic Development, VCH"]}, {"name": "John Bucy", "party": "D", "district": 136, "seniority": 66, "committees": ["Elections, VCH", "Local & Consent Calendars", "Public Health"]}, {"name": "Jon Rosenthal", "party": "D", "district": 135, "seniority": 67, "committees": ["Energy Resources", "Intergovernmental Affairs", "Redistricting, VCH"]}, {"name": "Sam Harless", "party": "R", "district": 126, "seniority": 68, "committees": ["Corrections, CH", "House Administration", "Licensing & Administrative Procedures"]}, {"name": "Ana-Maria Rodriguez Ramos", "party": "D", "district": 102, "seniority": 69, "committees": ["Criminal Jurisprudence", "Delivery of Government Efficiency"]}, {"name": "Brad Buckley", "party": "R", "district": 54, "seniority": 70, "committees": ["Natural Resources", "Public Education, CH"]}, {"name": "Rhetta Andrews Bowers", "party": "D", "district": 113, "seniority": 71, "committees": ["Criminal Jurisprudence", "Delivery of Government Efficiency", "Local & Consent Calendars, VCH"]}, {"name": "Candy Noble", "party": "R", "district": 89, "seniority": 72, "committees": ["Human Services", "Ways & Means"]}, {"name": "Jessica Gonzalez", "party": "D", "district": 104, "seniority": 73, "committees": ["Insurance", "Judiciary & Civil Jurisprudence", "Local & Consent Calendars"]}, {"name": "Sheryl Cole", "party": "D", "district": 46, "seniority": 74, "committees": ["Culture, Recreation & Tourism", "House Administration, VCH", "Intergovernmental Affairs"]}, {"name": "Terry Meza", "party": "D", "district": 105, "seniority": 75, "committees": ["Corrections", "Trade, Workforce & Economic Development"]}, {"name": "Cody Harris", "party": "R", "district": 8, "seniority": 76, "committees": ["Calendars", "Licensing & Administrative Procedures", "Natural Resources, CH"]}, {"name": "Erin Zwiener", "party": "D", "district": 45, "seniority": 77, "committees": ["Intergovernmental Affairs, VCH", "Local & Consent Calendars", "Natural Resources"]}, {"name": "Vikki Goodwin", "party": "D", "district": 47, "seniority": 78, "committees": ["Appropriations", "Insurance"]}, {"name": "Jared Patterson", "party": "R", "district": 106, "seniority": 79, "committees": ["Licensing & Administrative Procedures", "Local & Consent Calendars, CH", "Transportation", "Transportation"]}, {"name": "Keith Bell", "party": "R", "district": 4, "seniority": 80, "committees": ["Environmental Regulation", "General Investigating, CH", "Trade, Workforce & Economic Development"]}, {"name": "Christina Morales", "party": "D", "district": 145, "seniority": 81, "committees": ["Human Services", "Transportation"]}, {"name": "Ray Lopez", "party": "D", "district": 125, "seniority": 82, "committees": ["Homeland Security, Public Safety & Veterans' Affairs, VCH", "Land & Resource Management"]}, {"name": "Gary Gates", "party": "R", "district": 28, "seniority": 83, "committees": ["Energy Resources", "Land & Resource Management, CH"]}, {"name": "John Lujan", "party": "R", "district": 118, "seniority": 84, "committees": ["Appropriations", "Local & Consent Calendars", "Trade, Workforce & Economic Development"]}, {"name": "Eddie Morales", "party": "D", "district": 74, "seniority": 85, "committees": ["Energy Resources, VCH", "Transportation"]}, {"name": "Cody Vasut", "party": "R", "district": 25, "seniority": 86, "committees": ["Culture, Recreation & Tourism", "Redistricting, CH", "Ways & Means"]}, {"name": "David Cook", "party": "R", "district": 96, "seniority": 87, "committees": ["Criminal Jurisprudence", "Delivery of Government Efficiency"]}, {"name": "Claudia Ordaz", "party": "D", "district": 79, "seniority": 88, "committees": ["Environmental Regulation, VCH", "Trade, Workforce & Economic Development"]}, {"name": "Ann Johnson", "party": "D", "district": 134, "seniority": 89, "committees": ["Calendars", "Judiciary & Civil Jurisprudence, VCH", "Public Health"]}, {"name": "Shelby Slawson", "party": "R", "district": 59, "seniority": 90, "committees": ["Appropriations", "Human Services"]}, {"name": "Liz Campos", "party": "D", "district": 119, "seniority": 91, "committees": ["Delivery of Government Efficiency", "Public Health, VCH"]}, {"name": "Penny Morales Shaw", "party": "D", "district": 148, "seniority": 92, "committees": ["Elections", "Environmental Regulation"]}, {"name": "Lacey Hull", "party": "R", "district": 138, "seniority": 93, "committees": ["Human Services, CH", "State Affairs"]}, {"name": "David Spiller", "party": "R", "district": 68, "seniority": 94, "committees": ["Insurance", "Intergovernmental Affairs", "Redistricting"]}, {"name": "Brian Harrison", "party": "R", "district": 10, "seniority": 95, "committees": ["Appropriations", "Corrections"]}, {"name": "Erin Gamez", "party": "D", "district": 38, "seniority": 96, "committees": ["General Investigating, VCH", "Natural Resources", "Transportation"]}, {"name": "Jolanda Jones", "party": "D", "district": 147, "seniority": 97, "committees": ["Criminal Jurisprudence", "Public Health", "Redistricting"]}, {"name": "Lulu Flores", "party": "D", "district": 51, "seniority": 98, "committees": ["Culture, Recreation & Tourism, VCH", "Judiciary & Civil Jurisprudence"]}, {"name": "Terri Leo Wilson", "party": "R", "district": 23, "seniority": 99, "committees": ["Intergovernmental Affairs", "Public Education"]}, {"name": "Caroline Harris Davila", "party": "R", "district": 52, "seniority": 100, "committees": ["Trade, Workforce & Economic Development", "Transportation"]}, {"name": "Josey Garcia", "party": "D", "district": 124, "seniority": 101, "committees": ["Energy Resources", "Natural Resources", "Redistricting"]}, {"name": "Venton Jones", "party": "D", "district": 100, "seniority": 102, "committees": ["Appropriations", "Corrections, VCH"]}, {"name": "Stan Gerdes", "party": "R", "district": 17, "seniority": 103, "committees": ["Calendars", "Energy Resources", "Licensing & Administrative Procedures"]}, {"name": "Carl Tepper", "party": "R", "district": 84, "seniority": 104, "committees": ["Appropriations", "Calendars", "Intergovernmental Affairs", "Redistricting"]}, {"name": "Charles Cunningham", "party": "R", "district": 127, "seniority": 105, "committees": ["Local & Consent Calendars", "Public Education", "Public Health"]}, {"name": "Janie Lopez", "party": "R", "district": 37, "seniority": 106, "committees": ["Agriculture & Livestock", "Appropriations", "Calendars"]}, {"name": "Stan Kitzman", "party": "R", "district": 85, "seniority": 107, "committees": ["Agriculture & Livestock", "Appropriations"]}, {"name": "Carrie Isaac", "party": "R", "district": 73, "seniority": 108, "committees": ["Elections", "Homeland Security, Public Safety & Veterans' Affairs"]}, {"name": "Salman Bhojani", "party": "D", "district": 92, "seniority": 109, "committees": ["Delivery of Government Efficiency, VCH", "Trade, Workforce & Economic Development"]}, {"name": "Suleman Lalani", "party": "D", "district": 76, "seniority": 110, "committees": ["Higher Education", "Land & Resource Management, VCH"]}, {"name": "Angelia Orr", "party": "R", "district": 13, "seniority": 111, "committees": ["Appropriations", "Culture, Recreation & Tourism"]}, {"name": "Mano DeAyala", "party": "R", "district": 133, "seniority": 112, "committees": ["Appropriations", "Culture, Recreation & Tourism"]}, {"name": "Mark Dorazio", "party": "R", "district": 122, "seniority": 113, "committees": ["Homeland Security, Public Safety & Veterans' Affairs", "Human Services"]}, {"name": "Ben Bumgarner", "party": "R", "district": 63, "seniority": 114, "committees": ["Environmental Regulation", "Pensions, Investments & Financial Services"]}, {"name": "Nate Schatzline", "party": "R", "district": 93, "seniority": 115, "committees": ["Corrections", "Human Services"]}, {"name": "Christian Manuel", "party": "D", "district": 22, "seniority": 116, "committees": ["Appropriations", "Human Services, VCH", "Redistricting"]}, {"name": "Ellen Troxclair", "party": "R", "district": 19, "seniority": 117, "committees": ["Delivery of Government Efficiency", "Ways & Means"]}, {"name": "Mihaela Plesa", "party": "D", "district": 70, "seniority": 118, "committees": ["Elections", "Pensions, Investments & Financial Services, VCH"]}, {"name": "Richard Hayes", "party": "R", "district": 57, "seniority": 119, "committees": ["Judiciary & Civil Jurisprudence", "Pensions, Investments & Financial Services"]}, {"name": "Pat Curry", "party": "R", "district": 56, "seniority": 120, "committees": ["Delivery of Government Efficiency", "Transportation"]}, {"name": "Jeff Barry", "party": "R", "district": 29, "seniority": 121, "committees": ["Appropriations", "Local & Consent Calendars", "Natural Resources"]}, {"name": "Cassandra Garcia Hernandez", "party": "D", "district": 115, "seniority": 122, "committees": ["Appropriations", "Intergovernmental Affairs"]}, {"name": "AJ Louderback", "party": "R", "district": 30, "seniority": 123, "committees": ["Criminal Jurisprudence", "Homeland Security, Public Safety & Veterans' Affairs"]}, {"name": "Keresa Richardson", "party": "R", "district": 61, "seniority": 124, "committees": ["Human Services", "Trade, Workforce & Economic Development"]}, {"name": "Denise Villalobos", "party": "R", "district": 34, "seniority": 125, "committees": ["Appropriations", "Local & Consent Calendars", "Natural Resources"]}, {"name": "Trey Wharton", "party": "R", "district": 12, "seniority": 126, "committees": ["Corrections", "Insurance"]}, {"name": "Brent Money", "party": "R", "district": 2, "seniority": 127, "committees": ["Agriculture & Livestock", "Criminal Jurisprudence"]}, {"name": "Don McLaughlin", "party": "R", "district": 80, "seniority": 128, "committees": ["Agriculture & Livestock", "Homeland Security, Public Safety & Veterans' Affairs"]}, {"name": "Janis Holt", "party": "R", "district": 18, "seniority": 129, "committees": ["Homeland Security, Public Safety & Veterans' Affairs", "Pensions, Investments & Financial Services"]}, {"name": "Mitch Little", "party": "R", "district": 65, "seniority": 130, "committees": ["Criminal Jurisprudence", "Transportation"]}, {"name": "David Lowe", "party": "R", "district": 91, "seniority": 131, "committees": ["Corrections", "Intergovernmental Affairs"]}, {"name": "Linda Garcia", "party": "D", "district": 107, "seniority": 132, "committees": ["Delivery of Government Efficiency", "Pensions, Investments & Financial Services"]}, {"name": "Caroline Fairly", "party": "R", "district": 87, "seniority": 133, "committees": ["Appropriations", "Local & Consent Calendars", "Natural Resources"]}, {"name": "Shelley Luther", "party": "R", "district": 62, "seniority": 134, "committees": ["Intergovernmental Affairs", "Trade, Workforce & Economic Development"]}, {"name": "Daniel Alders", "party": "R", "district": 6, "seniority": 135, "committees": ["Delivery of Government Efficiency", "Land & Resource Management"]}, {"name": "Marc LaHood", "party": "R", "district": 121, "seniority": 136, "committees": ["Judiciary & Civil Jurisprudence", "Transportation"]}, {"name": "John McQueeney", "party": "R", "district": 97, "seniority": 137, "committees": ["Licensing & Administrative Procedures", "State Affairs"]}, {"name": "Lauren Simmons", "party": "D", "district": 146, "seniority": 138, "committees": ["Appropriations", "Public Health"]}, {"name": "Vincent Perez", "party": "D", "district": 77, "seniority": 139, "committees": ["Higher Education", "Local & Consent Calendars", "Ways & Means"]}, {"name": "Charlene Ward Johnson", "party": "D", "district": 139, "seniority": 140, "committees": ["Culture, Recreation & Tourism", "Higher Education"]}, {"name": "Katrina Pierson", "party": "R", "district": 33, "seniority": 141, "committees": ["Homeland Security, Public Safety & Veterans' Affairs", "Public Health"]}, {"name": "Matt Morgan", "party": "R", "district": 26, "seniority": 142, "committees": ["Insurance", "Land & Resource Management"]}, {"name": "Mike Olcott", "party": "R", "district": 60, "seniority": 143, "committees": ["Delivery of Government Efficiency", "Public Health"]}, {"name": "Paul Dyson", "party": "R", "district": 14, "seniority": 144, "committees": ["Energy Resources", "Judiciary & Civil Jurisprudence"]}, {"name": "Helen Kerwin", "party": "R", "district": 58, "seniority": 145, "committees": ["Culture, Recreation & Tourism", "Public Education"]}, {"name": "Hillary Hickland", "party": "R", "district": 55, "seniority": 146, "committees": ["Homeland Security, Public Safety & Veterans' Affairs", "Redistricting", "Ways & Means"]}, {"name": "Andy Hopper", "party": "R", "district": 64, "seniority": 147, "committees": ["Agriculture & Livestock", "Insurance"]}, {"name": "Wes Virdell", "party": "R", "district": 53, "seniority": 148, "committees": ["Criminal Jurisprudence", "Land & Resource Management"]}, {"name": "Aicha Davis", "party": "D", "district": 109, "seniority": 149, "committees": ["Higher Education", "Human Services"]}, {"name": "Joanne Shofner", "party": "R", "district": 11, "seniority": 150, "committees": ["Higher Education", "Public Health"]}];  
const elections={"1":{"march_r":[["GARY VANDEAVER",13928,"R"],["CHRIS SPENCER",13165,"R"],["DALE HULS",3496,"R"]],"may_r":[["GARY VANDEAVER",11718,"R"],["CHRIS SPENCER",10178,"R"]],"general":[["GARY VANDEAVER",66843,"R"]]},"2":{"march_r":[["BRENT A. MONEY",17300,"R"],["JILL DUTTON",13110,"R"]],"march_d":[["KRISTEN WASHINGTON",2256,"D"]],"general":[["BRENT A. MONEY",71222,"R"],["KRISTEN WASHINGTON",17182,"D"]]},"3":{"march_r":[["CECIL BELL JR",21477,"R"]],"general":[["CECIL BELL JR",85793,"R"]]},"4":{"march_r":[["KEITH BELL",15863,"R"],["JOSHUA FEUERSTEIN",5255,"R"]],"march_d":[["ALEX BAR-SELA",3382,"D"]],"general":[["KEITH BELL",60287,"R"],["ALEX BAR-SELA",26240,"D"]]},"5":{"march_r":[["COLE HEFNER",20040,"R"],["JEFF FLETCHER",5547,"R"],["DEWEY COLLIER",3119,"R"]],"general":[["COLE HEFNER",74381,"R"],["NANCY A. NICHOLS",910,"I"]]},"6":{"march_r":[["DANIEL ALDERS",16342,"R"]],"march_d":[["CODY J GRACE",3507,"D"]],"general":[["DANIEL ALDERS",56497,"R"],["CODY J GRACE",22158,"D"]]},"7":{"march_r":[["JAY DEAN",15629,"R"],["JOE MCDANIEL",4973,"R"],["BONNIE WALTERS",1115,"R"]],"march_d":[["MARLENA R. COOPER",3379,"D"]],"general":[["JAY DEAN",59056,"R"],["MARLENA R. COOPER",20520,"D"]]},"8":{"march_r":[["CODY HARRIS",21179,"R"],["JAYE CURTIS",4386,"R"]],"march_d":[["CAROLYN F. SALTER",2365,"D"]],"general":[["CODY HARRIS",60938,"R"],["CAROLYN F. SALTER",13961,"D"]]},"9":{"march_r":[["TRENT ASHBY",24331,"R"],["PAULETTE CARSON",5284,"R"]],"general":[["TRENT ASHBY",74006,"R"]]},"10":{"march_r":[["BRIAN HARRISON",16282,"R"]],"general":[["BRIAN HARRISON",68706,"R"],["JENNIFER BRUMMELL",888,"L"],["JEREMY SCHROPPEL",40,"L"]]},"11":{"march_r":[["JOANNE SHOFNER",19712,"R"],["TRAVIS CLARDY",11601,"R"]],"general":[["JOANNE SHOFNER",62338,"R"]]},"12":{"march_r":[["TREY WHARTON",10506,"R"],["BEN BIUS",9804,"R"],["JOHN HARVEY SLOCUM",9712,"R"]],"march_d":[["DEE HOWARD MULLINS",2956,"D"]],"may_r":[["TREY WHARTON",10139,"R"],["BEN BIUS",3871,"R"]],"general":[["TREY WHARTON",64105,"R"],["DEE HOWARD MULLINS",19325,"D"]]},"13":{"march_r":[["ANGELIA ORR",18121,"R"]],"march_d":[["ALBERT HUNTER",2795,"D"]],"general":[["ANGELIA ORR",55317,"R"],["ALBERT HUNTER",17301,"D"]]},"14":{"march_r":[["PAUL DYSON",9754,"R"],["RICK DAVIS",5564,"R"]],"march_d":[["FRED MEDINA",3007,"D"]],"general":[["PAUL DYSON",40262,"R"],["FRED MEDINA",26332,"D"]]},"15":{"march_r":[["STEVE TOTH",15972,"R"],["SKEETER HUBERT",8384,"R"]],"general":[["STEVE TOTH",73720,"R"]]},"16":{"march_r":[["WILL METCALF",24109,"R"]],"march_d":[["MIKE MIDLER",2089,"D"]],"general":[["WILL METCALF",73385,"R"],["MIKE MIDLER",17930,"D"]]},"17":{"march_r":[["STAN GERDES",14159,"R"],["TOM GLASS",10315,"R"]],"march_d":[["DESIREE VENABLE",5287,"D"]],"general":[["STAN GERDES",53531,"R"],["DESIREE VENABLE",27389,"D"]]},"18":{"march_r":[["JANIS HOLT",15014,"R"],["ERNEST BAILES",10952,"R"],["STEPHEN ANDREW MISSICK",2258,"R"]],"general":[["JANIS HOLT",69326,"R"],["SETH STEELE",10749,"D"]]},"19":{"march_r":[["ELLEN TROXCLAIR",20826,"R"],["KYLE BIEDERMANN",17189,"R"],["MANNY CAMPOS",1942,"R"]],"march_d":[["DWAIN HANDLEY",3599,"D"],["ZACH VANCE",2697,"D"]],"general":[["ELLEN TROXCLAIR",87416,"R"],["DWAIN HANDLEY",31486,"D"],["KODI SAWIN",4478,"D"]]},"20":{"march_r":[["TERRY M. WILSON",13945,"R"],["ELVA JANINE CHAPA",9532,"R"]],"march_d":[["STEPHEN M. WYMAN",7050,"D"]],"general":[["TERRY M. WILSON",64086,"R"],["STEPHEN M. WYMAN",43148,"D"]]},"21":{"march_r":[["DAVID COVEY",15589,"R"],["DADE PHELAN",14574,"R"],["ALICIA DAVIS",3523,"R"]],"may_r":[["DADE PHELAN",12846,"R"],["DAVID COVEY",12457,"R"]],"general":[["DADE PHELAN",66398,"R"]]},"22":{"march_d":[["CHRISTIAN MANUEL",7167,"D"],["AL \"JAMIE\" PRICE JR",2188,"D"],["LUTHER WAYNE MARTIN III",393,"D"]],"general":[["CHRISTIAN MANUEL",34336,"D"]]},"23":{"march_r":[["TERRI LEO WILSON",16093,"R"]],"march_d":[["DEV MERUGUMALA",4385,"D"]],"general":[["TERRI LEO WILSON",53841,"R"],["DEV MERUGUMALA",26680,"D"]]},"24":{"march_r":[["GREG BONNEN",16983,"R"],["LARISSA RAMIREZ",3361,"R"]],"general":[["GREG BONNEN",78761,"R"]]},"25":{"march_r":[["CODY THANE VASUT",14613,"R"]],"march_d":[["J. DAGGETT",4789,"D"]],"general":[["CODY THANE VASUT",47002,"R"],["J. DAGGETT",29999,"D"]]},"26":{"march_r":[["MATT MORGAN",8786,"R"],["JACEY JETTON",6316,"R"],["JESSICA ROSE HUANG",1235,"R"]],"march_d":[["DANIEL LEE",4646,"D"]],"general":[["MATT MORGAN",48561,"R"],["DANIEL LEE",33505,"D"]]},"27":{"march_r":[["IBIFRISOLAM MAX-ALALIBO",4319,"R"]],"march_d":[["RONALD REYNOLDS",12150,"D"],["RODRIGO CARREON",2050,"D"]],"general":[["RONALD REYNOLDS",57594,"D"],["IBIFRISOLAM MAX-ALALIBO",24908,"R"]]},"28":{"march_r":[["GARY GATES",10612,"R"],["DAN MATHEWS",6764,"R"]],"march_d":[["MARTY ROCHA",3548,"D"],["NELVIN J. ADRIATICO",2677,"D"]],"general":[["GARY GATES",56890,"R"],["MARTY ROCHA",37058,"D"]]},"29":{"march_r":[["JEFFREY BARRY",7775,"R"],["ALEX KAMKAR",7077,"R"],["EDGAR PACHECO JR",756,"R"],["TRENT PEREZ",458,"R"]],"march_d":[["ADRIENNE BELL",5163,"D"]],"may_r":[["JEFFREY BARRY",5339,"R"],["ALEX KAMKAR",3790,"R"]],"general":[["JEFFREY BARRY",49655,"R"],["ADRIENNE BELL",31060,"D"]]},"30":{"march_r":[["JEFF BAUKNIGHT",11384,"R"],["AJ LOUDERBACK",10946,"R"],["VANESSA F. HICKS-CALLAWAY",2733,"R"],["BRET BALDWIN",1998,"R"]],"march_d":[["STEPHANIE R. BASSHAM",2381,"D"]],"may_r":[["AJ LOUDERBACK",9105,"R"],["JEFF BAUKNIGHT",7437,"R"]],"general":[["AJ LOUDERBACK",57180,"R"],["STEPHANIE R. BASSHAM",17120,"D"]]},"31":{"march_r":[["RYAN GUILLEN",11268,"R"]],"general":[["RYAN GUILLEN",50653,"R"]]},"32":{"march_r":[["TODD HUNTER",15801,"R"]],"march_d":[["CATHY MCAULIFFE",4990,"D"]],"general":[["TODD HUNTER",54091,"R"],["CATHY MCAULIFFE",24656,"D"]]},"33":{"march_r":[["KATRINA PIERSON",9832,"R"],["JUSTIN HOLLAND",9630,"R"],["DENNIS LONDON",5444,"R"]],"may_r":[["KATRINA PIERSON",10215,"R"],["JUSTIN HOLLAND",7917,"R"]],"general":[["KATRINA PIERSON",70996,"R"]]},"34":{"march_r":[["DENISE VILLALOBOS",5987,"R"]],"march_d":[["SOLOMON P. ORTIZ JR",4877,"D"],["ROLAND BARRERA",1807,"D"]],"general":[["DENISE VILLALOBOS",28553,"R"],["SOLOMON P. ORTIZ JR",23013,"D"]]},"35":{"march_d":[["OSCAR LONGORIA",5426,"D"]],"general":[["OSCAR LONGORIA",25896,"D"]]},"36":{"march_d":[["SERGIO MU\u00d1OZ JR",6468,"D"]],"general":[["SERGIO MU\u00d1OZ JR",32483,"D"]]},"37":{"march_r":[["JANIE LOPEZ",7477,"R"]],"march_d":[["RUBEN CORTEZ JR",2695,"D"],["JONATHAN GRACIA",2110,"D"],["ALEX DOMINGUEZ",1976,"D"],["CAROL LYNN SANCHEZ",1516,"D"]],"may_d":[["JONATHAN GRACIA",2792,"D"],["RUBEN CORTEZ JR",1760,"D"]],"general":[["JANIE LOPEZ",30590,"R"],["JONATHAN GRACIA",25014,"D"]]},"38":{"march_d":[["ERIN ELIZABETH GAMEZ",7728,"D"]],"general":[["ERIN ELIZABETH GAMEZ",33944,"D"]]},"39":{"march_r":[["JIMMIE GARCIA",3026,"R"]],"march_d":[["ARMANDO \"MANDO\" MARTINEZ",6282,"D"]],"general":[["ARMANDO \"MANDO\" MARTINEZ",26962,"D"],["JIMMIE GARCIA",17308,"R"]]},"40":{"march_d":[["TERRY CANALES",5866,"D"]],"general":[["TERRY CANALES",34671,"D"]]},"41":{"march_r":[["JOHN (DOC) ROBERT GUERRA",5202,"R"]],"march_d":[["BOBBY GUERRA",6937,"D"]],"general":[["BOBBY GUERRA",30589,"D"],["JOHN ROBERT GUERRA",26618,"R"]]},"42":{"march_d":[["RICHARD PENA RAYMOND",12768,"D"]],"general":[["RICHARD PENA RAYMOND",38584,"D"]]},"43":{"march_r":[["J.M. LOZANO",15475,"R"]],"march_d":[["MARIANA CASAREZ",5965,"D"]],"general":[["J.M. LOZANO",43812,"R"],["MARIANA CASAREZ",21842,"D"]]},"44":{"march_r":[["ALAN SCHOOLCRAFT",10922,"R"],["JOHN KUEMPEL",10231,"R"],["GREG SWITZER",1036,"R"],["DAVID FREIMARCK",524,"R"]],"march_d":[["ERIC NORMAN",4241,"D"]],"may_r":[["ALAN SCHOOLCRAFT",8914,"R"],["JOHN KUEMPEL",7136,"R"]],"general":[["ALAN SCHOOLCRAFT",57466,"R"],["ERIC NORMAN",30780,"D"]]},"45":{"march_r":[["TENNYSON G. MORENO",9248,"R"]],"march_d":[["ERIN ZWIENER",8283,"D"],["CHEVO PASTRANO",3386,"D"]],"general":[["ERIN ZWIENER",52912,"D"],["TENNYSON G. MORENO",40312,"R"]]},"46":{"march_r":[["NIKKI KOSICH",3397,"R"]],"march_d":[["SHERYL COLE",11447,"D"]],"general":[["SHERYL COLE",60832,"D"],["NIKKI KOSICH",22223,"R"]]},"47":{"march_r":[["SCOTT FIRSING",8416,"R"]],"march_d":[["VIKKI GOODWIN",12108,"D"]],"general":[["VIKKI GOODWIN",59016,"D"],["SCOTT FIRSING",39066,"R"]]},"48":{"march_d":[["DONNA HOWARD",16975,"D"]],"general":[["DONNA HOWARD",72631,"D"],["DANIEL JEROME MCCARTHY",14871,"R"]]},"49":{"march_d":[["GINA HINOJOSA",17720,"D"]],"general":[["GINA HINOJOSA",80498,"D"]]},"50":{"march_d":[["JAMES TALARICO",8015,"D"],["NATHAN BOYNTON",1478,"D"]],"general":[["JAMES TALARICO",48289,"D"]]},"51":{"march_d":[["MARIA LUISA \"LULU\" FLORES",8753,"D"]],"general":[["MARIA LUISA \"LULU\" FLORES",52801,"D"]]},"52":{"march_r":[["CAROLINE HARRIS DAVILA",13693,"R"]],"march_d":[["JENNIE BIRKHOLZ",3654,"D"],["ANGEL CARROLL",3539,"D"]],"general":[["CAROLINE HARRIS DAVILA",62830,"R"],["JENNIE BIRKHOLZ",48884,"D"]]},"53":{"march_r":[["WES VIRDELL",24038,"R"],["HATCH SMITH",15729,"R"]],"march_d":[["JOE P. HERRERA",3714,"D"]],"general":[["WES VIRDELL",76176,"R"],["JOE P. HERRERA",21058,"D"],["B. W. HOLK",2230,"L"]]},"54":{"march_r":[["BRAD BUCKLEY",10411,"R"]],"march_d":[["DAWN RICHARDSON",3127,"D"]],"general":[["BRAD BUCKLEY",34526,"R"],["DAWN RICHARDSON",21993,"D"]]},"55":{"march_r":[["HILLARY HICKLAND",9115,"R"],["HUGH D. SHINE",6781,"R"],["DAVIS FORD",775,"R"],["JORGE J ESTRADA",493,"R"]],"march_d":[["JENNIFER ALICIA LEE",4029,"D"]],"general":[["HILLARY HICKLAND",39455,"R"],["JENNIFER ALICIA LEE",29269,"D"]]},"56":{"march_r":[["PAT CURRY",15153,"R"],["DEVVIE DUKE",10917,"R"]],"march_d":[["ERIN SHANK",3771,"D"]],"general":[["PAT CURRY",56195,"R"],["ERIN SHANK",25733,"D"]]},"57":{"march_r":[["RICHARD HAYES",13553,"R"]],"march_d":[["COLLIN JOHNSON",4421,"D"]],"general":[["RICHARD HAYES",51865,"R"],["COLLIN JOHNSON",34279,"D"],["DARREN HAMILTON",2870,"L"]]},"58":{"march_r":[["HELEN KERWIN",11535,"R"],["DEWAYNE BURNS",9724,"R"],["LYNDON LAIRD",2330,"R"]],"may_r":[["HELEN KERWIN",7685,"R"],["DEWAYNE BURNS",5670,"R"]],"general":[["HELEN KERWIN",63760,"R"],["RICHARD WINDMANN",13935,"D"]]},"59":{"march_r":[["SHELBY SLAWSON",22929,"R"]],"march_d":[["HANNAH BOHM",2210,"D"]],"general":[["SHELBY SLAWSON",64147,"R"],["HANNAH BOHM",15367,"D"]]},"60":{"march_r":[["MIKE OLCOTT",25282,"R"],["GLENN ROGERS",14587,"R"]],"general":[["MIKE OLCOTT",93326,"R"]]},"61":{"march_r":[["KERESA RICHARDSON",7241,"R"],["FREDERICK FRAZIER",5847,"R"],["CHUCK BRANCH",5130,"R"]],"march_d":[["TONY ADAMS",4890,"D"]],"may_r":[["KERESA RICHARDSON",6842,"R"],["FREDERICK FRAZIER",3272,"R"]],"general":[["KERESA RICHARDSON",58513,"R"],["TONY ADAMS",39632,"D"]]},"62":{"march_r":[["SHELLEY LUTHER",16971,"R"],["REGGIE SMITH",14803,"R"]],"march_d":[["TIFFANY DRAKE",2502,"D"]],"general":[["SHELLEY LUTHER",67062,"R"],["TIFFANY DRAKE",19240,"D"]]},"63":{"march_r":[["BEN BUMGARNER",9762,"R"],["VINCENT GALLO",5816,"R"],["CARLOS E.  ANDINO JR",894,"R"]],"march_d":[["MICHELLE BECKLEY",3985,"D"],["DENISE WOOTEN",2019,"D"]],"general":[["BEN BUMGARNER",46861,"R"],["MICHELLE BECKLEY",37326,"D"]]},"64":{"march_r":[["ANDY HOPPER",11746,"R"],["LYNN STUCKY",10895,"R"],["ELAINE HAYS",2528,"R"]],"march_d":[["ANGELA BREWER",4630,"D"]],"may_r":[["ANDY HOPPER",8951,"R"],["LYNN STUCKY",6458,"R"]],"general":[["ANDY HOPPER",59542,"R"],["ANGELA BREWER",34786,"D"]]},"65":{"march_r":[["MITCH LITTLE",10971,"R"],["KRONDA THIMESCH",10675,"R"]],"march_d":[["DETRICK DEBURR",5104,"D"]],"general":[["MITCH LITTLE",60284,"R"],["DETRICK DEBURR",39686,"D"]]},"66":{"march_r":[["MATT SHAHEEN",11037,"R"],["WAYNE RICHARD",6276,"R"]],"march_d":[["DAVID W. CARSTENS",4454,"D"]],"general":[["MATT SHAHEEN",58294,"R"],["DAVID W. CARSTENS",37098,"D"]]},"67":{"march_r":[["JEFF LEACH",11260,"R"],["DAREN MEIS",6031,"R"]],"march_d":[["MAKALA L. WASHINGTON",3668,"D"],["JEFFERSON NUNN",1900,"D"]],"general":[["JEFF LEACH",56107,"R"],["MAKALA L. WASHINGTON",37051,"D"]]},"68":{"march_r":[["DAVID SPILLER",23091,"R"],["KERRI KINGSBERY",11384,"R"]],"march_d":[["STACEY SWANN",1646,"D"]],"general":[["DAVID SPILLER",79554,"R"],["STACEY SWANN",11705,"D"]]},"69":{"march_r":[["JAMES B FRANK",16333,"R"]],"march_d":[["WALTER COPPAGE",1959,"D"]],"general":[["JAMES B FRANK",53583,"R"],["WALTER COPPAGE",14518,"D"]]},"70":{"march_r":[["STEVE KINARD",6673,"R"],["JOE COLLINS",3125,"R"]],"march_d":[["MIHAELA ELIZABETH PLESA",5790,"D"]],"general":[["MIHAELA ELIZABETH PLESA",38183,"D"],["STEVE KINARD",34933,"R"]]},"71":{"march_r":[["STAN LAMBERT",14011,"R"],["LIZ CASE",12725,"R"]],"march_d":[["LINDA GOOLSBEE",1850,"D"]],"general":[["STAN LAMBERT",58413,"R"],["LINDA GOOLSBEE",13678,"D"]]},"72":{"march_r":[["DREW DARBY",14112,"R"],["STORMY BRADLEY",10665,"R"]],"general":[["DREW DARBY",57821,"R"]]},"73":{"march_r":[["CARRIE ISAAC",28760,"R"]],"march_d":[["SALLY DUVAL",6856,"D"]],"general":[["CARRIE ISAAC",91924,"R"],["SALLY DUVAL",36686,"D"]]},"74":{"march_r":[["ROBERT GARZA",4249,"R"],["JOHN MCLEON",3627,"R"]],"march_d":[["EDDIE MORALES JR",9768,"D"]],"general":[["EDDIE MORALES JR",28203,"D"],["ROBERT GARZA",26378,"R"]]},"75":{"march_d":[["MARY E. GONZALEZ",4206,"D"]],"general":[["MARY E. GONZALEZ",35033,"D"]]},"76":{"march_r":[["SUMMARA KANWAL",2771,"R"],["LEA C.S. SIMMONS",2761,"R"],["DAYO DAVID",2244,"R"]],"march_d":[["SULEMAN LALANI",6494,"D"],["VANESIA JOHNSON",3738,"D"]],"may_r":[["LEA C.S. SIMMONS",641,"R"],["SUMMARA KANWAL",313,"R"]],"general":[["SULEMAN LALANI",39770,"D"],["LEA C.S. SIMMONS",30615,"R"]]},"77":{"march_d":[["VINCENT \"VINCE\" PEREZ",3710,"D"],["NORMA CH\u00c1VEZ",3144,"D"],["ALEXSANDRA ANNELLO",2303,"D"],["HOMER REZA",613,"D"]],"may_d":[["VINCENT \"VINCE\" PEREZ",4874,"D"],["NORMA CH\u00c1VEZ",2755,"D"]],"general":[["VINCENT \"VINCE\" PEREZ",35427,"D"]]},"78":{"march_d":[["JOE MOODY",7872,"D"]],"general":[["JOE MOODY",45474,"D"]]},"79":{"march_d":[["CLAUDIA ORDAZ",8473,"D"]],"general":[["CLAUDIA ORDAZ",41652,"D"]]},"80":{"march_r":[["DON MCLAUGHLIN JR",6371,"R"],["JR RAMIREZ",2837,"R"],["CLINT POWELL",1785,"R"]],"march_d":[["CECILIA CASTELLANO",3425,"D"],["ROSIE CUELLAR",3226,"D"],["CARLOS LOPEZ",2932,"D"],["TERESA JOHNSON HERNANDEZ",2286,"D"],["GRACIELA VILLARREAL",787,"D"]],"may_d":[["CECILIA CASTELLANO",4347,"D"],["ROSIE CUELLAR",3162,"D"]],"general":[["DON MCLAUGHLIN JR",31182,"R"],["CECILIA CASTELLANO",21231,"D"]]},"81":{"march_r":[["BROOKS LANDGRAF",10797,"R"]],"general":[["BROOKS LANDGRAF",41508,"R"]]},"82":{"march_r":[["TOM CRADDICK",15128,"R"]],"march_d":[["STEVEN SCHAFERSMAN",1048,"D"]],"general":[["TOM CRADDICK",50546,"R"],["STEVEN SCHAFERSMAN",10555,"D"]]},"83":{"march_r":[["DUSTIN BURROWS",17279,"R"],["WADE COWAN",8128,"R"]],"general":[["DUSTIN BURROWS",69899,"R"]]},"84":{"march_r":[["CARL H. TEPPER",10020,"R"]],"march_d":[["NOAH LOPEZ",2856,"D"]],"general":[["CARL H. TEPPER",37021,"R"],["NOAH LOPEZ",20733,"D"]]},"85":{"march_r":[["STAN KITZMAN",18248,"R"],["TIM GREESON",9136,"R"]],"general":[["STAN KITZMAN",75040,"R"]]},"86":{"march_r":[["JOHN SMITHEE",18531,"R"],["JAMIE HAYNES",7368,"R"]],"general":[["JOHN SMITHEE",68942,"R"]]},"87":{"march_r":[["CAROLINE FAIRLY",11595,"R"],["CINDI BULLA",4533,"R"],["RICHARD BEYEA",1915,"R"],["JESSE QUACKENBUSH",1318,"R"]],"march_d":[["TIMOTHY W. GASSAWAY",1426,"D"]],"general":[["CAROLINE FAIRLY",42317,"R"],["TIMOTHY W. GASSAWAY",11048,"D"],["JEFFREY MCGUNEGLE",55,"L"]]},"88":{"march_r":[["KEN KING",17949,"R"],["KAREN POST",5181,"R"]],"general":[["KEN KING",54093,"R"]]},"89":{"march_r":[["CANDY NOBLE",9579,"R"],["ABRAHAM GEORGE",8632,"R"]],"march_d":[["DARREL EVANS",4495,"D"]],"general":[["CANDY NOBLE",55900,"R"],["DARREL EVANS",36292,"D"]]},"90":{"march_d":[["RAMON ROMERO JR",4909,"D"]],"general":[["RAMON ROMERO JR",35674,"D"]]},"91":{"march_r":[["STEPHANIE KLICK",7492,"R"],["DAVID LOWE",7175,"R"],["TERESA RAMIREZ",905,"R"]],"may_r":[["DAVID LOWE",4535,"R"],["STEPHANIE KLICK",3481,"R"]],"general":[["DAVID LOWE",53970,"R"]]},"92":{"march_d":[["SALMAN BHOJANI",4175,"D"]],"general":[["SALMAN BHOJANI",35274,"D"]]},"93":{"march_r":[["NATE SCHATZLINE",11529,"R"]],"march_d":[["PERLA BOJORQUEZ",4062,"D"]],"general":[["NATE SCHATZLINE",53532,"R"],["PERLA BOJORQUEZ",34871,"D"]]},"94":{"march_r":[["TONY TINDERHOLT",13098,"R"]],"march_d":[["DENISE WILKERSON",5879,"D"]],"general":[["TONY TINDERHOLT",43785,"R"],["DENISE WILKERSON",34937,"D"]]},"95":{"march_d":[["NICOLE COLLIER",8852,"D"]],"general":[["NICOLE COLLIER",43827,"D"]]},"96":{"march_r":[["DAVID COOK",12451,"R"]],"march_d":[["EBONY M. TURNER",6447,"D"]],"general":[["DAVID COOK",48814,"R"],["EBONY M. TURNER",36276,"D"]]},"97":{"march_r":[["CHERYL BEAN",9057,"R"],["JOHN MCQUEENEY",5416,"R"],["LESLIE ROBNETT",3798,"R"]],"march_d":[["DIANE SYMONS",3083,"D"],["CARLOS WALKER",2420,"D"],["WILLIAM W. THORBURN",1485,"D"]],"may_r":[["JOHN MCQUEENEY",5477,"R"],["CHERYL BEAN",5175,"R"]],"may_d":[["CARLOS WALKER",1228,"D"],["DIANE SYMONS",977,"D"]],"general":[["JOHN MCQUEENEY",51432,"R"],["CARLOS WALKER",37132,"D"]]},"98":{"march_r":[["GIOVANNI CAPRIGLIONE",15860,"R"],["BRAD SCHOFIELD",6936,"R"]],"march_d":[["SCOTT BRYAN WHITE",4972,"D"]],"general":[["GIOVANNI CAPRIGLIONE",64833,"R"],["SCOTT BRYAN WHITE",33845,"D"]]},"99":{"march_r":[["CHARLIE GEREN",9081,"R"],["JACK REYNOLDS",6001,"R"]],"march_d":[["MIMI COFFEY",4256,"D"]],"general":[["CHARLIE GEREN",47708,"R"],["MIMI COFFEY",28233,"D"]]},"100":{"march_d":[["VENTON JONES",3832,"D"],["BARBARA MALLORY CARAWAY",1952,"D"],["SANDRA CRENSHAW",1282,"D"],["JUSTICE MCFARLANE",498,"D"]],"general":[["VENTON JONES",34119,"D"]]},"101":{"march_r":[["CLINT BURGESS",4351,"R"]],"march_d":[["CHRIS TURNER",6463,"D"]],"general":[["CHRIS TURNER",40337,"D"],["CLINT BURGESS",21781,"R"]]},"102":{"march_d":[["ANA-MARIA RAMOS",6631,"D"]],"general":[["ANA-MARIA RAMOS",35788,"D"]]},"103":{"march_d":[["RAFAEL ANCHIA",6676,"D"]],"general":[["RAFAEL ANCHIA",40330,"D"]]},"104":{"march_d":[["JESSICA GONZALEZ",4297,"D"]],"general":[["JESSICA GONZALEZ",33295,"D"]]},"105":{"march_r":[["ROSE CANNADAY",4434,"R"]],"march_d":[["TERRY MEZA",4131,"D"]],"general":[["TERRY MEZA",22850,"D"],["ROSE CANNADAY",18928,"R"]]},"106":{"march_r":[["JARED PATTERSON",14741,"R"]],"march_d":[["HAVA JOHNSTON",5086,"D"]],"general":[["JARED PATTERSON",61381,"R"],["HAVA JOHNSTON",39941,"D"]]},"107":{"march_d":[["LINDA GARCIA",3992,"D"]],"general":[["LINDA GARCIA",29546,"D"]]},"108":{"march_r":[["MORGAN MEYER",12303,"R"],["BARRY WERNICK",11766,"R"]],"march_d":[["ELIZABETH GINSBERG",7775,"D"],["YASMIN SIMON",5423,"D"]],"general":[["MORGAN MEYER",60227,"R"],["ELIZABETH GINSBERG",44307,"D"]]},"109":{"march_d":[["AICHA DAVIS",8211,"D"],["VICTORIA WALTON",5053,"D"]],"general":[["AICHA DAVIS",56138,"D"]]},"110":{"march_d":[["TONI ROSE",5847,"D"]],"general":[["TONI ROSE",30618,"D"]]},"111":{"march_d":[["YVONNE DAVIS",13639,"D"]],"general":[["YVONNE DAVIS",53039,"D"]]},"112":{"march_r":[["ANGIE CHEN BUTTON",10955,"R"],["CHAD CARNAHAN",4254,"R"]],"march_d":[["AVERIE BISHOP",8695,"D"]],"general":[["ANGIE CHEN BUTTON",47456,"R"],["AVERIE BISHOP",40645,"D"]]},"113":{"march_r":[["STEPHEN STANLEY",5662,"R"]],"march_d":[["RHETTA ANDREWS BOWERS",6299,"D"]],"general":[["RHETTA ANDREWS BOWERS",33547,"D"],["STEPHEN STANLEY",25732,"R"]]},"114":{"march_r":[["AIMEE RAMSEY",5249,"R"]],"march_d":[["JOHN BRYANT",9979,"D"]],"general":[["JOHN BRYANT",43554,"D"],["AIMEE RAMSEY",25839,"R"]]},"115":{"march_r":[["JOHN JUN",8119,"R"]],"march_d":[["CASSANDRA HERNANDEZ",4618,"D"],["KATE RUMSEY",2414,"D"],["SCARLETT CORNWALLIS",875,"D"]],"general":[["CASSANDRA HERNANDEZ",37692,"D"],["JOHN JUN",31709,"R"]]},"116":{"march_r":[["DARRYL W CRAIN",3809,"R"]],"march_d":[["TREY MARTINEZ FISCHER",6432,"D"]],"general":[["TREY MARTINEZ FISCHER",38044,"D"],["DARRYL W CRAIN",19596,"R"]]},"117":{"march_r":[["BEN MOSTYN",4943,"R"]],"march_d":[["PHILIP CORTEZ",5579,"D"]],"general":[["PHILIP CORTEZ",40066,"D"],["BEN MOSTYN",29021,"R"]]},"118":{"march_r":[["JOHN LUJAN III",8047,"R"]],"march_d":[["KRISTIAN CARRANZA",4091,"D"],["CARLOS QUEZADA",2388,"D"]],"general":[["JOHN LUJAN III",39246,"R"],["KRISTIAN CARRANZA",36624,"D"]]},"119":{"march_r":[["BRANDON J. GRABLE",2668,"R"],["DAN SAWATZKI",2087,"R"]],"march_d":[["ELIZABETH  \"LIZ\" CAMPOS",6104,"D"],["CHARLES A. FUENTES",1204,"D"]],"general":[["ELIZABETH  \"LIZ\" CAMPOS",38160,"D"],["BRANDON J. GRABLE",21763,"R"]]},"120":{"march_d":[["BARBARA GERVIN-HAWKINS",6174,"D"]],"general":[["BARBARA GERVIN-HAWKINS",38208,"D"]]},"121":{"march_r":[["MARC LAHOOD",11813,"R"],["STEVE ALLISON",8723,"R"],["MICHAEL CHAMPION",1573,"R"]],"march_d":[["LAUREL JORDAN SWIFT",6066,"D"],["SHEKHAR SINHA",2257,"D"]],"general":[["MARC LAHOOD",51013,"R"],["LAUREL JORDAN SWIFT",46104,"D"]]},"122":{"march_r":[["MARK DORAZIO",16729,"R"]],"march_d":[["KEVIN GEARY",6540,"D"]],"general":[["MARK DORAZIO",64018,"R"],["KEVIN GEARY",46180,"D"]]},"123":{"march_d":[["DIEGO BERNAL",8140,"D"]],"general":[["DIEGO BERNAL",44043,"D"]]},"124":{"march_r":[["SYLVIA SOTO",3127,"R"]],"march_d":[["JOSEY GARCIA",4902,"D"]],"general":[["JOSEY GARCIA",30345,"D"],["SYLVIA SOTO",18981,"R"]]},"125":{"march_d":[["RAY LOPEZ",5849,"D"],["ERIC MICHAEL GARZA",2805,"D"]],"general":[["RAY LOPEZ",48251,"D"]]},"126":{"march_r":[["E. SAM HARLESS",12153,"R"]],"general":[["E. SAM HARLESS",59749,"R"],["SARAH SMITH",616,"L"]]},"127":{"march_r":[["CHARLES CUNNINGHAM",13598,"R"]],"march_d":[["JOHN LEHR",6158,"D"]],"general":[["CHARLES CUNNINGHAM",55048,"R"],["JOHN LEHR",35932,"D"]]},"128":{"march_r":[["BRISCOE CAIN",9004,"R"],["BIANCA GRACIA",3947,"R"]],"march_d":[["CHUCK CREWS",3102,"D"]],"general":[["BRISCOE CAIN",45372,"R"],["CHUCK CREWS",19181,"D"],["KEVIN J. HAGAN",1932,"L"]]},"129":{"march_r":[["DENNIS PAUL",12449,"R"]],"march_d":[["DOUG PETERSON",6175,"D"]],"general":[["DENNIS PAUL",52419,"R"],["DOUG PETERSON",33758,"D"]]},"130":{"march_r":[["TOM OLIVERSON",13882,"R"]],"march_d":[["BRETT ROBINSON",2430,"D"],["HENRY ARTURO",1643,"D"]],"general":[["TOM OLIVERSON",63270,"R"],["BRETT ROBINSON",28671,"D"]]},"131":{"march_d":[["ALMA A. ALLEN",5147,"D"],["JAMES GUILLORY",2101,"D"],["ERIK WILSON",1508,"D"]],"general":[["ALMA A. ALLEN",36948,"D"]]},"132":{"march_r":[["MIKE SCHOFIELD",11257,"R"]],"march_d":[["CHASE WEST",4997,"D"]],"general":[["MIKE SCHOFIELD",53928,"R"],["CHASE WEST",37846,"D"]]},"133":{"march_r":[["MANO DEAYALA",10736,"R"],["JOHN PEREZ",7607,"R"]],"general":[["MANO DEAYALA",54283,"R"]]},"134":{"march_r":[["AUDREY DOUGLAS",8876,"R"]],"march_d":[["ANN JOHNSON",14870,"D"]],"general":[["ANN JOHNSON",61037,"D"],["AUDREY DOUGLAS",38480,"R"]]},"135":{"march_d":[["JON E. ROSENTHAL",4579,"D"]],"general":[["JON E. ROSENTHAL",43114,"D"]]},"136":{"march_r":[["AMIN SALAHUDDIN",5691,"R"]],"march_d":[["JOHN H. BUCY III",6356,"D"]],"general":[["JOHN H. BUCY III",45185,"D"],["AMIN SALAHUDDIN",27665,"R"]]},"137":{"march_d":[["GENE WU",3308,"D"]],"general":[["GENE WU",19286,"D"],["LEE SHARP",5988,"R"]]},"138":{"march_r":[["LACEY HULL",8835,"R"],["JARED WOODFILL",5613,"R"]],"march_d":[["STEPHANIE MORALES",5434,"D"]],"general":[["LACEY HULL",42022,"R"],["STEPHANIE MORALES",31671,"D"]]},"139":{"march_d":[["ANGIE THIBODEAUX",3672,"D"],["CHARLENE WARD JOHNSON",2654,"D"],["MO JENKINS",1948,"D"],["ROSALIND CAESAR",1869,"D"],["JERRY FORD",887,"D"]],"may_d":[["CHARLENE WARD JOHNSON",2533,"D"],["ANGIE THIBODEAUX",2348,"D"]],"general":[["CHARLENE WARD JOHNSON",46196,"D"]]},"140":{"march_d":[["ARMANDO LUCIO WALLE",2445,"D"]],"general":[["ARMANDO LUCIO WALLE",22272,"D"]]},"141":{"march_d":[["SENFRONIA THOMPSON",6429,"D"]],"general":[["SENFRONIA THOMPSON",32492,"D"]]},"142":{"march_d":[["HAROLD V. DUTTON JR",5088,"D"],["DANYAHEL (DANNY) NORRIS",1592,"D"],["JOYCE MARIE CHATMAN",1282,"D"],["CLINT DAN HORN",444,"D"]],"general":[["HAROLD V. DUTTON JR",41430,"D"]]},"143":{"march_d":[["ANA HERNANDEZ",4262,"D"]],"general":[["ANA HERNANDEZ",27796,"D"]]},"144":{"march_d":[["MARY ANN PEREZ",2834,"D"]],"general":[["MARY ANN PEREZ",26617,"D"]]},"145":{"march_d":[["CHRISTINA MORALES",8664,"D"]],"general":[["CHRISTINA MORALES",46104,"D"]]},"146":{"march_r":[["LANCE YORK",2428,"R"]],"march_d":[["LAUREN ASHLEY SIMMONS",6303,"D"],["SHAWN NICOLE THIERRY",5683,"D"],["ASHTON P. WOODS",775,"D"]],"may_d":[["LAUREN ASHLEY SIMMONS",4287,"D"],["SHAWN NICOLE THIERRY",2353,"D"]],"general":[["LAUREN ASHLEY SIMMONS",42840,"D"],["LANCE YORK",12282,"R"]]},"147":{"march_r":[["CLAUDIO GUTIERREZ",2138,"R"]],"march_d":[["JOLANDA  JONES",10954,"D"]],"general":[["JOLANDA  JONES",47828,"D"],["CLAUDIO GUTIERREZ",16332,"R"]]},"148":{"march_r":[["KAY SMITH",4333,"R"]],"march_d":[["PENNY MORALES SHAW",4601,"D"]],"general":[["PENNY MORALES SHAW",28341,"D"],["KAY SMITH",23246,"R"]]},"149":{"march_r":[["LILY TRUONG",3396,"R"]],"march_d":[["HUBERT VO",4439,"D"]],"general":[["HUBERT VO",26921,"D"],["LILY TRUONG",20291,"R"]]},"150":{"march_r":[["VALOREE SWANSON",11438,"R"]],"march_d":[["MARISELA \"MJ\" JIMENEZ",4509,"D"]],"general":[["VALOREE SWANSON",48000,"R"],["MARISELA \"MJ\" JIMENEZ",32181,"D"]]}};  
const primary26={"1":{"R":{"reporting":100.0,"candidates":[["CHRIS SPENCER",14913,51],["JOSH BRAY",14400,49]]},"D":{"reporting":100,"candidates":[["SEAN HUFFMAN",5916,100]]}},"2":{"R":{"reporting":100.0,"candidates":[["BRENT A. MONEY",21974,100]]},"D":{"reporting":100,"candidates":[["FATIMA LA'JUAN MUSE",5491,100]]}},"3":{"R":{"reporting":100.0,"candidates":[["KRISTEN PLAISANCE",13976,55],["CECIL BELL, JR",11405,45]]},"D":{"reporting":100,"candidates":[["NICOLE KING",5656,69],["JAMES ALVARADO",2589,31]]}},"4":{"R":{"reporting":100.0,"candidates":[["KEITH BELL",17664,100]]},"D":{"reporting":100,"candidates":[["MARK A. MOSELEY",11100,100]]}},"5":{"R":{"reporting":100.0,"candidates":[["COLE HEFNER",22408,76],["DEWEY COLLIER",6898,24]]},"D":{"reporting":100,"candidates":[["HECTOR GARZA",5777,100]]}},"6":{"R":{"reporting":100.0,"candidates":[["DANIEL ALDERS",17697,100]]},"D":{"reporting":100,"candidates":[["LORENZO JOHNSON",9332,100]]}},"7":{"R":{"reporting":100.0,"candidates":[["JAY DEAN",11851,55],["MELISSA BECKETT",9750,45]]},"D":{"reporting":100,"candidates":[["FANTASHA ALLEN",6376,71],["CORBY HEATH",2557,29]]}},"8":{"R":{"reporting":100.0,"candidates":[["CODY HARRIS",19172,75],["DANIEL HUNT",6504,25]]},"D":{"reporting":100,"candidates":[["JEFF CHAVEZ",5475,100]]}},"9":{"R":{"reporting":100.0,"candidates":[["ROCKY THIGPEN",22258,77],["PAULETTE CARSON",5656,20],["BERG",1008,3]]},"D":{"reporting":100,"candidates":[["SHELLEY TATUM",5840,100]]}},"10":{"R":{"reporting":100.0,"candidates":[["BRIAN HARRISON",12436,53],["MATT AUTHIER",5685,24],["JON GARRETT",5172,22]]},"D":{"reporting":100,"candidates":[["MICHAEL MYERS",12350,100]]}},"11":{"R":{"reporting":100.0,"candidates":[["JOANNE SHOFNER",20207,100]]},"D":{"reporting":100,"candidates":[["ROXANNE LATHAN",6138,100]]}},"12":{"R":{"reporting":100.0,"candidates":[["TREY WHARTON",23376,100]]},"D":{"reporting":100,"candidates":[["ANDIE HO",7155,100]]}},"13":{"R":{"reporting":100.0,"candidates":[["ANGELIA ORR",13217,56],["KATHALEEN 'KAT' WALL",10489,44]]},"D":{"reporting":100,"candidates":[["ALBERT HUNTER",6847,100]]}},"14":{"R":{"reporting":100.0,"candidates":[["PAUL DYSON",11279,100]]},"D":{"reporting":100,"candidates":[["JANET TYCELIA DUDDING",7034,67],["DAVID KESSLER",3407,33]]}},"15":{"R":{"reporting":100.0,"candidates":[["BRAD BAILEY",16922,100]]},"D":{"reporting":100,"candidates":[["MONIQUA'S SCOTT",10613,100]]}},"16":{"R":{"reporting":100.0,"candidates":[["WILL METCALF",17943,66],["JON BOUCHE",9329,34]]},"D":{"reporting":100,"candidates":[["ROBBIE CLAYTON",6585,100]]}},"17":{"R":{"reporting":100.0,"candidates":[["STAN GERDES",13180,61],["TOM GLASS",8535,39]]},"D":{"reporting":100,"candidates":[["MARY ELIZABETH KLENZ",7716,60],["FRANK GOMEZ III",3390,26],["ROBERT SALTER",1715,13]]}},"18":{"R":{"reporting":100.0,"candidates":[["JANIS HOLT",21408,100]]},"D":{"reporting":100,"candidates":[["VALORIE BARTON",5288,100]]}},"19":{"R":{"reporting":100.0,"candidates":[["ELLEN TROXCLAIR",28946,79],["GEORGE CAMBANIS",7846,21]]},"D":{"reporting":100,"candidates":[["KELLY HALL",7887,60],["JAVI ANDRADE",5225,40]]}},"20":{"R":{"reporting":100.0,"candidates":[["TERRY M. WILSON",19693,100]]},"D":{"reporting":100,"candidates":[["MATTHIAS-JONAH EARLY",17933,100]]}},"21":{"R":{"reporting":100.0,"candidates":[["RAY CALLAS",18543,100]]},"D":{"reporting":100,"candidates":[["JACQUELINE \"JACKY\" HERNANDEZ",5853,100]]}},"22":{"D":{"reporting":100,"candidates":[["CHRISTIAN MANUEL",12916,100]]}},"23":{"R":{"reporting":100.0,"candidates":[["TERRI LEO WILSON",11540,63],["NATHAN WATKINS",6864,37]]},"D":{"reporting":100,"candidates":[["CHERYL LYNN CLARK",7575,68],["SEAN FOLEY",3548,32]]}},"24":{"R":{"reporting":100.0,"candidates":[["GREG BONNEN",18409,100]]},"D":{"reporting":100,"candidates":[["FRANK N. CARR",11318,100]]}},"25":{"R":{"reporting":100.0,"candidates":[["CODY THANE VASUT",14181,100]]},"D":{"reporting":100,"candidates":[["MIKE MEADORS",7269,56],["J DAGGETT",5710,44]]}},"26":{"R":{"reporting":100.0,"candidates":[["MATT MORGAN",12701,100]]},"D":{"reporting":100,"candidates":[["ELIZABETH \"ELIZ\" MARKOWITZ",6748,57],["DANIEL LEE",5106,42]]}},"27":{"R":{"reporting":100.0,"candidates":[["MAX ALALIBO",5268,100]]},"D":{"reporting":100,"candidates":[["RON REYNOLDS",24141,87],["PAUL PREVOT",3453,12]]}},"28":{"R":{"reporting":100.0,"candidates":[["GARY GATES",14773,100]]},"D":{"reporting":100,"candidates":[["SANDY IBANEZ",7466,53],["KRISTYNA PAYTON LOUNDY",6500,47]]}},"29":{"R":{"reporting":100.0,"candidates":[["JEFF BARRY",12991,100]]},"D":{"reporting":100,"candidates":[["KAREN REEDER",12769,100]]}},"30":{"R":{"reporting":100.0,"candidates":[["AJ LOUDERBACK",19592,100]]},"D":{"reporting":100,"candidates":[["CRYSTAL SEDILLO",4411,70],["DAVID STEVES",1910,30]]}},"31":{"R":{"reporting":100.0,"candidates":[["RYAN GUILLEN",10427,100]]},"D":{"reporting":100,"candidates":[["JENNIFER \"JJ\" DOMINGUEZ",11597,100]]}},"32":{"R":{"reporting":100.0,"candidates":[["TODD HUNTER",16680,100]]},"D":{"reporting":100,"candidates":[["GABRIEL \"GABE\" LOZANO MARROQUIN",11394,100]]}},"33":{"R":{"reporting":100.0,"candidates":[["KATRINA PIERSON",19480,100]]},"D":{"reporting":100,"candidates":[["ORLANDO LOPEZ",13047,100]]}},"34":{"R":{"reporting":100.0,"candidates":[["DENISE VILLALOBOS",6536,100]]},"D":{"reporting":100,"candidates":[["STEPHANIE GUERRERO SAENZ",10253,100]]}},"35":{"R":{"reporting":100.0,"candidates":[["OSCAR ROSA",2450,100]]},"D":{"reporting":100,"candidates":[["OSCAR LONGORIA",9630,100]]}},"36":{"D":{"reporting":100,"candidates":[["SERGIO MUNOZ JR",10939,100]]}},"37":{"R":{"reporting":100.0,"candidates":[["JANIE LOPEZ",6053,69],["KRISTIN LUCKEY",2721,31]]},"D":{"reporting":100,"candidates":[["OZIEL \"OZZIE\" OCHOA JR",6515,46],["ESMERALDA \"ESMI\" CANTU-CASTLE",4525,32],["STEPHANY BAUER",3053,22]]}},"38":{"R":{"reporting":100.0,"candidates":[["LAURA E. CISNEROS",2813,100]]},"D":{"reporting":100,"candidates":[["ERIN ELIZABETH GAMEZ",12155,100]]}},"39":{"D":{"reporting":100,"candidates":[["ARMANDO MANDO MARTINEZ",10332,100]]}},"40":{"R":{"reporting":100.0,"candidates":[["CELESTE CABRERA-HUFF",1211,38],["NEHEMIAS 'MEMO' GOMEZ",1183,37],["VANGELA CHURCHILL",780,25]]},"D":{"reporting":100,"candidates":[["TERRY CANALES",11959,100]]}},"41":{"R":{"reporting":100.0,"candidates":[["SERGIO SANCHEZ",2840,46],["GARY GROVES",2385,38],["SARAH SAGREDO - HAMMOND",982,16]]},"D":{"reporting":100,"candidates":[["JULIO SALINAS",6004,39],["VICTOR SEBY HADDAD",5805,37],["ERIC HOLGUIN",3753,24]]}},"42":{"R":{"reporting":100.0,"candidates":[["TERESA JOHNSON-HERNANDEZ",3064,100]]},"D":{"reporting":100,"candidates":[["RICHARD PENA RAYMOND",16226,100]]}},"43":{"R":{"reporting":100.0,"candidates":[["J.M. LOZANO",14989,100]]},"D":{"reporting":100,"candidates":[["JEFFREY T. JACKSON",8960,100]]}},"44":{"R":{"reporting":100.0,"candidates":[["ALAN SCHOOLCRAFT",15445,80],["GABRIEL ORTIZ",3794,20]]},"D":{"reporting":100,"candidates":[["ERIC NORMAN",7820,62],["STEVE SCHWAB",4703,38]]}},"45":{"R":{"reporting":100.0,"candidates":[["TENNYSON G. MORENO",9849,100]]},"D":{"reporting":100,"candidates":[["ERIN ZWIENER",25613,100]]}},"46":{"D":{"reporting":100,"candidates":[["SHERYL COLE",28569,100]]}},"47":{"R":{"reporting":100.0,"candidates":[["JENNIFER MUSHTALER",9786,100]]},"D":{"reporting":100,"candidates":[["POOJA SETHI",21123,76],["JOSEPH KOPSER",6640,24]]}},"48":{"R":{"reporting":100.0,"candidates":[["ANTHONY GUPTA",6922,100]]},"D":{"reporting":100,"candidates":[["DONNA HOWARD",32156,100]]}},"49":{"D":{"reporting":100,"candidates":[["MONTSERRAT GARIBAY",13332,33],["KATHIE TOVO",11419,28],["JOSH REYNA",3584,9],["ROBIN JENNIFER LERNER",3076,8],["GIGS HODGES",2853,7],["SHENGHAO \"DANIEL\" WANG",2756,7],["KIMMIE ELLISON",2415,6],["SAM SLADE",1053,3]]}},"50":{"R":{"reporting":100.0,"candidates":[["HOWARD OLSEN",2795,100]]},"D":{"reporting":100,"candidates":[["SAMANTHA LOPEZ-RESENDEZ",11326,52],["JEREMY HENDRICKS",4496,20],["KATE LINCOLN-GOLDFINCH",3886,18],["JOHN HASH",899,4],["NATHAN BOYNTON",886,4],["WILLIAM RANNEFELD",455,2]]}},"51":{"R":{"reporting":100.0,"candidates":[["JESSICA MARTINEZ",1990,100]]},"D":{"reporting":100,"candidates":[["MARIA LUISA \"LULU\" FLORES",22048,100]]}},"52":{"R":{"reporting":100.0,"candidates":[["CAROLINE HARRIS DAVILA",15444,87],["BLAYRE PENA",2343,13]]},"D":{"reporting":100,"candidates":[["CHRIS JIMENEZ",19527,100]]}},"53":{"R":{"reporting":100.0,"candidates":[["WES VIRDELL",31247,100]]},"D":{"reporting":100,"candidates":[["KATHRYN HARTMANN",7496,100]]}},"54":{"R":{"reporting":100.0,"candidates":[["BRAD BUCKLEY",10215,100]]},"D":{"reporting":100,"candidates":[["DAWN RICHARDSON",8935,100]]}},"55":{"R":{"reporting":100.0,"candidates":[["HILLARY HICKLAND",11688,100]]},"D":{"reporting":100,"candidates":[["AMELIA RABROKER",11484,100]]}},"56":{"R":{"reporting":100.0,"candidates":[["PAT CURRY",13967,69],["RALPH PATTERSON",6267,31]]},"D":{"reporting":100,"candidates":[["ASHLEY BEAN THORNTON",5945,56],["JANESSA GIVENS",4690,44]]}},"57":{"R":{"reporting":100.0,"candidates":[["RICHARD HAYES",13107,100]]},"D":{"reporting":100,"candidates":[["RAY STITH",13577,100]]}},"58":{"R":{"reporting":100.0,"candidates":[["HELEN KERWIN",13794,66],["MARY LOUISE WELLS",7084,34]]},"D":{"reporting":100,"candidates":[["CHRIS OLDHAM",6725,100]]}},"59":{"R":{"reporting":100.0,"candidates":[["SHELBY SLAWSON",22632,100]]},"D":{"reporting":100,"candidates":[["ANDREW TURNER",3560,63],["ETHAN NEWCOMER",2122,37]]}},"60":{"R":{"reporting":100.0,"candidates":[["MIKE OLCOTT",27031,84],["AMY FENNELL",5195,16]]},"D":{"reporting":100,"candidates":[["KRISSY GUESS",5727,100]]}},"61":{"R":{"reporting":100.0,"candidates":[["KERESA RICHARDSON",12466,67],["FREDERICK FRAZIER",6144,33]]},"D":{"reporting":100,"candidates":[["BRITTANY BLACK",8764,56],["JACKIE BESCHERER",6863,44]]}},"62":{"R":{"reporting":100.0,"candidates":[["SHELLEY LUTHER",20275,100]]},"D":{"reporting":100,"candidates":[["CATHERINE THORNE",5615,100]]}},"63":{"R":{"reporting":100.0,"candidates":[["BEN BUMGARNER",11805,100]]},"D":{"reporting":100,"candidates":[["DENISE WOOTEN",13220,100]]}},"64":{"R":{"reporting":100.0,"candidates":[["ANDY HOPPER",15786,70],["LISA MCENTIRE",6673,30]]},"D":{"reporting":100,"candidates":[["JULIE EVANS",7777,54],["CHRISTIE WOOD",6540,46]]}},"65":{"R":{"reporting":100.0,"candidates":[["MITCH LITTLE",15136,100]]},"D":{"reporting":100,"candidates":[["DETRICK DEBURR",14638,100]]}},"66":{"R":{"reporting":100.0,"candidates":[["MATT SHAHEEN",15056,100]]},"D":{"reporting":100,"candidates":[["SANDEEP SRIVASTAVA",12526,100]]}},"67":{"R":{"reporting":100.0,"candidates":[["JEFF LEACH",11955,64],["MATT THORSEN",6646,36]]},"D":{"reporting":100,"candidates":[["JORDAN WHEATLEY",8793,57],["EMEKA ELUKA",6522,43]]}},"68":{"R":{"reporting":100.0,"candidates":[["DAVID SPILLER",28192,100]]},"D":{"reporting":100,"candidates":[["JASMINE HENDERSON",4057,100]]}},"69":{"R":{"reporting":100.0,"candidates":[["JAMES B. FRANK",16487,100]]},"D":{"reporting":100,"candidates":[["LEILANI BARNETT",4527,100]]}},"70":{"R":{"reporting":100.0,"candidates":[["GEORGE FLINT",6403,57],["MICHAEL HEWITT",2519,22],["JACK RYAN GALLAGHER",2346,21]]},"D":{"reporting":100,"candidates":[["MIHAELA ELIZABETH PLESA",13520,100]]}},"71":{"R":{"reporting":100.0,"candidates":[["JAY HARDAWAY",12654,57],["CHANCE FERGUSON",4852,22],["LIZ CASE",4177,19],["JOSHUA OHLEMACHER",713,3]]},"D":{"reporting":100,"candidates":[["DIANA LUNA",5247,100]]}},"72":{"R":{"reporting":100.0,"candidates":[["DREW DARBY",16729,100]]},"D":{"reporting":100,"candidates":[["SHILOH SALAZAR",4846,100]]}},"73":{"R":{"reporting":100.0,"candidates":[["CARRIE ISAAC",30243,100]]},"D":{"reporting":100,"candidates":[["MERRIE FOX",15391,100]]}},"74":{"R":{"reporting":100.0,"candidates":[["ROBERT GARZA",3494,51],["JOHN MCLEON",3347,49]]},"D":{"reporting":100,"candidates":[["EDDIE MORALES JR",14096,100]]}},"75":{"D":{"reporting":100,"candidates":[["MARY E. GONZALEZ",10841,100]]}},"76":{"R":{"reporting":100.0,"candidates":[["LINDA HOWELL",5172,67],["CHRISTIAN AMUTA",1421,18],["LEA C.S. SIMMONS",1164,15]]},"D":{"reporting":100,"candidates":[["SULEMAN LALANI",8484,54],["MARIE ASHER BAPTISTE",7200,46]]}},"77":{"R":{"reporting":100.0,"candidates":[["HUMBERTO PEREZ",2714,100]]},"D":{"reporting":100,"candidates":[["VINCENT \"VINCE\" PEREZ",13175,100]]}},"78":{"D":{"reporting":100,"candidates":[["JOE MOODY",15305,100]]}},"79":{"R":{"reporting":100.0,"candidates":[["JESSE ROMERO",4829,100]]},"D":{"reporting":100,"candidates":[["CLAUDIA ORDAZ",14975,100]]}},"80":{"R":{"reporting":100.0,"candidates":[["DON MCLAUGHLIN",7558,100]]},"D":{"reporting":100,"candidates":[["CECILIA CASTELLANO",10365,77],["JULIE HILBERG",3143,23]]}},"81":{"R":{"reporting":100.0,"candidates":[["BROOKS LANDGRAF",9321,100]]},"D":{"reporting":100,"candidates":[["CEASAR SANCHEZ",3350,100]]}},"82":{"R":{"reporting":100.0,"candidates":[["TOM CRADDICK",13597,100]]},"D":{"reporting":100,"candidates":[["CATHY BROADRICK",3277,100]]}},"83":{"R":{"reporting":100.0,"candidates":[["DUSTIN BURROWS",21603,100]]},"D":{"reporting":100,"candidates":[["MALIK WILLIAMS",6225,100]]}},"84":{"R":{"reporting":100.0,"candidates":[["CARL TEPPER",10150,100]]},"D":{"reporting":100,"candidates":[["MARGARET DURHAM",7663,100]]}},"85":{"R":{"reporting":100.0,"candidates":[["DENNIS 'GOOSE' GEESAMAN",15145,57],["STAN KITZMAN",11223,43]]},"D":{"reporting":100,"candidates":[["LAWRENCE BRANDYBURG",5157,57],["AARON WESTERFIELD",3823,43]]}},"86":{"R":{"reporting":100.0,"candidates":[["HOLLY JEFFREYS",15553,66],["JAMIE HAYNES",8080,34]]},"D":{"reporting":100,"candidates":[["CULLIN KNUTSON",4582,100]]}},"87":{"R":{"reporting":100.0,"candidates":[["CAROLINE FAIRLY",13270,100]]},"D":{"reporting":100,"candidates":[["DIANA LOYA",3881,100]]}},"88":{"R":{"reporting":100.0,"candidates":[["KEN KING",12142,54],["JOHN BROWNING",10398,46]]},"D":{"reporting":100,"candidates":[["HEATHER J. WALLACE",2417,100]]}},"89":{"R":{"reporting":100.0,"candidates":[["CANDY NOBLE",10508,53],["JEFF FORRESTER",8053,40],["FREDDIE AMERICA",1361,7]]},"D":{"reporting":100,"candidates":[["ANGIE CARRAWAY",13871,100]]}},"90":{"D":{"reporting":100,"candidates":[["RAMON ROMERO JR",13370,100]]}},"91":{"R":{"reporting":100.0,"candidates":[["DAVID LOWE",9676,64],["KYLE MORRIS",5461,36]]},"D":{"reporting":100,"candidates":[["YISAK WORKU",11037,100]]}},"92":{"R":{"reporting":100.0,"candidates":[["JP WOODRUFF",3787,67],["JOSEPH A ROBINSON",1864,33]]},"D":{"reporting":100,"candidates":[["SALMAN BHOJANI",11460,100]]}},"93":{"R":{"reporting":100.0,"candidates":[["ALAN BLAYLOCK",12057,87],["STEVE SPROWLS",1735,13]]},"D":{"reporting":100,"candidates":[["ERICKA LOMICK",14122,100]]}},"94":{"R":{"reporting":100.0,"candidates":[["CHERYL BEAN",8755,54],["JACKIE SCHLEGEL",4070,25],["SUSAN VALLIANT",1578,10],["MICHAEL INGRAHAM",1117,7],["MICHAEL DAUGHENBAUGH",762,5]]},"D":{"reporting":100,"candidates":[["KATIE O'BRIEN DUZAN",14568,100]]}},"95":{"D":{"reporting":100,"candidates":[["NICOLE COLLIER",18903,100]]}},"96":{"R":{"reporting":100.0,"candidates":[["ELLEN FLEISCHMANN",13076,100]]},"D":{"reporting":100,"candidates":[["EBONY M. TURNER",17093,100]]}},"97":{"R":{"reporting":100.0,"candidates":[["JOHN W. MCQUEENEY",14908,100]]},"D":{"reporting":100,"candidates":[["DIANE SYMONS",7319,42],["BETH LLEWELLYN MCLAUGHLIN",5342,30],["RYAN RAY",4955,28]]}},"98":{"R":{"reporting":100.0,"candidates":[["ARMIN MIZANI",13886,53],["FRED TATE",11319,43],["ZDENKA 'ZEE' WILCOX",916,4]]},"D":{"reporting":100,"candidates":[["CATE BRENNAN",9920,78],["AARON HENDLEY",2774,22]]}},"99":{"R":{"reporting":100.0,"candidates":[["CHARLIE GEREN",13529,100]]},"D":{"reporting":100,"candidates":[["MICHELLE WINDER",12231,100]]}},"100":{"R":{"reporting":100.0,"candidates":[["JORDAN SCOTT HOFFNAGLE",1164,100]]},"D":{"reporting":100,"candidates":[["VENTON JONES",8062,49],["AMANDA RICHARDSON",5786,35],["JUSTICE MCFARLANE",2693,16]]}},"101":{"D":{"reporting":100,"candidates":[["JUNIOR EZEONU",11505,53],["CHRIS TURNER",10338,47]]}},"102":{"R":{"reporting":100.0,"candidates":[["BONNIE ABADIE",5147,100]]},"D":{"reporting":100,"candidates":[["ANA-MARIA RODRIGUEZ RAMOS",13413,100]]}},"103":{"R":{"reporting":100.0,"candidates":[["MELANIE MEDLEY-THOMAS",3159,100]]},"D":{"reporting":100,"candidates":[["RAFAEL ANCHIA",16982,100]]}},"104":{"D":{"reporting":100,"candidates":[["JESSICA GONZALEZ",13439,100]]}},"105":{"D":{"reporting":100,"candidates":[["TERRY MEZA",9657,100]]}},"106":{"R":{"reporting":100.0,"candidates":[["JARED PATTERSON",10486,54],["LARRY BROCK",6665,34],["RICK ABRAHAM",2413,12]]},"D":{"reporting":100,"candidates":[["JOE MAYES",14558,100]]}},"107":{"D":{"reporting":100,"candidates":[["LINDA GARCIA",11654,100]]}},"108":{"R":{"reporting":100.0,"candidates":[["MORGAN MEYER",14418,67],["SANJAY NARAYAN",7179,33]]},"D":{"reporting":100,"candidates":[["ALLISON MITCHELL",18320,100]]}},"109":{"R":{"reporting":100.0,"candidates":[["WILL CAMPBELL",3450,100]]},"D":{"reporting":100,"candidates":[["AICHA DAVIS",30377,100]]}},"110":{"D":{"reporting":100,"candidates":[["TONI ROSE",14506,100]]}},"111":{"D":{"reporting":100,"candidates":[["YVONNE DAVIS",28519,100]]}},"112":{"R":{"reporting":100.0,"candidates":[["ANGIE CHEN BUTTON",11733,72],["CHAD CARNAHAN",2265,14],["PERRY E. BARKER, SR",1550,9],["TINA PRICE",828,5]]},"D":{"reporting":100,"candidates":[["ZACH HERBERT",18731,100]]}},"113":{"R":{"reporting":100.0,"candidates":[["STEPHEN W. STANLEY",6243,100]]},"D":{"reporting":100,"candidates":[["RHETTA ANDREWS BOWERS",16290,100]]}},"114":{"R":{"reporting":100.0,"candidates":[["TIM MCDONOUGH",4944,100]]},"D":{"reporting":100,"candidates":[["JOHN BRYANT",19945,100]]}},"115":{"R":{"reporting":100.0,"candidates":[["DANNY ROSELLINI",8078,100]]},"D":{"reporting":100,"candidates":[["CASSANDRA HERNANDEZ",15982,100]]}},"116":{"R":{"reporting":100.0,"candidates":[["RHETT ROSENQUEST SMITH",3377,100]]},"D":{"reporting":100,"candidates":[["TREY MARTINEZ FISCHER",13314,100]]}},"117":{"R":{"reporting":100.0,"candidates":[["BEN MOSTYN",5047,100]]},"D":{"reporting":100,"candidates":[["PHILIP CORTEZ",11423,73],["ROBERT MIHARA",4274,27]]}},"118":{"R":{"reporting":100.0,"candidates":[["JORGE BORREGO",4993,53],["DESI MARTINEZ",2565,27],["JOE SHELLHART",1950,21]]},"D":{"reporting":100,"candidates":[["KRISTIAN CARRANZA",13280,100]]}},"119":{"R":{"reporting":100.0,"candidates":[["MELVA PEREZ",4121,100]]},"D":{"reporting":100,"candidates":[["ELIZABETH \"LIZ\" CAMPOS",13049,78],["RYAN AYALA",3760,22]]}},"120":{"D":{"reporting":100,"candidates":[["BARBARA GERVIN-HAWKINS",9300,61],["JORDAN BROWN",4385,29],["BENTLY PAIZ",1530,10]]}},"121":{"R":{"reporting":100.0,"candidates":[["MARC LAHOOD",13048,74],["DAVID MCARTHUR",4680,26]]},"D":{"reporting":100,"candidates":[["ZACK DUNN",15718,100]]}},"122":{"R":{"reporting":100.0,"candidates":[["MARK DORAZIO",14816,75],["WILLIE NG",5037,25]]},"D":{"reporting":100,"candidates":[["SHELLY NICKELS",16135,100]]}},"123":{"D":{"reporting":100,"candidates":[["DIEGO BERNAL",16883,100]]}},"124":{"R":{"reporting":100.0,"candidates":[["SYLVIA SOTO",3069,100]]},"D":{"reporting":100,"candidates":[["JOSEY GARCIA",10911,100]]}},"125":{"R":{"reporting":100.0,"candidates":[["RICARDO 'RICK' MARTINEZ",4132,59],["CHUCK MERCER IV",2915,41]]},"D":{"reporting":100,"candidates":[["ADRIAN REYNA",7227,39],["MICHELLE BARRIENTES VELA",6371,34],["DONOVON RODRIGUEZ",2636,15],["CARLOS ANTONIO RAYMOND",2068,11]]}},"126":{"R":{"reporting":100.0,"candidates":[["STAN STANART",6804,49],["KELLY PETERSON",4059,29],["POLLY LOOPER",2949,21]]},"D":{"reporting":100,"candidates":[["STEFANIE BORD",8106,67],["ELIZABETH LOTTERHOS",3996,33]]}},"127":{"R":{"reporting":100.0,"candidates":[["CHARLES CUNNINGHAM",14495,100]]},"D":{"reporting":100,"candidates":[["MICHELLE WILLIAMS",16065,100]]}},"128":{"R":{"reporting":100.0,"candidates":[["TOM BUTLER",11011,100]]},"D":{"reporting":100,"candidates":[["DESIREE KLAUS",7879,100]]}},"129":{"R":{"reporting":100.0,"candidates":[["SCOTT BOWEN",10932,72],["BOB MITCHELL",4343,28]]},"D":{"reporting":100,"candidates":[["ALBERT WITTLIFF",13415,100]]}},"130":{"R":{"reporting":100.0,"candidates":[["TOM OLIVERSON",15267,100]]},"D":{"reporting":100,"candidates":[["BRETT ROBINSON",7691,69],["JOEL CAMANN",3376,31]]}},"131":{"R":{"reporting":100.0,"candidates":[["SCOTT WHITMARSH",1649,100]]},"D":{"reporting":100,"candidates":[["STACI CHILDS",7224,45],["LAWRENCE ALLEN JR",4370,28],["ERIK WILSON",2171,14],["CRYSTAL DILLARD",1386,9],["TJ BAKER",732,5]]}},"132":{"R":{"reporting":100.0,"candidates":[["MIKE SCHOFIELD",11786,100]]},"D":{"reporting":100,"candidates":[["SARA MCGEE",14756,100]]}},"133":{"R":{"reporting":100.0,"candidates":[["MANO DEAYALA",12328,100]]},"D":{"reporting":100,"candidates":[["JOSH WALLENSTEIN",11327,100]]}},"134":{"R":{"reporting":100.0,"candidates":[["MIKE MICHNA",6081,60],["CAROLYN B. BRYANT",4114,40]]},"D":{"reporting":100,"candidates":[["ANN JOHNSON",23523,100]]}},"135":{"R":{"reporting":100.0,"candidates":[["LIZ RAMOS",4963,100]]},"D":{"reporting":100,"candidates":[["ODUS E. EVBAGHARU",12816,100]]}},"136":{"R":{"reporting":100.0,"candidates":[["THEODORE SCHRAMM",6640,100]]},"D":{"reporting":100,"candidates":[["JOHN H. BUCY III",16924,100]]}},"137":{"R":{"reporting":100.0,"candidates":[["HELEN ZHOU",1920,69],["ROBERT MCKENZIE",871,31]]},"D":{"reporting":100,"candidates":[["GENE WU",6297,100]]}},"138":{"R":{"reporting":100.0,"candidates":[["LACEY HULL",9264,71],["JOSH FLYNN",2426,19],["NATALIE BLASINGAME",1351,10]]},"D":{"reporting":100,"candidates":[["TYLER SMITH",11698,100]]}},"139":{"R":{"reporting":100.0,"candidates":[["KYLE HARDING",3512,100]]},"D":{"reporting":100,"candidates":[["CHARLENE WARD JOHNSON",12253,64],["DOMINIQUE PAYTON",4531,24],["JERRY FORD",2310,12]]}},"140":{"R":{"reporting":100.0,"candidates":[["LAURA GARCIA DELEON",1322,100]]},"D":{"reporting":100,"candidates":[["ARMANDO LUCIO WALLE",7027,100]]}},"141":{"R":{"reporting":100.0,"candidates":[["JULIE HUNT",1204,100]]},"D":{"reporting":100,"candidates":[["SENFRONIA THOMPSON",11863,100]]}},"142":{"R":{"reporting":100.0,"candidates":[["HEIDI HALL",2557,100]]},"D":{"reporting":100,"candidates":[["HAROLD V. DUTTON JR",8718,51],["DANYAHEL (DANNY) NORRIS",5534,32],["JAMES JOSEPH",2925,17]]}},"143":{"R":{"reporting":100.0,"candidates":[["FRANK SALAZAR",2385,100]]},"D":{"reporting":100,"candidates":[["ANA HERNANDEZ",9371,100]]}},"144":{"R":{"reporting":100.0,"candidates":[["DAVID FLORES",3434,100]]},"D":{"reporting":100,"candidates":[["MARY ANN PEREZ",5552,64],["EMMANUEL GUERRERO",2156,25],["MICHAEL MONTEMAYOR",900,10]]}},"145":{"R":{"reporting":100.0,"candidates":[["INOCENSIA MORENO",3339,100]]},"D":{"reporting":100,"candidates":[["CHRISTINA MORALES",17312,100]]}},"146":{"R":{"reporting":100.0,"candidates":[["ALEXANDRIA NICOLE BUTLER",2562,100]]},"D":{"reporting":100,"candidates":[["LAUREN ASHLEY SIMMONS",18804,100]]}},"147":{"R":{"reporting":100.0,"candidates":[["THEODIS DANIEL",2295,100]]},"D":{"reporting":100,"candidates":[["JOLANDA JONES",21639,100]]}},"148":{"R":{"reporting":100.0,"candidates":[["AMANDA LABRIE",4782,100]]},"D":{"reporting":100,"candidates":[["PENNY MORALES SHAW",11153,100]]}},"149":{"R":{"reporting":100.0,"candidates":[["DAVE BENNETT",3668,100]]},"D":{"reporting":100,"candidates":[["DARLENE BREAUX",3743,38],["HUBERT VO",3734,37],["DAVE ROMERO",1395,14],["MINK JAWANDOR",1094,11]]}},"150":{"R":{"reporting":100.0,"candidates":[["VALOREE SWANSON",11175,100]]},"D":{"reporting":100,"candidates":[["AYONNA KELLUM",6921,56],["R.L. BEATTY",5332,44]]}}};  
const incumbents={"1":{"n":"Gary VanDeaver","p":"R"},"2":{"n":"Brent Money","p":"R"},"3":{"n":"Cecil Bell, Jr.","p":"R"},"4":{"n":"Keith Bell","p":"R"},"5":{"n":"Cole Hefner","p":"R"},"6":{"n":"Daniel Alders","p":"R"},"7":{"n":"Jay Dean","p":"R"},"8":{"n":"Cody Harris","p":"R"},"9":{"n":"Trent Ashby","p":"R"},"10":{"n":"Brian Harrison","p":"R"},"11":{"n":"Joanne Shofner","p":"R"},"12":{"n":"Trey Wharton","p":"R"},"13":{"n":"Angelia Orr","p":"R"},"14":{"n":"Paul Dyson","p":"R"},"15":{"n":"Steve Toth","p":"R"},"16":{"n":"Will Metcalf","p":"R"},"17":{"n":"Stan Gerdes","p":"R"},"18":{"n":"Janis Holt","p":"R"},"19":{"n":"Ellen Troxclair","p":"R"},"20":{"n":"Terry Wilson","p":"R"},"21":{"n":"Dade Phelan","p":"R"},"22":{"n":"Christian Manuel","p":"D"},"23":{"n":"Terri Leo Wilson","p":"R"},"24":{"n":"Greg Bonnen","p":"R"},"25":{"n":"Cody Vasut","p":"R"},"26":{"n":"Matt Morgan","p":"R"},"27":{"n":"Ron Reynolds","p":"D"},"28":{"n":"Gary Gates","p":"R"},"29":{"n":"Jeff Barry","p":"R"},"30":{"n":"AJ Louderback","p":"R"},"31":{"n":"Ryan Guillen","p":"R"},"32":{"n":"Todd Hunter","p":"R"},"33":{"n":"Katrina Pierson","p":"R"},"34":{"n":"Denise Villalobos","p":"R"},"35":{"n":"Oscar Longoria","p":"D"},"36":{"n":"Sergio Munoz, Jr.","p":"D"},"37":{"n":"Janie Lopez","p":"R"},"38":{"n":"Erin Gamez","p":"D"},"39":{"n":"Armando Martinez","p":"D"},"40":{"n":"Terry Canales","p":"D"},"41":{"n":"Bobby Guerra","p":"D"},"42":{"n":"Richard Raymond","p":"D"},"43":{"n":"J.M. Lozano","p":"R"},"44":{"n":"Alan Schoolcraft","p":"R"},"45":{"n":"Erin Zwiener","p":"D"},"46":{"n":"Sheryl Cole","p":"D"},"47":{"n":"Vikki Goodwin","p":"D"},"48":{"n":"Donna Howard","p":"D"},"49":{"n":"Gina Hinojosa","p":"D"},"50":{"n":"James Talarico","p":"D"},"51":{"n":"Lulu Flores","p":"D"},"52":{"n":"Caroline Harris Davila","p":"R"},"53":{"n":"Wes Virdell","p":"R"},"54":{"n":"Brad Buckley","p":"R"},"55":{"n":"Hillary Hickland","p":"R"},"56":{"n":"Pat Curry","p":"R"},"57":{"n":"Richard Hayes","p":"R"},"58":{"n":"Helen Kerwin","p":"R"},"59":{"n":"Shelby Slawson","p":"R"},"60":{"n":"Mike Olcott","p":"R"},"61":{"n":"Keresa Richardson","p":"R"},"62":{"n":"Shelley Luther","p":"R"},"63":{"n":"Ben Bumgarner","p":"R"},"64":{"n":"Andy Hopper","p":"R"},"65":{"n":"Mitch Little","p":"R"},"66":{"n":"Matt Shaheen","p":"R"},"67":{"n":"Jeff Leach","p":"R"},"68":{"n":"David Spiller","p":"R"},"69":{"n":"James Frank","p":"R"},"70":{"n":"Mihaela Plesa","p":"D"},"71":{"n":"Stan Lambert","p":"R"},"72":{"n":"Drew Darby","p":"R"},"73":{"n":"Carrie Isaac","p":"R"},"74":{"n":"Eddie Morales","p":"D"},"75":{"n":"Mary Gonzalez","p":"D"},"76":{"n":"Suleman Lalani","p":"D"},"77":{"n":"Vincent Perez","p":"D"},"78":{"n":"Joe Moody","p":"D"},"79":{"n":"Claudia Ordaz","p":"D"},"80":{"n":"Don McLaughlin","p":"R"},"81":{"n":"Brooks Landgraf","p":"R"},"82":{"n":"Tom Craddick","p":"R"},"83":{"n":"Dustin Burrows","p":"R"},"84":{"n":"Carl Tepper","p":"R"},"85":{"n":"Stan Kitzman","p":"R"},"86":{"n":"John Smithee","p":"R"},"87":{"n":"Caroline Fairly","p":"R"},"88":{"n":"Ken King","p":"R"},"89":{"n":"Candy Noble","p":"R"},"90":{"n":"Ramon Romero, Jr.","p":"D"},"91":{"n":"David Lowe","p":"R"},"92":{"n":"Salman Bhojani","p":"D"},"93":{"n":"Nate Schatzline","p":"R"},"94":{"n":"Tony Tinderholt","p":"R"},"95":{"n":"Nicole Collier","p":"D"},"96":{"n":"David Cook","p":"R"},"97":{"n":"John McQueeney","p":"R"},"98":{"n":"Giovanni Capriglione","p":"R"},"99":{"n":"Charlie Geren","p":"R"},"100":{"n":"Venton Jones","p":"D"},"101":{"n":"Chris Turner","p":"D"},"102":{"n":"Ana-Maria Rodriguez Ramos","p":"D"},"103":{"n":"Rafael Anchia","p":"D"},"104":{"n":"Jessica Gonzalez","p":"D"},"105":{"n":"Terry Meza","p":"D"},"106":{"n":"Jared Patterson","p":"R"},"107":{"n":"Linda Garcia","p":"D"},"108":{"n":"Morgan Meyer","p":"R"},"109":{"n":"Aicha Davis","p":"D"},"110":{"n":"Toni Rose","p":"D"},"111":{"n":"Yvonne Davis","p":"D"},"112":{"n":"Angie Chen Button","p":"R"},"113":{"n":"Rhetta Andrews Bowers","p":"D"},"114":{"n":"John Bryant","p":"D"},"115":{"n":"Cassandra Garcia Hernandez","p":"D"},"116":{"n":"Trey Martinez Fischer","p":"D"},"117":{"n":"Philip Cortez","p":"D"},"118":{"n":"John Lujan","p":"R"},"119":{"n":"Liz Campos","p":"D"},"120":{"n":"Barbara Gervin-Hawkins","p":"D"},"121":{"n":"Marc LaHood","p":"R"},"122":{"n":"Mark Dorazio","p":"R"},"123":{"n":"Diego Bernal","p":"D"},"124":{"n":"Josey Garcia","p":"D"},"125":{"n":"Ray Lopez","p":"D"},"126":{"n":"Sam Harless","p":"R"},"127":{"n":"Charles Cunningham","p":"R"},"128":{"n":"Briscoe Cain","p":"R"},"129":{"n":"Dennis Paul","p":"R"},"130":{"n":"Tom Oliverson","p":"R"},"131":{"n":"Alma Allen","p":"D"},"132":{"n":"Mike Schofield","p":"R"},"133":{"n":"Mano DeAyala","p":"R"},"134":{"n":"Ann Johnson","p":"D"},"135":{"n":"Jon Rosenthal","p":"D"},"136":{"n":"John Bucy","p":"D"},"137":{"n":"Gene Wu","p":"D"},"138":{"n":"Lacey Hull","p":"R"},"139":{"n":"Charlene Ward Johnson","p":"D"},"140":{"n":"Armando Walle","p":"D"},"141":{"n":"Senfronia Thompson","p":"D"},"142":{"n":"Harold Dutton, Jr.","p":"D"},"143":{"n":"Ana Hernandez","p":"D"},"144":{"n":"Mary Ann Perez","p":"D"},"145":{"n":"Christina Morales","p":"D"},"146":{"n":"Lauren Simmons","p":"D"},"147":{"n":"Jolanda Jones","p":"D"},"148":{"n":"Penny Morales Shaw","p":"D"},"149":{"n":"Hubert Vo","p":"D"},"150":{"n":"Valoree Swanson","p":"R"}};  
const flipMap={"31":{"dominant":"D","r":10427,"d":11597,"margin":1170},"34":{"dominant":"D","r":6536,"d":10253,"margin":3717},"37":{"dominant":"D","r":8774,"d":14093,"margin":5319},"52":{"dominant":"D","r":17787,"d":19527,"margin":1740},"57":{"dominant":"D","r":13107,"d":13577,"margin":470},"63":{"dominant":"D","r":11805,"d":13220,"margin":1415},"80":{"dominant":"D","r":7558,"d":13508,"margin":5950},"93":{"dominant":"D","r":13792,"d":14122,"margin":330},"96":{"dominant":"D","r":13076,"d":17093,"margin":4017},"97":{"dominant":"D","r":14908,"d":17616,"margin":2708},"112":{"dominant":"D","r":16376,"d":18731,"margin":2355},"118":{"dominant":"D","r":9508,"d":13280,"margin":3772},"127":{"dominant":"D","r":14495,"d":16065,"margin":1570},"132":{"dominant":"D","r":11786,"d":14756,"margin":2970},"150":{"dominant":"D","r":11175,"d":12253,"margin":1078}};  
const speakerVotes={"1":{"r1":"BURROWS","r2":"BURROWS"},"2":{"r1":"COOK","r2":"COOK"},"3":{"r1":"BURROWS","r2":"BURROWS"},"4":{"r1":"BURROWS","r2":"BURROWS"},"5":{"r1":"BURROWS","r2":"BURROWS"},"6":{"r1":"COOK","r2":"COOK"},"7":{"r1":"BURROWS","r2":"BURROWS"},"8":{"r1":"BURROWS","r2":"BURROWS"},"9":{"r1":"COOK","r2":"COOK"},"10":{"r1":"COOK","r2":"COOK"},"11":{"r1":"COOK","r2":"COOK"},"12":{"r1":"COOK","r2":"COOK"},"13":{"r1":"BURROWS","r2":"BURROWS"},"14":{"r1":"COOK","r2":"COOK"},"15":{"r1":"COOK","r2":"COOK"},"16":{"r1":"BURROWS","r2":"BURROWS"},"17":{"r1":"BURROWS","r2":"BURROWS"},"18":{"r1":"COOK","r2":"COOK"},"19":{"r1":"COOK","r2":"COOK"},"20":{"r1":"BURROWS","r2":"BURROWS"},"21":{"r1":"BURROWS","r2":"BURROWS"},"22":{"r1":"BURROWS","r2":"BURROWS"},"23":{"r1":"COOK","r2":"COOK"},"24":{"r1":"BURROWS","r2":"BURROWS"},"25":{"r1":"COOK","r2":"COOK"},"26":{"r1":"COOK","r2":"COOK"},"27":{"r1":"RAMOS","r2":"BURROWS"},"28":{"r1":"BURROWS","r2":"BURROWS"},"29":{"r1":"BURROWS","r2":"BURROWS"},"30":{"r1":"COOK","r2":"COOK"},"31":{"r1":"COOK","r2":"COOK"},"32":{"r1":"BURROWS","r2":"BURROWS"},"33":{"r1":"COOK","r2":"COOK"},"34":{"r1":"BURROWS","r2":"BURROWS"},"35":{"r1":"BURROWS","r2":"BURROWS"},"36":{"r1":"COOK","r2":"COOK"},"37":{"r1":"BURROWS","r2":"BURROWS"},"38":{"r1":"BURROWS","r2":"BURROWS"},"39":{"r1":"BURROWS","r2":"BURROWS"},"40":{"r1":"BURROWS","r2":"BURROWS"},"41":{"r1":"BURROWS","r2":"BURROWS"},"42":{"r1":"COOK","r2":"COOK"},"43":{"r1":"COOK","r2":"COOK"},"44":{"r1":"COOK","r2":"COOK"},"45":{"r1":"BURROWS","r2":"BURROWS"},"46":{"r1":"BURROWS","r2":"BURROWS"},"47":{"r1":"RAMOS","r2":"PNV"},"48":{"r1":"BURROWS","r2":"BURROWS"},"49":{"r1":"RAMOS","r2":"PNV"},"50":{"r1":"BURROWS","r2":"BURROWS"},"51":{"r1":"RAMOS","r2":"BURROWS"},"52":{"r1":"COOK","r2":"COOK"},"53":{"r1":"COOK","r2":"COOK"},"54":{"r1":"BURROWS","r2":"BURROWS"},"55":{"r1":"COOK","r2":"COOK"},"56":{"r1":"COOK","r2":"COOK"},"57":{"r1":"COOK","r2":"COOK"},"58":{"r1":"COOK","r2":"COOK"},"59":{"r1":"COOK","r2":"COOK"},"60":{"r1":"COOK","r2":"COOK"},"61":{"r1":"COOK","r2":"COOK"},"62":{"r1":"COOK","r2":"COOK"},"63":{"r1":"COOK","r2":"COOK"},"64":{"r1":"COOK","r2":"COOK"},"65":{"r1":"COOK","r2":"COOK"},"66":{"r1":"COOK","r2":"COOK"},"67":{"r1":"BURROWS","r2":"BURROWS"},"68":{"r1":"COOK","r2":"COOK"},"69":{"r1":"COOK","r2":"COOK"},"70":{"r1":"BURROWS","r2":"BURROWS"},"71":{"r1":"BURROWS","r2":"BURROWS"},"72":{"r1":"BURROWS","r2":"BURROWS"},"73":{"r1":"COOK","r2":"COOK"},"74":{"r1":"BURROWS","r2":"BURROWS"},"75":{"r1":"BURROWS","r2":"BURROWS"},"76":{"r1":"RAMOS","r2":"BURROWS"},"77":{"r1":"BURROWS","r2":"BURROWS"},"78":{"r1":"BURROWS","r2":"BURROWS"},"79":{"r1":"BURROWS","r2":"BURROWS"},"80":{"r1":"COOK","r2":"COOK"},"81":{"r1":"BURROWS","r2":"BURROWS"},"82":{"r1":"COOK","r2":"BURROWS"},"83":{"r1":"BURROWS","r2":"BURROWS"},"84":{"r1":"BURROWS","r2":"BURROWS"},"85":{"r1":"BURROWS","r2":"BURROWS"},"86":{"r1":"COOK","r2":"COOK"},"87":{"r1":"BURROWS","r2":"BURROWS"},"88":{"r1":"BURROWS","r2":"BURROWS"},"89":{"r1":"COOK","r2":"COOK"},"90":{"r1":"RAMOS","r2":"BURROWS"},"91":{"r1":"COOK","r2":"COOK"},"92":{"r1":"BURROWS","r2":"BURROWS"},"93":{"r1":"COOK","r2":"COOK"},"94":{"r1":"COOK","r2":"COOK"},"95":{"r1":"RAMOS","r2":"PNV"},"96":{"r1":"COOK","r2":"COOK"},"97":{"r1":"BURROWS","r2":"BURROWS"},"98":{"r1":"BURROWS","r2":"BURROWS"},"99":{"r1":"BURROWS","r2":"BURROWS"},"100":{"r1":"BURROWS","r2":"BURROWS"},"101":{"r1":"BURROWS","r2":"BURROWS"},"102":{"r1":"RAMOS","r2":"COOK"},"103":{"r1":"BURROWS","r2":"BURROWS"},"104":{"r1":"RAMOS","r2":"BURROWS"},"105":{"r1":"RAMOS","r2":"PNV"},"106":{"r1":"BURROWS","r2":"BURROWS"},"107":{"r1":"BURROWS","r2":"BURROWS"},"108":{"r1":"BURROWS","r2":"BURROWS"},"109":{"r1":"RAMOS","r2":"PNV"},"110":{"r1":"BURROWS","r2":"BURROWS"},"111":{"r1":"RAMOS","r2":"ABSENT"},"112":{"r1":"BURROWS","r2":"BURROWS"},"113":{"r1":"BURROWS","r2":"BURROWS"},"114":{"r1":"RAMOS","r2":"PNV"},"115":{"r1":"BURROWS","r2":"BURROWS"},"116":{"r1":"RAMOS","r2":"BURROWS"},"117":{"r1":"BURROWS","r2":"BURROWS"},"118":{"r1":"COOK","r2":"COOK"},"119":{"r1":"BURROWS","r2":"BURROWS"},"120":{"r1":"RAMOS","r2":"BURROWS"},"121":{"r1":"COOK","r2":"COOK"},"122":{"r1":"COOK","r2":"COOK"},"123":{"r1":"BURROWS","r2":"BURROWS"},"124":{"r1":"RAMOS","r2":"BURROWS"},"125":{"r1":"RAMOS","r2":"BURROWS"},"126":{"r1":"COOK","r2":"BURROWS"},"127":{"r1":"COOK","r2":"COOK"},"128":{"r1":"COOK","r2":"COOK"},"129":{"r1":"COOK","r2":"COOK"},"130":{"r1":"COOK","r2":"COOK"},"131":{"r1":"RAMOS","r2":"PNV"},"132":{"r1":"COOK","r2":"COOK"},"133":{"r1":"COOK","r2":"COOK"},"134":{"r1":"BURROWS","r2":"BURROWS"},"135":{"r1":"BURROWS","r2":"BURROWS"},"136":{"r1":"BURROWS","r2":"BURROWS"},"137":{"r1":"BURROWS","r2":"BURROWS"},"138":{"r1":"BURROWS","r2":"BURROWS"},"139":{"r1":"RAMOS","r2":"PNV"},"140":{"r1":"BURROWS","r2":"BURROWS"},"141":{"r1":"RAMOS","r2":"BURROWS"},"142":{"r1":"BURROWS","r2":"BURROWS"},"143":{"r1":"BURROWS","r2":"BURROWS"},"144":{"r1":"BURROWS","r2":"BURROWS"},"145":{"r1":"RAMOS","r2":"PNV"},"146":{"r1":"BURROWS","r2":"BURROWS"},"147":{"r1":"RAMOS","r2":"BURROWS"},"148":{"r1":"RAMOS","r2":"BURROWS"},"149":{"r1":"BURROWS","r2":"BURROWS"},"150":{"r1":"COOK","r2":"COOK"}};  
  
const inc2024Defeated={  
  2:{name:'JILL DUTTON',by:'BRENT A. MONEY'},  
  11:{name:'TRAVIS CLARDY',by:'JOANNE SHOFNER'},  
  18:{name:'ERNEST BAILES',by:'JANIS HOLT'},  
  26:{name:'JACEY JETTON',by:'MATT MORGAN'},  
  33:{name:'JUSTIN HOLLAND',by:'KATRINA PIERSON'},  
  44:{name:'JOHN KUEMPEL',by:'ALAN SCHOOLCRAFT'},  
  55:{name:'HUGH SHINE',by:'HILLARY HICKLAND'},  
  58:{name:'DWAYNE BURNS',by:'HELEN KERWIN'},  
  60:{name:'GLENN ROGERS',by:'MIKE OLCOTT'},  
  61:{name:'FREDRICK FRAZIER',by:'KERESA RICHARDSON'},  
  62:{name:'REGGIE SMITH',by:'SHELLEY LUTHER'},  
  64:{name:'LYNN STUCKY',by:'ANDY HOPPER'},  
  65:{name:'KRONDA THIMESCH',by:'MITCH LITTLE'},  
  91:{name:'STEPHANIE KLICK',by:'DAVID LOWE'},  
  121:{name:'STEVE ALLISON',by:'MARC LAHOOD'},  
  146:{name:'SHAWN THIERRY',by:'LAUREN SIMMONS'}  
};  
const openSeats2024=[6,12,14,29,30,34,38,51,53,56,77,80,87,97,100,109,115,139];  
const repFlips2024=[34,80];  
  
  
function toggleSubNav(navId,btn){  
  const nav=document.getElementById(navId);  
  const otherNavs=document.querySelectorAll('.sub-nav');  
  otherNavs.forEach(n=>{if(n.id!==navId)n.style.display='none';});  
  if(nav.style.display==='none'){  
    nav.style.display='flex';  
    const activeChild=nav.querySelector('.sub-nav-btn.active');  
    if(!activeChild){const firstBtn=nav.querySelector('.sub-nav-btn');if(firstBtn)firstBtn.click();}  
  } else {  
    nav.style.display='none';  
  }  
}  
function switchTabSub(t,navId){  
  document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.remove('active');b.classList.remove('parent-active');});  
  document.querySelectorAll('.sub-nav-btn').forEach(b=>b.classList.remove('active'));  
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));  
  const panel=document.getElementById('panel-'+t);  
  if(panel)panel.classList.add('active');  
  const subBtn=document.querySelector('#'+navId+' .sub-nav-btn[data-tab="'+t+'"]');  
  if(subBtn)subBtn.classList.add('active');  
  const parentBtn=document.getElementById(navId+'Btn');  
  if(parentBtn)parentBtn.classList.add('parent-active');  
}  
function switchTab(t){  
  document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.remove('active');b.classList.remove('parent-active');});  
  document.querySelectorAll('.sub-nav-btn').forEach(b=>b.classList.remove('active'));  
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));  
  document.querySelectorAll('.sub-nav').forEach(n=>{n.style.display='none';});  
  const activeButton=document.querySelector('.tab-btn[data-tab="'+t+'"]');  
  const activePanel=document.getElementById('panel-'+t);  
  if(activeButton)activeButton.classList.add('active');  
  if(activePanel)activePanel.classList.add('active');  
}  
  
/* ═══ COMMITTEE COLORS ═══ */  
const CMTE_NAMES=["Agriculture & Livestock","Appropriations","Calendars","Corrections","Criminal Jurisprudence","Culture, Recreation & Tourism","Delivery of Government Efficiency","Elections","Energy Resources","Environmental Regulation","General Investigating","Higher Education","Homeland Security, Public Safety & Veterans' Affairs","House Administration","Human Services","Insurance","Intergovernmental Affairs","Judiciary & Civil Jurisprudence","Land & Resource Management","Licensing & Administrative Procedures","Local & Consent Calendars","Natural Resources","Pensions, Investments & Financial Services","Public Education","Public Health","Redistricting","State Affairs","Trade, Workforce & Economic Development","Transportation","Ways & Means"];  
const cmteColorMap={};CMTE_NAMES.forEach((c,i)=>{cmteColorMap[c]=i%10;});  
const cf=document.getElementById('committeeFilter');CMTE_NAMES.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;cf.appendChild(o);});  
  
/* ═══ INCUMBENT MATCHING ═══ */  
function normName(n){return n.toUpperCase().replace(/[.,]/g,'').replace(/\s+/g,' ').replace(/ JR$/,'').replace(/ SR$/,'').replace(/ III$/,'').trim();}  
function isIncumbent(dist,cn,party){const inc=incumbents[dist];if(!inc||inc.p!==party)return false;const a=normName(cn),b=normName(inc.n);if(a===b)return true;const bp=b.split(' '),ap=a.split(' '),bl=bp[bp.length-1],bf=bp[0];if(ap.includes(bl)){if(ap.includes(bf))return true;if(ap[0][0]===bf[0]&&(ap[0].length<=2||bf.length<=2))return true;}const comps=['MARTINEZ FISCHER','GARCIA HERNANDEZ','HARRIS DAVILA','LEO WILSON','WARD JOHNSON','MORALES SHAW','RODRIGUEZ RAMOS','CHEN BUTTON','GERVIN-HAWKINS','ANDREWS BOWERS'];for(const c of comps)if(b.includes(c)&&a.includes(c))return true;return false;}  
function incumbentRan(d){const inc=incumbents[d];if(!inc)return true;const ds=String(d),pd=primary26[ds];if(!pd)return false;const pc=pd[inc.p];if(!pc)return false;for(const c of pc.candidates)if(isIncumbent(d,c[0],inc.p))return true;return false;}  
  
/* ═══ TAB 1: MEMBERS ═══ */  
let currentSort={col:0,dir:'asc',type:'num'},filteredMembers=[...members];  
function baseCmte(c){return c.replace(/, CH$/,'').replace(/, VCH$/,'');}  
function renderCmteTags(cs){return cs.map(c=>{const iC=c.endsWith(', CH'),iV=c.endsWith(', VCH'),iS=c==='Speaker of the House';if(iS)return`<span class="cmte-tag is-speaker">${c}</span>`;const b=baseCmte(c),ci=cmteColorMap[b];let cls='cmte-tag cc'+(ci??0),l=c,r='';if(iC){l=b;r='<span class="cmte-role">CH</span>';}else if(iV){l=b;r='<span class="cmte-role">VCH</span>';}return`<span class="${cls}">${l}${r}</span>`;}).join(' ');}  
function renderTable(d){const tb=document.getElementById('memberBody'),em=document.getElementById('emptyState');if(!d.length){tb.innerHTML='';em.style.display='block';}else{em.style.display='none';tb.innerHTML=d.map(m=>`<tr class="party-${m.party}"><td class="seniority-cell"><span class="seniority-badge">${m.seniority}</span></td><td class="name-cell">${m.name}</td><td class="consultant-cell"><div class="consultant-tag-row consultant-tag-row-inline">${consultantTagsHtml(m.name)}</div></td><td><span class="party-tag ${m.party}">${m.party}</span></td><td class="district-cell">${m.district}</td><td class="committee-cell">${renderCmteTags(m.committees)}</td></tr>`).join('');}document.getElementById('resultCount').textContent=`SHOWING ${d.length} OF 150`;document.getElementById('kpiTotal').textContent=d.length;document.getElementById('kpiR').textContent=d.filter(m=>m.party==='R').length;document.getElementById('kpiD').textContent=d.filter(m=>m.party==='D').length;}  
function filterTable(){const s=document.getElementById('searchInput').value.toLowerCase(),p=document.getElementById('partyFilter').value,c=document.getElementById('committeeFilter').value;filteredMembers=members.filter(m=>{if(p&&m.party!==p)return false;if(c&&!m.committees.some(x=>baseCmte(x)===c))return false;if(s){const h=(m.name+' '+m.district+' '+m.committees.join(' ')).toLowerCase();if(!h.includes(s))return false;}return true;});applySortAndRender();}  
function sortTable(col,type){for(let i=0;i<6;i++)document.getElementById('sort'+i).textContent='';if(currentSort.col===col)currentSort.dir=currentSort.dir==='asc'?'desc':'asc';else currentSort={col,dir:'asc',type};document.getElementById('sort'+col).textContent=currentSort.dir==='asc'?'▲':'▼';applySortAndRender();}  
function applySortAndRender(){const keys=['seniority','name','consultants','party','district','committees'],key=keys[currentSort.col];filteredMembers.sort((a,b)=>{let va=a[key],vb=b[key];if(key==='committees'){va=va[0]||'';vb=vb[0]||'';}if(key==='consultants'){va=getMemberConsultants(a.name).join(' | ');vb=getMemberConsultants(b.name).join(' | ');}if(currentSort.type==='num')return currentSort.dir==='asc'?va-vb:vb-va;va=String(va).toLowerCase();vb=String(vb).toLowerCase();return currentSort.dir==='asc'?va.localeCompare(vb):vb.localeCompare(va);});renderTable(filteredMembers);}  
renderTable(members);  
  
/* ═══ SHARED ═══ */  
function fmt(n){return n.toLocaleString();}  
function pct(v,t){return t>0?((v/t)*100).toFixed(1)+'%':'0%';}  
function pctN(v,t){return t>0?(v/t)*100:0;}  
function togBody(el){el.nextElementSibling.classList.toggle('open');el.querySelector('.chevron').classList.toggle('open');}  
function toggleSopSection(id,trigger){const wrap=document.getElementById(id);if(!wrap)return;const isClosed=wrap.style.display==='none'||!wrap.style.display;wrap.style.display=isClosed?'block':'none';if(trigger){const chev=trigger.querySelector('.chevron');if(chev)chev.classList.toggle('open',isClosed);}}
  
/* ═══ TAB 2: 2024 ELECTIONS ═══ */  
function rPhase(label,cands){if(!cands||!cands.length)return '';const t=cands.reduce((s,c)=>s+c[1],0);let h=`<div class="phase-section"><div class="phase-label">${label}</div>`;cands.forEach((c,i)=>{const[n,v,p]=c;const w=pctN(v,t);const isW=i===0&&cands.length>1;h+=`<div class="cand-row"><span class="party-tag ${p||'I'}" style="font-size:8px;padding:1px 5px">${p||'—'}</span><span class="cand-name">${n}${isW?' <span class="winner-icon">✓</span>':''}</span><span class="cand-votes">${fmt(v)}</span><span class="cand-pct">${pct(v,t)}</span><span class="cand-bar-wrap"><span class="cand-bar ${p||'I'}" style="width:${w}%"></span></span></div>`;});return h+'</div>';}  
function buildElec24(){  
  let rC=0,dC=0,rR=0,dR=0;  
  for(let d=1;d<=150;d++){const e=elections[d]||{};if(e.march_r&&e.march_r.length>1)rC++;if(e.march_d&&e.march_d.length>1)dC++;if(e.may_r)rR++;if(e.may_d)dR++;}  
  document.getElementById('kpi24RC').textContent=rC;document.getElementById('kpi24DC').textContent=dC;  
  document.getElementById('kpi24RR').textContent=rR;document.getElementById('kpi24DR').textContent=dR;  
  // Populate callout boxes  
  let defHtml='',newHtml='';  
  const defDists=Object.keys(inc2024Defeated).map(Number).sort((a,b)=>a-b);  
  defDists.forEach(d=>{const info=inc2024Defeated[d];defHtml+=`<div style="padding:2px 0">HD-${d} <b>${info.name}</b> → ${info.by}</div>`});  
  document.getElementById('callout24Defeated').innerHTML=defHtml;  
  defDists.forEach(d=>{const info=inc2024Defeated[d];newHtml+=`<div style="padding:2px 0">HD-${d} <b>${info.by}</b> <span class="inc-tag">I</span> <span style="font-size:8px;color:var(--muted)">[Defeated ${info.name}]</span></div>`});  
  openSeats2024.forEach(d=>{const inc89=incumbents[d];if(inc89)newHtml+=`<div style="padding:2px 0">HD-${d} <b>${inc89.n.toUpperCase()}</b> <span class="tag-former">O</span></div>`});  
  document.getElementById('callout24New').innerHTML=newHtml;  
  renderElec();  
}  
function renderElec(){  
  const s=document.getElementById('elecSearch').value.toLowerCase(),ph=document.getElementById('elecPhase').value,ct=document.getElementById('elecContested').value;  
  let h='',n=0;  
  for(let d=1;d<=150;d++){  
    const e=elections[d]||{},g=e.general||[];  
    if(ct==='contested'&&g.length<=1)continue;  
    if(ct==='unopposed'&&g.length>1)continue;  
    if(ph&&(!e[ph]||!e[ph].length))continue;  
    if(s){const hay=('HD-'+d+' '+d+' '+g.map(c=>c[0]).join(' ')+' '+(e.march_r||[]).map(c=>c[0]).join(' ')+' '+(e.march_d||[]).map(c=>c[0]).join(' ')).toLowerCase();if(!hay.includes(s))continue;}  
    const w=g[0],wp=w?w[2]:'?',wn=w?w[0]:'—';  
    const tg=g.reduce((s,c)=>s+c[1],0),mg=g.length>1?((g[0][1]-g[1][1])/tg*100).toFixed(1):null;  
    const bc=wp==='R'?'var(--rep-red)':wp==='D'?'var(--dem-blue)':'var(--muted)';  
    const isOpen=openSeats2024.includes(d);  
    const isIncDef=inc2024Defeated[d]!==undefined;  
    const isRepFlip=repFlips2024.includes(d);  
    // Determine unopposed types  
    const rPriCands=(e.march_r||[]).length,dPriCands=(e.march_d||[]).length;  
    const genCands=g.length;  
    const rHasPri=rPriCands>0,dHasPri=dPriCands>0;  
    const rPriUnop=rHasPri&&rPriCands===1,dPriUnop=dHasPri&&dPriCands===1;  
    const genUnop=genCands<=1;  
    // Tags  
    let tags='';  
    if(isIncDef)tags+=`<span class="tag tag-inc-lost">DEFEATED INCUMBENT</span>`;  
    if(isRepFlip)tags+=`<span class="party-tag R" style="font-size:8px;padding:1px 6px">REPUBLICAN FLIP</span>`;  
    if(e.may_r)tags+=`<span class="party-tag R" style="font-size:8px;padding:1px 6px">R RUNOFF</span>`;  
    if(e.may_d)tags+=`<span class="party-tag D" style="font-size:8px;padding:1px 6px">D RUNOFF</span>`;  
    // Unopposed logic  
    if(genUnop&&rPriUnop&&dPriCands===0)tags+=`<span class="tag tag-unopposed">FULLY UNOPPOSED</span>`;  
    else if(genUnop&&dPriUnop&&rPriCands===0)tags+=`<span class="tag tag-unopposed">FULLY UNOPPOSED</span>`;  
    else if(genUnop)tags+=`<span class="tag tag-unopposed" style="background:#eee;border-color:#aaa;color:#777">GENERAL UNOPPOSED</span>`;  
    else if(rPriUnop&&dPriUnop)tags+=`<span class="tag tag-unopposed" style="background:#eee;border-color:#aaa;color:#777">PRIMARY UNOPPOSED</span>`;  
    else{  
      if(rPriUnop)tags+=`<span class="party-tag R" style="font-size:7px;padding:1px 4px;opacity:0.6">R UNOP.</span>`;  
      if(dPriUnop)tags+=`<span class="party-tag D" style="font-size:7px;padding:1px 4px;opacity:0.6">D UNOP.</span>`;  
    }  
    // Left-side tag  
      
    // Winner name with incumbent/defeated tags  
    let winnerHtml=wn;  
    if(isOpen)winnerHtml+=` <span class="tag-former">O</span>`;  
    if(isIncDef){winnerHtml+=` <span class="inc-tag">I</span><span style="font-size:8px;color:var(--muted);margin-left:4px">[Defeated ${inc2024Defeated[d].name}]</span>`;}  
    h+=`<div class="race-card" style="border-left:3px solid ${bc}"><div class="race-header" onclick="togBody(this)"><span class="race-dist">HD-${d}</span><span class="party-tag ${wp}" style="font-size:8px;padding:1px 6px">${wp}</span><span class="race-winner">${winnerHtml}</span>${mg?`<span class="race-margin">+${mg}%</span>`:''}<span class="header-tags">${tags}</span><span class="chevron" aria-hidden="true">▼</span></div><div class="race-body">${rPhase('NOVEMBER GENERAL',g)}${rPhase('MARCH R PRIMARY',e.march_r)}${rPhase('MARCH D PRIMARY',e.march_d)}${rPhase('MAY R RUNOFF',e.may_r)}${rPhase('MAY D RUNOFF',e.may_d)}</div></div>`;  
    n++;  
  }  
  document.getElementById('elecBody').innerHTML=h||'<div class="empty-state">NO MATCH</div>';  
  document.getElementById('elecCount').textContent=`SHOWING ${n} DISTRICTS`;  
}  
function filterElections(){renderElec();}  
buildElec24();  
  
/* ═══ TAB 3: SPEAKER VOTE ═══ */  
  
/* Faction assignment */  
function getFaction(party,r1,r2){  
  if(party==='R'&&r1==='BURROWS'&&r2==='BURROWS')return{code:'B',label:'Burrows Core',clr:'#DE0100',bg:'#fde8e8'};  
  if(party==='D'&&r1==='BURROWS'&&r2==='BURROWS')return{code:'C',label:'Burrows Democrats',clr:'#1405BD',bg:'#e8e7fd'};  
  if(party==='R'&&r1==='COOK'&&r2==='BURROWS')return{code:'F',label:'Switch',clr:'#CC5500',bg:'#fff0e6'};  
  if(party==='R'&&r1==='COOK'&&r2==='COOK')return{code:'R',label:'Reform Caucus',clr:'#546e7a',bg:'#eceff1'};  
  if(party==='D'&&r1==='COOK'&&r2==='COOK')return{code:'?',label:'Contrarian',clr:'#6b8ec2',bg:'#eef4ff'};  
  if(party==='D'&&r1==='RAMOS'&&r2==='BURROWS')return{code:'S',label:'Symbolic',clr:'#3a8fd4',bg:'#e3f1ff'};  
  if(party==='D'&&r1==='RAMOS')return{code:'P',label:'Purity Democrats',clr:'#0089c2',bg:'#e0f6ff'};  
  return null;  
}  
function renderSpeaker(){  
  const s=document.getElementById('spkSearch').value.toLowerCase(),pf=document.getElementById('spkParty').value,r1f=document.getElementById('spkR1').value,r2f=document.getElementById('spkR2').value,ff=document.getElementById('spkFaction').value;  
  let h='',n=0;  
  for(const m of members){  
    const d=m.district,v=speakerVotes[d];if(!v)continue;  
    const r1=v.r1,r2=v.r2;  
    const faction=getFaction(m.party,r1,r2);  
    if(pf&&m.party!==pf)continue;  
    if(r1f&&r1!==r1f)continue;  
    if(r2f&&r2!==r2f)continue;  
    if(ff&&(!faction||faction.code!==ff))continue;  
    if(s&&!(m.name+' '+d).toLowerCase().includes(s))continue;  
    const fHtml=faction?`<span class="faction-circle" style="background:${faction.bg};border-color:${faction.clr};color:${faction.clr}" title="${faction.label}">${faction.code}</span>`:'';  
    h+=`<tr class="party-${m.party}"><td class="district-cell">${d}</td><td class="name-cell" style="white-space:nowrap">${fHtml}${m.name} ${faction?`<span style="font-size:8px;letter-spacing:0.5px;color:var(--text-secondary);margin-left:4px">${faction.label}</span>`:''}</td><td style="text-align:right"><span class="party-tag ${m.party}">${m.party}</span></td><td style="text-align:right"><span class="vote-badge vote-${r1}">${r1}</span></td><td style="text-align:right"><span class="vote-badge vote-${r2}">${r2}</span></td></tr>`;  
    n++;  
  }  
  document.getElementById('spkBody').innerHTML=h;  
  document.getElementById('spkCount').textContent=`SHOWING ${n} OF 150`;  
}  
renderSpeaker();  
  
/* ═══ TAB 4: 2026 PRIMARY ═══ */  
function rCands26(cands,party,dist){if(!cands||!cands.length)return '';const t=cands.reduce((s,c)=>s+c[1],0);let h='';cands.forEach((c,i)=>{const[name,votes,pv]=c;const p=t>0?pctN(votes,t):0;const isW=i===0&&cands.length>1&&pv>50;const isI=isIncumbent(dist,name,party);h+=`<div class="cand-row"><span class="party-tag ${party}" style="font-size:8px;padding:1px 5px">${party}</span><span class="cand-name">${name}${isI?' <span class="inc-tag">I</span>':''}${isW?' <span class="winner-icon">✓</span>':''}</span><span class="cand-votes">${fmt(votes)}</span><span class="cand-pct">${pv}%</span><span class="cand-bar-wrap"><span class="cand-bar ${party}" style="width:${p}%"></span></span></div>`;});return h;}  
function getFactionSq(dist){const v=speakerVotes[dist];if(!v)return'';const inc=incumbents[dist];if(!inc)return'';const f=getFaction(inc.p,v.r1,v.r2);if(!f)return'';return`<span class="faction-sq" style="background:${f.bg};border-color:${f.clr};color:${f.clr}">${f.code}</span>`;}  
function getFactionBox(dist){const v=speakerVotes[dist];if(!v)return'';const inc=incumbents[dist];if(!inc)return'';const f=getFaction(inc.p,v.r1,v.r2);if(!f)return'';return`<span style="display:inline-flex;align-items:center;gap:3px;padding:2px 6px;border:1.5px solid ${f.clr};background:${f.bg};font-family:var(--font-mono);font-size:8px;font-weight:700;color:${f.clr};letter-spacing:0.5px;white-space:nowrap;"><span style="font-size:9px;font-weight:900;">${f.code}</span>${f.label}</span>`;}  
function build26(){  
  let rC=0,dC=0,runoffs=0,openSeats=0;window._d26=[];  
  for(let d=1;d<=150;d++){const ds=String(d),pd=primary26[ds]||{},inc=incumbents[d];const rD=pd.R||null,dD=pd.D||null;const rC2=rD?rD.candidates:[],dC2=dD?dD.candidates:[];const rR=rD?rD.reporting:0,dR=dD?dD.reporting:0;const rCon=rC2.length>1,dCon=dC2.length>1;if(rCon)rC++;if(dCon)dC++;const rRun=rCon&&rC2[0][2]<50,dRun=dCon&&dC2[0][2]<50;if(rRun||dRun)runoffs++;const iRan=incumbentRan(d);if(!iRan)openSeats++;let iLost=false;if(iRan&&inc){const pc=inc.p==='R'?rC2:dC2;if(pc.length>1&&pc[0][2]>50&&!isIncumbent(d,pc[0][0],inc.p))iLost=true;}const flip=flipMap[d]||null;window._d26.push({d,inc,rCands:rC2,dCands:dC2,rRep:rR,dRep:dR,rContested:rCon,dContested:dCon,rRunoff:rRun,dRunoff:dRun,incRan:iRan,openSeat:!iRan,incLost:iLost,flip});}  
  document.getElementById('kpi26RC').textContent=rC;document.getElementById('kpi26DC').textContent=dC;document.getElementById('kpi26Runoffs').textContent=runoffs;document.getElementById('kpi26Open').textContent=openSeats;document.getElementById('kpi26Flips').textContent=Object.keys(flipMap).length;render26();  
}  
function render26(){  
  const s=document.getElementById('p26Search').value.toLowerCase(),pf=document.getElementById('p26Party').value,sf=document.getElementById('p26Status').value;let h='',n=0;  
  for(const info of window._d26){const{d,inc,rCands,dCands,rRep,dRep,rContested,dContested,rRunoff,dRunoff,incRan,openSeat,incLost,flip}=info;  
    if(pf==='R'&&!rCands.length)continue;if(pf==='D'&&!dCands.length)continue;  
    if(sf==='runoff'&&!rRunoff&&!dRunoff)continue;if(sf==='open'&&!openSeat)continue;if(sf==='inc_lost'&&!incLost)continue;if(sf==='contested'&&!rContested&&!dContested)continue;if(sf==='unopposed'&&(rContested||dContested))continue;if(sf==='flip'&&!flip)continue;  
    if(s){const hay=('HD-'+d+' '+d+' '+rCands.map(c=>c[0]).join(' ')+' '+dCands.map(c=>c[0]).join(' ')+(inc?' '+inc.n:'')).toLowerCase();if(!hay.includes(s))continue;}  
    const bc=inc?(inc.p==='R'?'var(--rep-red)':'var(--dem-blue)'):'var(--muted)';  
    let tags='';  
    if(incLost)tags+=`<span class="tag tag-inc-lost">INCUMBENT DEFEATED</span>`;  
    if(rRunoff)tags+=`<span class="party-tag R" style="font-size:8px;padding:1px 6px">R RUNOFF</span>`;  
    if(dRunoff)tags+=`<span class="party-tag D" style="font-size:8px;padding:1px 6px">D RUNOFF</span>`;  
    if(flip){const fp=flip.dominant,opp=fp==='D'?'R':'D';tags+=`<span class="tag-nov-alert">NOVEMBER ALERT · ${fp}/${opp} +${fmt(flip.margin)}</span>`;}  
    if(rRep<100||dRep<100){tags+=`<span class="tag tag-reporting">${Math.min(rRep||100,dRep||100).toFixed(0)}% RPT</span>`;}  
    h+=`<div class="race-card" style="border-left:3px solid ${bc}"><div class="race-header" onclick="togBody(this)">${getFactionSq(d)}<span class="race-dist">HD-${d}</span>`;  
    if(inc)h+=`<span class="party-tag ${inc.p}" style="font-size:8px;padding:1px 6px">${inc.p}</span>`;  
    if(openSeat&&inc){  
      h+=`<span class="race-winner">${inc.n} <span class="tag-former">O</span><span class="former-note">Retired / Sought higher office</span></span>`;  
    } else {  
      h+=`<span class="race-winner">${inc?inc.n:''}${incRan?' <span class="inc-tag">I</span>':''}</span>`;  
    }  
    h+=`<span class="header-tags">${tags}</span><span class="chevron" aria-hidden="true">▼</span></div><div class="race-body">`;  
    if(rCands.length)h+=`<div class="phase-section"><div class="phase-label">REPUBLICAN PRIMARY${rRep<100?' — '+rRep.toFixed(0)+'% REPORTING':''}</div>${rCands26(rCands,'R',d)}</div>`;  
    if(dCands.length)h+=`<div class="phase-section"><div class="phase-label">DEMOCRATIC PRIMARY${dRep<100?' — '+dRep.toFixed(0)+'% REPORTING':''}</div>${rCands26(dCands,'D',d)}</div>`;  
    h+='</div></div>';n++;  
  }  
  document.getElementById('p26Body').innerHTML=h||'<div class="empty-state">NO MATCH</div>';document.getElementById('p26Count').textContent=`SHOWING ${n} DISTRICTS`;  
}  
function filter26(){render26();}  
build26();  
  
/* ═══ TAB 5: HOT SEAT ═══ */  
function renderHot(){  
  const s=document.getElementById('hotSearch').value.toLowerCase();  
  const flipDistricts=[];  
  let rToD=0,dToR=0,margins=[];  
  for(const info of window._d26){  
    const{d,inc,flip}=info;  
    if(!flip)continue;  
    if(s&&!('HD-'+d+' '+d+' '+(inc?inc.n:'')).toLowerCase().includes(s))continue;  
    flipDistricts.push(info);  
    if(flip.dominant==='D')rToD++;else dToR++;  
    margins.push(flip.margin);  
  }  
  document.getElementById('kpiHotTotal').textContent=flipDistricts.length;  
  document.getElementById('kpiHotRtoD').textContent=rToD;  
  document.getElementById('kpiHotDtoR').textContent=dToR;  
  document.getElementById('kpiHotSmall').textContent=margins.length?Math.min(...margins).toLocaleString():'—';  
  document.getElementById('kpiHotLarge').textContent=margins.length?Math.max(...margins).toLocaleString():'—';  
  
  let html='',shown=0;  
  for(const info of flipDistricts){  
    const{d,inc,rCands,dCands,rRunoff,dRunoff,openSeat,incLost,flip}=info;  
    const bc=inc?(inc.p==='R'?'var(--rep-red)':'var(--dem-blue)'):'var(--muted)';  
    let tags='';  
    if(flip){const fp=flip.dominant,opp=fp==='D'?'R':'D';tags+=`<span class="tag tag-flip">POSSIBLE FLIP · ${fp}/${opp} +${flip.margin.toLocaleString()}</span>`;}  
    if(rRunoff)tags+='<span class="tag tag-runoff">R RUNOFF</span>';  
    if(dRunoff)tags+='<span class="tag tag-runoff">D RUNOFF</span>';  
    if(incLost)tags+='<span class="tag tag-inc-lost">INC. DEFEATED</span>';  
    if(openSeat&&inc)tags+=`<span class="tag-former">O</span><span class="former-note">${inc.n} — Retired</span>`;  
  
    html+=`<div class="race-card" style="border-left:3px solid ${bc}"><div class="race-header" onclick="togBody(this)">  
      <span class="race-dist">HD-${d}</span>`;  
    if(inc)html+=`<span class="party-tag ${inc.p}" style="font-size:8px;padding:1px 6px">${inc.p}</span>`;  
    html+=`<span class="race-winner">${inc?inc.n:''}</span><span class="header-tags">${tags}</span><span class="chevron" aria-hidden="true">▼</span></div>`;  
    html+='<div class="race-body">';  
  
    // 2026 Primary results  
    if(rCands.length)html+=`<div class="phase-section"><div class="phase-label">2026 REPUBLICAN PRIMARY</div>${rCands26(rCands,'R',d)}</div>`;  
    if(dCands.length)html+=`<div class="phase-section"><div class="phase-label">2026 DEMOCRATIC PRIMARY</div>${rCands26(dCands,'D',d)}</div>`;  
  
    // For flips: show comparison with 2024  
    if(flip){  
      const e24=elections[d]||{};  
      const r24=e24.march_r||[],d24=e24.march_d||[],mr=e24.may_r||[],md=e24.may_d||[],gen=e24.general||[];  
      const rV26=rCands.reduce((s,c)=>s+c[1],0),dV26=dCands.reduce((s,c)=>s+c[1],0);  
      const rV24p=(r24.reduce((s,c)=>s+c[1],0))+(mr.reduce((s,c)=>s+c[1],0));  
      const dV24p=(d24.reduce((s,c)=>s+c[1],0))+(md.reduce((s,c)=>s+c[1],0));  
      const genR=gen.filter(c=>c[2]==='R').reduce((s,c)=>s+c[1],0);  
      const genD=gen.filter(c=>c[2]==='D').reduce((s,c)=>s+c[1],0);  
      const genT=gen.reduce((s,c)=>s+c[1],0);  
  
      html+=`<div class="phase-section"><div class="phase-label">📊 2026 vs 2024 COMPARISON</div>`;  
      html+=`<div class="compare-grid">`;  
      // Left: 2026 Primary  
      html+=`<div class="compare-col left"><div class="compare-header">2026 PRIMARY TURNOUT</div>`;  
      const t26=rV26+dV26;  
      html+=`<div class="mini-row"><span>R Votes</span><span style="color:var(--rep-red);font-weight:700">${fmt(rV26)}</span></div>`;  
      html+=`<div class="mini-bar"><div class="mini-bar-fill" style="width:${t26?rV26/t26*100:0}%;background:var(--rep-red);"></div></div>`;  
      html+=`<div class="mini-row"><span>D Votes</span><span style="color:var(--dem-blue);font-weight:700">${fmt(dV26)}</span></div>`;  
      html+=`<div class="mini-bar"><div class="mini-bar-fill" style="width:${t26?dV26/t26*100:0}%;background:var(--dem-blue);"></div></div>`;  
      html+=`<div class="mini-row" style="margin-top:4px;font-weight:700;"><span>Margin</span><span style="color:${flip.dominant==='D'?'var(--dem-blue)':'var(--rep-red)'}">${flip.dominant}+${fmt(flip.margin)}</span></div></div>`;  
      // Right: 2024  
      html+=`<div class="compare-col"><div class="compare-header">2024 PRIMARY & GENERAL</div>`;  
      const t24p=rV24p+dV24p;  
      if(t24p>0){  
        html+=`<div class="mini-row"><span>R Primary</span><span style="color:var(--rep-red);font-weight:700">${fmt(rV24p)}</span></div>`;  
        html+=`<div class="mini-row"><span>D Primary</span><span style="color:var(--dem-blue);font-weight:700">${fmt(dV24p)}</span></div>`;  
      }  
      if(genT>0){  
        html+=`<div class="mini-row" style="margin-top:4px;border-top:1px solid var(--muted-rule);padding-top:4px;"><span>General R</span><span style="color:var(--rep-red);font-weight:700">${fmt(genR)}${genT?` (${(genR/genT*100).toFixed(1)}%)`:''}</span></div>`;  
        html+=`<div class="mini-row"><span>General D</span><span style="color:var(--dem-blue);font-weight:700">${fmt(genD)}${genT?` (${(genD/genT*100).toFixed(1)}%)`:''}</span></div>`;  
        const genWinner=genR>genD?'R':'D';  
        const genMg=Math.abs(genR-genD);  
        html+=`<div class="mini-row" style="font-weight:700;"><span>Result</span><span style="color:${genWinner==='R'?'var(--rep-red)':'var(--dem-blue)'}">${genWinner}+${fmt(genMg)} (${(genMg/genT*100).toFixed(1)}%)</span></div>`;  
      }  
      html+=`</div></div></div>`;  
    }  
    html+='</div></div>';shown++;  
  }  
  document.getElementById('hotBody').innerHTML=html||'<div class="empty-state">NO HOT SEATS MATCH</div>';  
  document.getElementById('hotCount').textContent=`SHOWING ${shown}`;  
}  
renderHot();  
/* ═══ RUNOFFS ═══ */  
function buildRunoffs(){  
  const rds=[];let nR=0,nD=0,nOpen=0,nInc=0;  
  for(const info of window._d26){  
    const{d,inc,rCands,dCands,rRunoff,dRunoff,incRan,openSeat}=info;  
    if(!rRunoff&&!dRunoff)continue;  
    rds.push(info);if(rRunoff)nR++;if(dRunoff)nD++;if(openSeat)nOpen++;  
    if(incRan&&inc){const pc=inc.p==='R'?rCands:dCands;if(pc.length>=2&&pc[0][2]<50)nInc++;}  
  }  
  let html='';  
  for(const info of rds){  
    const{d,inc,rCands,dCands,rRunoff,dRunoff,openSeat}=info;  
    const bc=inc?(inc.p==='R'?'var(--rep-red)':'var(--dem-blue)'):'var(--muted)';  
    let tags='';if(rRunoff)tags+='<span class="tag tag-runoff">R RUNOFF</span>';if(dRunoff)tags+='<span class="tag tag-runoff">D RUNOFF</span>';if(openSeat&&inc)tags+=`<span class="tag-former">O</span><span class="former-note">${inc.n} — Retired</span>`;  
    html+=`<div class="race-card" style="border-left:3px solid ${bc}"><div class="race-header" onclick="togBody(this)"><span class="race-dist">HD-${d}</span>`;  
    if(inc)html+=`<span class="party-tag ${inc.p}" style="font-size:8px;padding:1px 6px">${inc.p}</span>`;  
    html+=`<span class="race-winner">${inc?inc.n:''}</span><span class="header-tags">${tags}</span><span class="chevron" aria-hidden="true">▼</span></div><div class="race-body">`;  
    if(rRunoff&&rCands.length)html+=`<div class="phase-section"><div class="phase-label">R RUNOFF — TOP 2 ADVANCE</div>${rCands26(rCands.slice(0,2),'R',d)}</div>`;  
    if(dRunoff&&dCands.length)html+=`<div class="phase-section"><div class="phase-label">D RUNOFF — TOP 2 ADVANCE</div>${rCands26(dCands.slice(0,2),'D',d)}</div>`;  
    if(rCands.length)html+=`<div class="phase-section"><div class="phase-label">FULL R PRIMARY</div>${rCands26(rCands,'R',d)}</div>`;  
    if(dCands.length)html+=`<div class="phase-section"><div class="phase-label">FULL D PRIMARY</div>${rCands26(dCands,'D',d)}</div>`;  
    html+='</div></div>';  
  }  
  document.getElementById('kpiRunTotal').textContent=rds.length;document.getElementById('kpiRunR').textContent=nR;document.getElementById('kpiRunD').textContent=nD;document.getElementById('kpiRunOpen').textContent=nOpen;document.getElementById('kpiRunInc').textContent=nInc;  
  document.getElementById('runBody').innerHTML=html||'<div class="empty-state">NO RUNOFFS</div>';  
}  
buildRunoffs();  
  
/* ═══ NEW FACES ═══ */  
function renderNewFaces(){  
  const cards=[];const alertCards=[];  
  let nOpen=0,nLost=0,nR=0,nD=0;  
  for(const info of window._d26){  
    const{d,inc,rCands,dCands,openSeat,incLost,flip,rRunoff,dRunoff}=info;  
    if(!openSeat&&!incLost&&!flip)continue;  
    // New face cards (open seat or inc lost)  
    if(openSeat||incLost){  
      let newP='TBD',newPty='',tagType='';  
      const fBox=getFactionBox(d);  
      if(openSeat&&inc){  
        const pc=inc.p==='R'?rCands:dCands;  
        if(pc.length>=1&&(pc[0][2]>50||pc.length===1))newP=pc[0][0];else newP='RUNOFF PENDING';  
        newPty=inc.p;tagType='open';nOpen++;if(inc.p==='R')nR++;else nD++;  
      }  
      if(incLost&&inc){  
        const pc=inc.p==='R'?rCands:dCands;  
        if(pc.length>=1&&pc[0][2]>50)newP=pc[0][0];else newP='RUNOFF PENDING';  
        newPty=inc.p;tagType='lost';nLost++;  
      }  
      // Check if D might win via flip  
      const isFlip=flip&&flip.dominant!==inc.p;  
      const bc=newPty==='R'?'var(--rep-red)':'var(--dem-blue)';  
      let cardHtml=`<div style="background:var(--surface);border:1px solid var(--border-color);border-top:3px solid ${bc};padding:10px 12px;font-family:var(--font-mono);">`;  
      // Top tags  
      cardHtml+=`<div style="display:flex;gap:4px;margin-bottom:8px;flex-wrap:wrap;align-items:center;">`;  
      if(tagType==='lost')cardHtml+=`<span class="tag tag-inc-lost">INCUMBENT DEFEATED</span>`;  
      if(tagType==='open')cardHtml+=`<span class="tag-former">OPEN SEAT</span>`;  
      if(isFlip)cardHtml+=`<span class="tag-nov-alert">NOVEMBER ALERT</span>`;  
      cardHtml+=`<span style="margin-left:auto">${fBox}</span>`;  
      cardHtml+=`</div>`;  
      // Incumbent line (top)  
      cardHtml+=`<div style="font-size:8px;letter-spacing:1px;color:var(--muted);margin-bottom:2px;">OUTGOING</div>`;  
      cardHtml+=`<div style="display:flex;align-items:center;gap:4px;margin-bottom:8px;"><span class="party-tag ${inc.p}" style="font-size:8px;padding:1px 5px">${inc.p}</span><span style="font-size:12px;font-weight:700;">HD-${d}</span><span style="font-size:11px;font-weight:600;">${inc.n}</span></div>`;  
      // Divider  
      cardHtml+=`<div style="border-top:1px solid var(--muted-rule);margin:4px 0;"></div>`;  
      // New face line (bottom)  
      cardHtml+=`<div style="font-size:8px;letter-spacing:1px;color:var(--success);margin-bottom:2px;">INCOMING</div>`;  
      cardHtml+=`<div style="display:flex;align-items:center;gap:4px;"><span class="party-tag ${newPty}" style="font-size:8px;padding:1px 5px">${newPty}</span><span style="font-size:13px;font-weight:700;">${newP}</span></div>`;  
      if(newP==='RUNOFF PENDING'){  
        const roCands=inc.p==='R'?rCands:dCands;  
        if(roCands.length>=2){  
          cardHtml+=`<div style="margin-top:4px;padding:4px 6px;background:var(--muted-bg);font-size:9px;color:var(--text-secondary);line-height:1.7;">`;  
          roCands.slice(0,2).forEach((c,i)=>{cardHtml+=`<div>${c[0]} — ${fmt(c[1])} (${c[2]}%)${i===0?' ▸':''}</div>`;});  
          cardHtml+=`</div>`;  
        }  
      }  
      // If flip, show D challenger  
      if(isFlip){  
        const oppCands=inc.p==='R'?dCands:rCands;  
        if(oppCands.length>0){  
          const opp=oppCands[0];const oppP=inc.p==='R'?'D':'R';  
          cardHtml+=`<div style="border-top:1px dashed var(--muted-rule);margin:6px 0;"></div>`;  
          cardHtml+=`<div style="font-size:8px;letter-spacing:1px;color:var(--dem-blue);margin-bottom:2px;">D PRIMARY WINNER — POSSIBLE NOV. CHALLENGER</div>`;  
          cardHtml+=`<div style="display:flex;align-items:center;gap:4px;"><span class="party-tag ${oppP}" style="font-size:8px;padding:1px 5px">${oppP}</span><span style="font-size:12px;font-weight:600;">${opp[0]}</span><span style="font-size:9px;color:var(--muted)">${fmt(opp[1])} votes</span></div>`;  
        }  
      }  
      cardHtml+=`</div>`;  
      cards.push(cardHtml);  
    }  
    // November alert cards (flip districts with sitting incumbents)  
    if(flip&&!openSeat&&!incLost&&inc){  
      const fBox=getFactionBox(d);  
      const bc=inc.p==='R'?'var(--rep-red)':'var(--dem-blue)';  
      const oppP=flip.dominant;  
      const oppCands=oppP==='D'?dCands:rCands;  
      const oppLeader=oppCands.length>0?oppCands[0]:null;  
      let aHtml=`<div style="background:var(--surface);border:1px solid var(--border-color);border-top:3px solid var(--warning);padding:10px 12px;font-family:var(--font-mono);">`;  
      aHtml+=`<div style="display:flex;align-items:center;gap:4px;margin-bottom:6px;flex-wrap:wrap;"><span class="tag-nov-alert">NOVEMBER ALERT · ${oppP}+${fmt(flip.margin)}</span><span style="margin-left:auto">${fBox}</span></div>`;  
      aHtml+=`<div style="font-size:8px;letter-spacing:1px;color:var(--muted);margin-bottom:2px;">INCUMBENT</div>`;  
      aHtml+=`<div style="display:flex;align-items:center;gap:4px;margin-bottom:6px;"><span class="party-tag ${inc.p}" style="font-size:8px;padding:1px 5px">${inc.p}</span><span style="font-size:12px;font-weight:700;">HD-${d}</span><span style="font-size:11px;font-weight:600;">${inc.n}</span></div>`;  
      if(oppLeader){  
        aHtml+=`<div style="border-top:1px solid var(--muted-rule);margin:4px 0;"></div>`;  
        aHtml+=`<div style="font-size:8px;letter-spacing:1px;color:${oppP==='D'?'var(--dem-blue)':'var(--rep-red)'};margin-bottom:2px;">CHALLENGER</div>`;  
        aHtml+=`<div style="display:flex;align-items:center;gap:4px;"><span class="party-tag ${oppP}" style="font-size:8px;padding:1px 5px">${oppP}</span><span style="font-size:12px;font-weight:600;">${oppLeader[0]}</span></div>`;  
        if(oppLeader[2]<50&&oppCands.length>=2){  
          aHtml+=`<div style="margin-top:3px;font-size:8px;color:var(--muted);padding-left:2px;">RUNOFF: ${oppCands[0][0]} vs ${oppCands[1][0]}</div>`;  
        }  
      }  
      aHtml+=`</div>`;  
      alertCards.push(aHtml);  
    }  
  }  
  document.getElementById('kpiNfOpen').textContent=nOpen;document.getElementById('kpiNfR').textContent=nR;  
  document.getElementById('kpiNfD').textContent=nD;document.getElementById('kpiNfLost').textContent=nLost;  
  document.getElementById('kpiNfTotal').textContent=cards.length;  
  document.getElementById('nfGrid').innerHTML=cards.join('')||'<div class="empty-state" style="grid-column:1/-1">NO NEW FACES</div>';  
  document.getElementById('nfAlertGrid').innerHTML=alertCards.join('')||'<div class="empty-state" style="grid-column:1/-1">NO ALERTS</div>';  
}  
renderNewFaces();  
/* ═══ STATE OF PLAY 2027 ═══ */  
function getSopData(){  
  if(!window._sopToggles)window._sopToggles={};  
  if(!window._sopLoyalty)window._sopLoyalty={};  
  if(!window._sopSpeaker)window._sopSpeaker={};  
  const returning=[];const newfaces=[];const contests=[];const runoffRaces=[];  
  for(let d=1;d<=150;d++){  
    const ds=String(d);const inc=incumbents[ds];if(!inc)continue;  
    const pd=primary26[ds]||{};  
    const rCands=(pd.R||{}).candidates||[];  
    const dCands=(pd.D||{}).candidates||[];  
    const v=speakerVotes[ds];  
    const f=v?getFaction(inc.p,v.r1,v.r2):null;  
    const flip=flipMap[d];  
    const iRan=incumbentRan(d);const openSeat=!iRan;  
    let incLost=false;  
    if(iRan){const pc=inc.p==='R'?rCands:dCands;if(pc.length>=2){const t=pc.reduce((s,c)=>s+c[1],0);if(t>0&&!isIncumbent(d,pc[0][0],inc.p)&&pc[0][1]/t>0.5)incLost=true;}}  
    const rRunoff=rCands.length>=2&&rCands[0][2]<50;  
    const dRunoff=dCands.length>=2&&dCands[0][2]<50;  
    const hasRunoff=rRunoff||dRunoff;  
    // ANY flip district goes to November contests  
    if(flip){  
      contests.push({d,inc,faction:f,flip,rCands,dCands,rRunoff,dRunoff,openSeat,incLost});  
      continue;  
    }  
    // HD-149 Vo runoff - special case  
    if(d===149&&dRunoff){  
      contests.push({d,inc,faction:f,flip:null,rCands,dCands,rRunoff,dRunoff,openSeat:false,incLost:false,isVoRunoff:true});  
      if(!window._sopToggles[d+'_main'])window._sopToggles[d+'_main']='d';// Vo expected to lose  
      continue;  
    }  
    // Runoff (non-flip) goes to runoffs section  
    if(hasRunoff){  
      runoffRaces.push({d,inc,faction:f,rCands,dCands,rRunoff,dRunoff,openSeat,incLost});  
      continue;  
    }  
    if(!openSeat&&!incLost){  
      returning.push({d,name:inc.n,party:inc.p,faction:f});  
    } else {  
      const pc=inc.p==='R'?rCands:dCands;  
      let newN='TBD',newP=inc.p;  
      if(pc.length>=1&&(pc[0][2]>50||pc.length===1))newN=pc[0][0];  
      newfaces.push({d,name:newN,party:newP,faction:null,incName:inc.n,incFaction:f});  
    }  
  }  
  return{returning:returning.sort((a,b)=>a.d-b.d),newfaces:newfaces.sort((a,b)=>a.d-b.d),contests:contests.sort((a,b)=>a.d-b.d),runoffs:runoffRaces.sort((a,b)=>a.d-b.d)};  
}  
function getDefaultLoyalty(d){  
  // Based on 89th speaker vote factions  
  const ds=String(d);const inc=incumbents[ds];if(!inc)return'';  
  const v=speakerVotes[ds];if(!v)return'';  
  const f=getFaction(inc.p,v.r1,v.r2);if(!f)return'';  
  const map={'B':'Solid Burrows','C':'Solid Burrows','F':'Likely Burrows','R':'Strong Reform','S':'Likely Burrows','P':'Strong Democrat','?':'Unsure'};  
  return map[f.code]||'';  
}  
function getDefaultSpeaker(d){  
  const ds=String(d);const inc=incumbents[ds];if(!inc)return'';  
  const v=speakerVotes[ds];if(!v)return'';  
  const f=getFaction(inc.p,v.r1,v.r2);if(!f)return'';  
  if(f.code==='B'||f.code==='C'||f.code==='F'||f.code==='S')return'Burrows (R)';  
  if(f.code==='R')return'Challenger (R)';  
  if(f.code==='P'||f.code==='?')return'Democrat (D)';  
  return'';  
}  
  
/* ═══ COMMITTEES '27 ═══ */  
// PSC (Permanent Standing Subcommittee) data: parent committee -> [{name, chair, chairDist, vch, vchDist}]  
const pscData={  
  'Appropriations':[  
    {name:'PSC: Article II (Health & Human Services)',chair:'Angelia Orr',chairDist:13,vch:'Donna Howard',vchDist:48},  
    {name:'PSC: Article III (Public & Higher Ed)',chair:'Stan Kitzman',chairDist:85,vch:'Armando Martinez',vchDist:39},  
    {name:'PSC: Articles I,IV,V (Gen Gov, Judiciary, CJ)',chair:'Mary Gonzalez',chairDist:75,vch:'Mano DeAyala',vchDist:133},  
    {name:'PSC: Articles VI,VII,VIII (Natural Res, Business)',chair:'Armando Walle',chairDist:140,vch:'John Lujan',vchDist:118},  
  ],  
  'Criminal Jurisprudence':[  
    {name:'PSC: Juvenile Justice',chair:'David Cook',chairDist:96,vch:'Jolanda Jones',vchDist:147},  
  ],  
  'Homeland Security, Public Safety & Veterans\' Affairs':[  
    {name:'PSC: Defense & Veterans\' Affairs',chair:'Philip Cortez',chairDist:117,vch:'Mark Dorazio',vchDist:122},  
  ],  
  'Intergovernmental Affairs':[  
    {name:'PSC: County & Regional Government',chair:'David Spiller',chairDist:68,vch:'Sheryl Cole',vchDist:46},  
    {name:'PSC: State-Federal Relations',chair:'Carl Tepper',chairDist:84,vch:'Cassandra Garcia Hernandez',vchDist:115},  
  ],  
  'Judiciary & Civil Jurisprudence':[  
    {name:'PSC: Family & Fiduciary Relationships',chair:'Harold Dutton, Jr.',chairDist:142,vch:'Richard Hayes',vchDist:57},  
  ],  
  'Public Education':[  
    {name:'PSC: Academic & Career-Oriented Education',chair:'Trent Ashby',chairDist:9,vch:'James Talarico',vchDist:50},  
  ],  
  'Public Health':[  
    {name:'PSC: Disease Prevention & Women\'s/Children\'s Health',chair:'James Frank',chairDist:69,vch:'John Bucy',vchDist:136},  
  ],  
  'State Affairs':[  
    {name:'PSC: Telecommunications & Broadband',chair:'Rafael Anchia',chairDist:103,vch:'Will Metcalf',vchDist:16},  
  ],  
  'Trade, Workforce & Economic Development':[  
    {name:'PSC: International Relations & Economic Dev',chair:'John Lujan',chairDist:118,vch:'Oscar Longoria',vchDist:35},  
    {name:'PSC: Workforce',chair:'Oscar Longoria',chairDist:35,vch:'Caroline Harris Davila',vchDist:52},  
  ],  
  'Ways & Means':[  
    {name:'PSC: Property Tax Appraisals',chair:'Chris Turner',chairDist:101,vch:'Candy Noble',vchDist:89},  
  ],  
  'Transportation':[  
    {name:'PSC: Transportation Funding',chair:'Terry Canales',chairDist:40,vch:'Dennis Paul',vchDist:129},  
  ],  
};  
function buildCommittees27(){  
  const notReturning=new Set();const inDanger=new Set();  
  const notReturnParty={};const dangerParty={};  
  for(let d=1;d<=150;d++){  
    const ds=String(d);const inc=incumbents[ds];if(!inc)continue;  
    const pd=primary26[ds]||{};  
    const rCands=(pd.R||{}).candidates||[];const dCands=(pd.D||{}).candidates||[];  
    const iRan=incumbentRan(d);  
    let incLost=false;  
    if(iRan){const pc=inc.p==='R'?rCands:dCands;if(pc.length>=2){const t=pc.reduce((s,c)=>s+c[1],0);if(t>0&&!isIncumbent(d,pc[0][0],inc.p)&&pc[0][1]/t>0.5)incLost=true;}}  
    if(!iRan||incLost){notReturning.add(d);notReturnParty[d]=inc.p;}  
    if(flipMap[d]&&!notReturning.has(d)){inDanger.add(d);dangerParty[d]=inc.p;}  
  }  
  // Build committee data  
  const cmteData={};  
  members.forEach(m=>{  
    m.committees.forEach(c=>{  
      const isChair=c.endsWith(', CH');const isVCH=c.endsWith(', VCH');  
      if(c==='Speaker of the House')return;  
      const baseName=c.replace(/, CH$/,'').replace(/, VCH$/,'');  
      if(!cmteData[baseName])cmteData[baseName]={members:[],chair:null,vch:null,pscLeaders:[]};  
      const entry={d:m.district,name:m.name,party:m.party};  
      cmteData[baseName].members.push(entry);  
      if(isChair)cmteData[baseName].chair=entry;  
      if(isVCH)cmteData[baseName].vch=entry;  
    });  
  });  
  // Attach PSC leaders to parent committees  
  Object.keys(pscData).forEach(parent=>{  
    if(!cmteData[parent])return;  
    pscData[parent].forEach(psc=>{  
      cmteData[parent].pscLeaders.push(psc);  
    });  
  });  
  // KPIs  
  let totalNR=notReturning.size,totalDanger=inDanger.size,chairsRisk=0,vchRisk=0,pscRisk=0;  
  Object.values(cmteData).forEach(cd=>{  
    if(cd.chair&&(notReturning.has(cd.chair.d)||inDanger.has(cd.chair.d)))chairsRisk++;  
    if(cd.vch&&(notReturning.has(cd.vch.d)||inDanger.has(cd.vch.d)))vchRisk++;  
    cd.pscLeaders.forEach(p=>{  
      if(notReturning.has(p.chairDist)||inDanger.has(p.chairDist))pscRisk++;  
      if(notReturning.has(p.vchDist)||inDanger.has(p.vchDist))pscRisk++;  
    });  
  });  
  document.getElementById('cmte27Total').textContent=Object.keys(cmteData).length;  
  document.getElementById('cmte27NotReturn').textContent=totalNR;  
  document.getElementById('cmte27Danger').textContent=totalDanger;  
  document.getElementById('cmte27ChairRisk').textContent=chairsRisk;  
  document.getElementById('cmte27VchRisk').textContent=vchRisk+' + '+pscRisk+' PSC';  
  // Render  
  let h='';  
  Object.keys(cmteData).sort().forEach(name=>{  
    const cd=cmteData[name];  
    // Count NR and danger by party  
    let nrR=0,nrD=0,drR=0,drD=0;  
    cd.members.forEach(m=>{  
      if(notReturning.has(m.d)){if(m.party==='R')nrR++;else nrD++;}  
      if(inDanger.has(m.d)){if(m.party==='R')drR++;else drD++;}  
    });  
    const totalAtRisk=nrR+nrD+drR+drD;  
    const chairRisk=cd.chair&&(notReturning.has(cd.chair.d)||inDanger.has(cd.chair.d));  
    const vchRsk=cd.vch&&(notReturning.has(cd.vch.d)||inDanger.has(cd.vch.d));  
    const borderColor=totalAtRisk===0?'var(--success)':(chairRisk?'var(--danger)':'var(--warning)');  
    h+=`<div style="background:var(--surface);border:1px solid var(--border-color);border-left:3px solid ${borderColor};margin-bottom:6px;font-family:var(--font-mono);">`;  
    h+=`<div onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none';this.querySelector('.chevron').classList.toggle('open')" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">`;  
    h+=`<span style="font-size:11px;font-weight:700;min-width:240px;">${name}</span>`;  
    h+=`<span style="font-size:9px;color:var(--muted);">${cd.members.length} mbrs</span>`;  
    // NOT RETURNING tag with R/D counts  
    if(nrR+nrD>0)h+=`<span style="font-size:7px;padding:1px 4px;background:#fce4ec;border:1px solid #e91e63;color:#c2185b;font-weight:700;white-space:nowrap;">${nrR} R ${nrD} D NOT RETURNING</span>`;  
    // AT RISK tag with R/D counts  
    if(drR+drD>0)h+=`<span style="font-size:7px;padding:1px 4px;background:#fff3e0;border:1px solid #ef6c00;color:#e65100;font-weight:700;white-space:nowrap;">${drR} R ${drD} D AT RISK</span>`;  
    if(totalAtRisk===0)h+=`<span style="font-size:7px;padding:1px 4px;background:var(--success-light);border:1px solid var(--success);color:var(--success);font-weight:700;">STABLE</span>`;  
    // Chair/VCH status inline  
    if(cd.chair){  
      const cNR=notReturning.has(cd.chair.d);const cDR=inDanger.has(cd.chair.d);  
      const cStatus=cNR?'⚠ NR':(cDR?'⚠ RISK':'✓');  
      h+=`<span style="font-size:7px;color:${cNR||cDR?'var(--danger)':'var(--success)'};">CH: ${cd.chair.name} ${cStatus}</span>`;  
    }  
    if(cd.vch){  
      const vNR=notReturning.has(cd.vch.d);const vDR=inDanger.has(cd.vch.d);  
      const vStatus=vNR?'⚠ NR':(vDR?'⚠ RISK':'✓');  
      h+=`<span style="font-size:7px;color:${vNR||vDR?'var(--warning)':'var(--success)'};">VCH: ${cd.vch.name} ${vStatus}</span>`;  
    }  
    h+=`<span class="chevron" style="margin-left:auto;">▼</span>`;  
    h+=`</div>`;  
    // Expandable body  
    h+=`<div style="display:none;padding:8px 12px;border-top:1px solid var(--muted-rule);">`;  
    // PSC leaders section  
    if(cd.pscLeaders.length>0){  
      h+=`<div style="margin-bottom:8px;">`;  
      h+=`<div style="font-size:8px;letter-spacing:1px;color:#7b1fa2;font-weight:700;margin-bottom:4px;">PERMANENT STANDING SUBCOMMITTEES</div>`;  
      cd.pscLeaders.forEach(psc=>{  
        const chNR=notReturning.has(psc.chairDist);const chDR=inDanger.has(psc.chairDist);  
        const vhNR=notReturning.has(psc.vchDist);const vhDR=inDanger.has(psc.vchDist);  
        const chColor=chNR?'#c2185b':(chDR?'#e65100':'var(--success)');  
        const vhColor=vhNR?'#c2185b':(vhDR?'#e65100':'var(--success)');  
        const chTag=chNR?'NOT RETURNING':(chDR?'AT RISK':'✓');  
        const vhTag=vhNR?'NOT RETURNING':(vhDR?'AT RISK':'✓');  
        h+=`<div style="padding:4px 8px;background:#f3e5f5;border:1px solid #ce93d8;margin-bottom:3px;font-size:8px;">`;  
        h+=`<div style="font-weight:700;margin-bottom:2px;">${psc.name}</div>`;  
        h+=`<div style="display:flex;gap:12px;">`;  
        h+=`<span style="color:${chColor};">CH: ${psc.chair} (HD-${psc.chairDist}) ${chTag}</span>`;  
        h+=`<span style="color:${vhColor};">VCH: ${psc.vch} (HD-${psc.vchDist}) ${vhTag}</span>`;  
        h+=`</div></div>`;  
      });  
      h+=`</div>`;  
    }  
    // Member grid  
    h+=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;">`;  
    cd.members.forEach(m=>{  
      const isNR=notReturning.has(m.d);const isD=inDanger.has(m.d);  
      const bg=isNR?'#fdf1f1':(isD?'#fff3e0':'var(--muted-surface)');  
      const bdr=isNR?'1px solid var(--danger)':(isD?'1px solid var(--warning)':'1px solid var(--muted-rule)');  
      let tag='';  
      if(isNR)tag=`<span style="font-size:6px;padding:0 3px;background:#fce4ec;border:1px solid #e91e63;color:#c2185b;font-weight:700;margin-left:auto;white-space:nowrap;">NOT RETURNING</span>`;  
      if(isD)tag=`<span style="font-size:6px;padding:0 3px;background:#fff3e0;border:1px solid #ef6c00;color:#e65100;font-weight:700;margin-left:auto;white-space:nowrap;">AT RISK</span>`;  
      let role='';  
      if(cd.chair&&cd.chair.d===m.d)role='<span style="font-size:6px;padding:0 2px;background:#e8eaf6;border:1px solid #3f51b5;color:#283593;font-weight:700;">CH</span> ';  
      if(cd.vch&&cd.vch.d===m.d)role='<span style="font-size:6px;padding:0 2px;background:#e0f2f1;border:1px solid #009688;color:#00695c;font-weight:700;">VCH</span> ';  
      h+=`<div style="display:flex;align-items:center;gap:3px;padding:3px 5px;background:${bg};border:${bdr};font-size:8px;">`;  
      h+=`<span class="party-tag ${m.party}" style="font-size:6px;padding:0 3px;">${m.party}</span>`;  
      h+=`${role}<span style="font-weight:600;">HD-${m.d}</span> <span>${m.name}</span>`;  
      h+=tag;  
      h+=`</div>`;  
    });  
    h+=`</div></div></div>`;  
  });  
  document.getElementById('cmte27Body').innerHTML=h;  
}  
buildCommittees27();  
  
  

const consultantPalette=['#4c6ef5','#2f9e44','#f08c00','#7b2cbf','#0b7285','#c92a2a','#5f3dc4','#099268','#d9480f','#1c7ed6','#a61e4d','#e67700'];
const consultantDefineColors=['#4169E1','#2e7d32','#b45309','#7b1fa2','#00838f','#c62828','#4e342e','#1565c0','#558b2f','#6a1b9a'];
const consultantAssignments={
  'Chris Spencer':['Axiom'],
  'Jorge Borrego':['Berry'],
  'Armin Mizani':['Griffin'],
  'Candy Noble':['Brannon & Co.'],
  'Angelia Orr':['Knorfleet','Parr'],
  'Jared Patterson':['GDC3'],
  'Cheryl Bean':['Axiom'],
  'Ken King':['Knorfleet'],
  'Jay Dean':['GDC3'],
  'Tom Butler':['Griffin'],
  'Brad Buckley':['Parr'],
  'Janie Lopez':['Leon Strat.'],
  'Raymond "Ray" Lopez':['Knorfleet'],
  'Terri Leo Wilson':['Berry'],
  'Holly Jones':['Blakemore'],
  'Jay Hardaway':['Knorfleet'],
  'Stan Gerdes':['Parr'],
  'Pat Curry':['Knorfleet'],
  'Rocky Thigpen':['Parr'],
  'Andy Hopper':['Griffin'],
  'Will Metcalf':['Berry'],
  'Ellen Troxclair':['Berry'],
  'Mark Dorazio':['Griffin'],
  'Marc LaHood':['Griffin'],
  'Cody Harris':['Knorfleet','Parr'],
  'Alan Schoolcraft':['Axiom'],
  'Caroline Harris Davila':['Berry'],
  'Cole Hefner':['Berry'],
  'Lacey Hull':['Berry'],
  'Scott Bowen':['Griffin'],
  'Mike Olcott':['Griffin'],
  'Jeff Leach':['GDC3'],
  'Angie Chen Button':['Parr'],
  'Morgan Meyer':['Allyn Media'],
  'Alan B. Schoolcraft':['Axiom'],
  'Alan Blaylock':['Parr'],
  'Drew Darby':['KC Strat.'],
  'Angela Orr':['Knorfleet','Parr'],
  'Brad Bailey':['Parr'],
  'Ray Callas':['Knorfleet'],
  'Terri Leo-Wilson':['Berry'],
  'Holly Jeffreys':['Blakemore'],
  'Caroline Harris-Davila':['Berry'],
  'Angie Chen-Button':['Parr'],
  'Ellen Fleischmann':['Parr']
};
const consultantAssignmentsDefault=JSON.parse(JSON.stringify(consultantAssignments));
consultantByNorm={};
Object.entries(consultantAssignments).forEach(([name,cons])=>{consultantByNorm[normName(name)]=[...cons];});
consultantNACache=new Set();
consultantColorMap={};
const consultantDefineState={open:false,memberName:'',selectedColor:consultantDefineColors[0],pendingConsultant:null};

function ensureConsultantColor(name){
  if(!consultantColorMap[name]){
    const idx=Object.keys(consultantColorMap).length%consultantPalette.length;
    consultantColorMap[name]=consultantPalette[idx];
  }
  return consultantColorMap[name];
}
function getMemberConsultants(name){
  const key=normName(name);
  const found=consultantByNorm[key];
  if(found&&found.length)return found;
  consultantNACache.add(name);
  return ['N/A'];
}
function setMemberConsultants(name,consultants){consultantByNorm[normName(name)]=uniqueList(consultants).length?uniqueList(consultants):['N/A'];}
function consultantTagsHtml(name){
  return getMemberConsultants(name).map(c=>{const color=ensureConsultantColor(c);return `<span class="consultant-tag" style="border-color:${color};color:${color};background:${color}1a;">CONSULTANT: ${escHtml(c)}</span>`;}).join(' ');
}
function collectConsultantGroups(){
  const groups={};
  members.forEach(m=>{getMemberConsultants(m.name).forEach(c=>{if(!groups[c])groups[c]=[];groups[c].push(m);ensureConsultantColor(c);});});
  Object.values(groups).forEach(arr=>arr.sort((a,b)=>a.name.localeCompare(b.name)));
  return Object.entries(groups).sort((a,b)=>{if(a[0]==='N/A')return 1;if(b[0]==='N/A')return -1;return a[0].localeCompare(b[0]);});
}
function renderConsultantsBoard(){
  const wrap=document.getElementById('consultantsBoard');if(!wrap)return;
  const groups=collectConsultantGroups();
  wrap.innerHTML=groups.map(([consultant,list])=>{const color=ensureConsultantColor(consultant);return `<div class="consultant-card" data-consultant="${escAttr(consultant)}" style="--consultant-color:${color};"><div class="consultant-card-head"><span>${escHtml(consultant)}</span><span>${list.length}</span></div><div class="consultant-dropzone">${list.map(m=>`<div class="consultant-member" draggable="true" data-member="${escAttr(m.name)}"><div class="consultant-member-head"><span class="consultant-member-name">${escHtml(m.name)}</span><span class="party-tag ${m.party}" style="font-size:8px;padding:1px 5px">${m.party}</span></div><div class="consultant-member-dist">HD-${m.district}</div></div>`).join('')}</div></div>`;}).join('');
  bindConsultantDnD();
  bindConsultantContextMenus();
}
function bindConsultantDnD(){
  document.querySelectorAll('.consultant-member').forEach(el=>{
    el.addEventListener('dragstart',ev=>{ev.dataTransfer.setData('text/plain',el.dataset.member||'');el.classList.add('dragging');});
    el.addEventListener('dragend',()=>el.classList.remove('dragging'));
  });
  document.querySelectorAll('.consultant-card').forEach(card=>{
    const zone=card.querySelector('.consultant-dropzone');
    zone.addEventListener('dragover',ev=>{ev.preventDefault();card.classList.add('drag-over');});
    zone.addEventListener('dragleave',()=>card.classList.remove('drag-over'));
    zone.addEventListener('drop',ev=>{
      ev.preventDefault();card.classList.remove('drag-over');
      const memberName=ev.dataTransfer.getData('text/plain');if(!memberName)return;
      const consultantName=card.dataset.consultant;
      const defineNew=window.confirm('Assign to this consultant? Click OK to assign, or Cancel to Define New.');
      if(defineNew){setMemberConsultants(memberName,[consultantName]);renderConsultantsBoard();buildSeniority();return;}
      openConsultantDefineModal(memberName,consultantName);
    });
  });
}
function bindConsultantContextMenus(){
  document.querySelectorAll('.consultant-member').forEach(el=>{
    el.addEventListener('contextmenu',ev=>{
      ev.preventDefault();
      openConsultantContextMenu(ev.pageX,ev.pageY,el.dataset.member||'');
    });
  });
}
function openConsultantContextMenu(x,y,memberName){
  const menu=document.getElementById('consultantContextMenu');if(!menu)return;
  const groups=collectConsultantGroups().map(([name])=>name).filter(name=>name!=='N/A');
  menu.innerHTML=[...groups.map(name=>`<button type="button" data-member="${escAttr(memberName)}" data-consultant="${escAttr(name)}">SET CONSULTANT: ${escHtml(name)}</button>`),`<button type="button" class="define-new" data-member="${escAttr(memberName)}" data-consultant="">DEFINE NEW</button>`].join('');
  menu.style.left=`${x}px`;menu.style.top=`${y}px`;menu.style.display='block';
  menu.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      closeConsultantContextMenu();
      const targetMember=btn.dataset.member||'';
      if(!targetMember)return;
      if(btn.classList.contains('define-new')){openConsultantDefineModal(targetMember,'');return;}
      setMemberConsultants(targetMember,[btn.dataset.consultant||'N/A']);renderConsultantsBoard();buildSeniority();
    });
  });
}
function closeConsultantContextMenu(){
  const menu=document.getElementById('consultantContextMenu');if(menu)menu.style.display='none';
}
function openConsultantDefineModal(memberName,pendingConsultant){
  const modal=document.getElementById('consultantDefineModal');if(!modal)return;
  consultantDefineState.open=true;
  consultantDefineState.memberName=memberName;
  consultantDefineState.pendingConsultant=pendingConsultant||null;
  consultantDefineState.selectedColor=consultantDefineColors[0];
  const nameInput=document.getElementById('consultantDefineName');
  const grid=document.getElementById('consultantColorGrid');
  if(nameInput)nameInput.value='';
  if(grid){
    grid.innerHTML=consultantDefineColors.map((color,idx)=>`<button type="button" class="consultant-color-choice ${idx===0?'active':''}" data-color="${color}" style="background:${color};" aria-label="Consultant color ${idx+1}"></button>`).join('');
    grid.querySelectorAll('.consultant-color-choice').forEach(btn=>{
      btn.addEventListener('click',()=>{
        consultantDefineState.selectedColor=btn.dataset.color||consultantDefineColors[0];
        grid.querySelectorAll('.consultant-color-choice').forEach(c=>c.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
  modal.style.display='flex';
  if(nameInput)nameInput.focus();
}
function closeConsultantDefineModal(){
  const modal=document.getElementById('consultantDefineModal');if(modal)modal.style.display='none';
  consultantDefineState.open=false;
}
function saveConsultantDefineModal(){
  const nameInput=document.getElementById('consultantDefineName');if(!nameInput)return;
  const newName=(nameInput.value||'').trim();
  if(!newName||!consultantDefineState.memberName)return;
  consultantColorMap[newName]=consultantDefineState.selectedColor;
  setMemberConsultants(consultantDefineState.memberName,[newName]);
  closeConsultantDefineModal();
  renderConsultantsBoard();
  buildSeniority();
}
function resetConsultants(){
  Object.keys(consultantByNorm).forEach(k=>delete consultantByNorm[k]);
  Object.entries(consultantAssignmentsDefault).forEach(([name,cons])=>{consultantByNorm[normName(name)]=[...cons];});
  consultantNACache.clear();
  closeConsultantContextMenu();
  closeConsultantDefineModal();
  renderConsultantsBoard();
  buildSeniority();
}
document.addEventListener('click',ev=>{
  const menu=document.getElementById('consultantContextMenu');
  if(menu&&menu.style.display==='block'&&!menu.contains(ev.target))closeConsultantContextMenu();
});
applySortAndRender();

/* ═══ '27 SENIORITY ═══ */  
function buildSeniority(){  
  // Determine status of each member  
  const notReturning=new Set();const inDanger=new Set();const inRunoff=new Set();  
  for(let d=1;d<=150;d++){  
    const ds=String(d);const inc=incumbents[ds];if(!inc)continue;  
    const pd=primary26[ds]||{};  
    const rCands=(pd.R||{}).candidates||[];const dCands=(pd.D||{}).candidates||[];  
    const iRan=incumbentRan(d);  
    let incLost=false;  
    if(iRan){const pc=inc.p==='R'?rCands:dCands;if(pc.length>=2){const t=pc.reduce((s,c)=>s+c[1],0);if(t>0&&!isIncumbent(d,pc[0][0],inc.p)&&pc[0][1]/t>0.5)incLost=true;}}  
    if(!iRan||incLost)notReturning.add(d);  
    if(flipMap[d]&&!notReturning.has(d))inDanger.add(d);  
    // Check if incumbent is in a runoff (their party's primary)  
    if(iRan&&inc&&!incLost){  
      const pc=inc.p==='R'?rCands:dCands;  
      if(pc.length>=2&&pc[0][2]<50&&isIncumbent(d,pc[0][0],inc.p))inRunoff.add(d);  
      if(pc.length>=2&&pc[0][2]<50&&pc.length>=2){  
        // Check if incumbent is candidate 2  
        for(let ci=0;ci<pc.length;ci++){if(isIncumbent(d,pc[ci][0],inc.p)){inRunoff.add(d);break;}}  
      }  
    }  
  }  
  // Build seniority list: returning members sorted by seniority, then vacant  
  const returning=[];const vacant=[];  
  members.forEach(m=>{  
    if(notReturning.has(m.district)){  
      vacant.push(m);  
    } else {  
      returning.push(m);  
    }  
  });  
  // Sort returning by seniority  
  returning.sort((a,b)=>a.seniority-b.seniority);  
  // KPIs  
  const rRet=returning.filter(m=>m.party==='R').length;  
  const dRet=returning.filter(m=>m.party==='D').length;  
  document.getElementById('senReturning').textContent=returning.length;  
  document.getElementById('senR').textContent=rRet;  
  document.getElementById('senD').textContent=dRet;  
  document.getElementById('senVacant').textContent=vacant.length;  
  // Render  
  let h='';let rank=1;  
  returning.forEach(m=>{  
    const d=m.district;  
    const isDanger=inDanger.has(d);  
    const isRun=inRunoff.has(d);  
    let tags='';  
    if(isRun)tags+=`<span style="font-size:7px;padding:1px 5px;background:var(--warning-light);border:1px solid var(--warning);color:var(--warning);font-weight:700;">INCUMBENT RUNOFF</span> `;  
    if(isDanger)tags+=`<span style="font-size:7px;padding:1px 5px;background:#fff3e0;border:1px solid #ef6c00;color:#e65100;font-weight:700;cursor:pointer;" title="November Alert district">AT RISK?</span> `;  
    h+=`<tr class="party-${m.party}"><td class="seniority-cell"><span class="seniority-badge">${rank}</span></td><td style="text-align:center;"><span style="display:inline-block;padding:2px 8px;background:#fffde7;border:1px solid #f9a825;color:#f57f17;font-size:10px;font-weight:700;min-width:28px;text-align:center;">${m.seniority}</span></td><td class="district-cell">${d}</td><td class="name-cell">${m.name}<div class="consultant-tag-row">${consultantTagsHtml(m.name)}</div></td><td><span class="party-tag ${m.party}">${m.party}</span></td><td>${tags}</td></tr>`;  
    rank++;  
  });  
  // Vacant rows  
  vacant.sort((a,b)=>a.district-b.district);  
  vacant.forEach(m=>{  
    const reason=incumbentRan(m.district)?'Defeated in primary':'Retired / Sought higher office';  
    h+=`<tr style="background:#f5f5f5;opacity:0.6;"><td class="seniority-cell"><span class="seniority-badge" style="background:#e0e0e0;color:#999;">—</span></td><td style="text-align:center;"><span style="display:inline-block;padding:2px 8px;background:#fff8e1;border:1px solid #ffe082;color:#c8a415;font-size:10px;font-weight:700;min-width:28px;text-align:center;">${m.seniority}</span></td><td class="district-cell">${m.district}</td><td class="name-cell" style="color:#999;text-decoration:line-through;">${m.name}<div class="consultant-tag-row">${consultantTagsHtml(m.name)}</div></td><td><span class="party-tag ${m.party}" style="opacity:0.4;">${m.party}</span></td><td><span style="font-size:8px;padding:1px 6px;background:#e0e0e0;border:1px solid #bbb;color:#888;font-weight:700;">VACANT · ${reason}</span></td></tr>`;  
  });  
  document.getElementById('senBody').innerHTML=h;  
}  
buildSeniority();  
function initDefaults(){  
  if(!window._sopToggles)window._sopToggles={};  
  if(!window._sopLoyalty)window._sopLoyalty={};  
  if(!window._sopSpeaker)window._sopSpeaker={};  
}  
function sopDropdowns(key,isR){  
  const loyOpts=isR?['','Solid Burrows','Likely Burrows','Backing Winner','Unsure','Likely Reform','Strong Reform']:['','Solid Burrows','Likely Burrows','Backing Winner','Unsure','Likely Democrat','Strong Democrat'];  
  const spkOpts=['','Burrows (R)','Challenger (R)','Democrat (D)'];  
  const loy=window._sopLoyalty[key]||'';const spk=window._sopSpeaker[key]||'';  
  let h=`<select onchange="window._sopLoyalty['${key}']=this.value;renderSOP()" style="width:100%;font-size:8px;padding:2px;font-family:var(--font-mono);border:1px solid var(--border-color);margin-bottom:2px;">`;  
  loyOpts.forEach(o=>{h+=`<option value="${o}"${loy===o?' selected':''}>${o||'— Loyalty —'}</option>`;});  
  h+=`</select><select onchange="window._sopSpeaker['${key}']=this.value;renderSOP()" style="width:100%;font-size:8px;padding:2px;font-family:var(--font-mono);border:1px solid var(--border-color);">`;  
  spkOpts.forEach(o=>{h+=`<option value="${o}"${spk===o?' selected':''}>${o||'— Speaker Vote —'}</option>`;});  
  h+=`</select>`;return h;  
}  
  
function factionBoxHtml(f){if(!f)return'';return`<span style="display:inline-flex;align-items:center;gap:2px;padding:1px 4px;border:1px solid ${f.clr};background:${f.bg};font-size:7px;font-weight:700;color:${f.clr};letter-spacing:0.3px;white-space:nowrap;"><span style="font-weight:900;">${f.code}</span>${f.label}</span>`;}  
function factionBoxSmall(f){if(!f)return'';return`<span style="display:inline-flex;align-items:center;gap:1px;padding:0px 3px;border:1px solid ${f.clr};background:${f.bg};font-size:6px;font-weight:700;color:${f.clr};letter-spacing:0.2px;white-space:nowrap;"><span style="font-weight:900;">${f.code}</span></span>`;}  
function positionBar(dist){  
  const ds=String(dist);const v=speakerVotes[ds];if(!v)return'';  
  const inc=incumbents[ds];if(!inc)return'';  
  const f=getFaction(inc.p,v.r1,v.r2);if(!f)return'';  
  return`<div style="display:flex;align-items:center;gap:4px;padding:2px 4px;margin-bottom:3px;background:var(--muted-bg);border:1px solid var(--muted-rule);">  
    <span style="font-size:6px;letter-spacing:1px;color:var(--muted);font-weight:700;white-space:nowrap;">'25 POSITION</span>  
    <span style="font-size:7px;padding:1px 5px;border:1px solid ${f.clr};background:${f.bg};color:${f.clr};font-weight:700;letter-spacing:0.3px;white-space:nowrap;">${f.label}</span>  
  </div>`;  
}  
function renderSOP(){  
  const{returning,newfaces,contests,runoffs}=getSopData();  
  document.getElementById('sopReturning').innerHTML=returning.map(s=>sopMiniCard(s)).join('');  
  document.getElementById('sopNewFaces').innerHTML=newfaces.map(s=>sopNewCard(s)).join('');  
  document.getElementById('sopContests').innerHTML=contests.map(s=>sopContestBar(s,'nov')).join('');  
  document.getElementById('sopRunoffs').innerHTML=runoffs.map(s=>sopContestBar(s,'runoff')).join('');  
  // Loyalty counts (from loyalty dropdown)  
  const loyMap={'Solid Burrows':0,'Likely Burrows':0,'Backing Winner':0,'Unsure':0,'Likely Reform':0,'Strong Reform':0,'Likely Democrat':0,'Strong Democrat':0};  
  function tallyLoyalty(key){const v=window._sopLoyalty[key]||'';if(v in loyMap)loyMap[v]++;}  
  let floorB=0,floorO=0,floorD=0,floorNone=0;  
  function tallyFloor(key){const v=window._sopSpeaker[key]||'';if(v==='Burrows (R)')floorB++;else if(v==='Challenger (R)')floorO++;else if(v==='Democrat (D)')floorD++;else floorNone++;}  
  returning.forEach(s=>{tallyLoyalty('r_'+s.d);tallyFloor('r_'+s.d);});  
  newfaces.forEach(s=>{tallyLoyalty('n_'+s.d);tallyFloor('n_'+s.d);});  
  contests.forEach(s=>{const tog=window._sopToggles[s.d+'_main']||(s.isVoRunoff?'d':'r');const key=tog==='r'?'c_'+s.d+'_r0':'c_'+s.d+'_d0';tallyLoyalty(key);tallyFloor(key);});  
  runoffs.forEach(s=>{const rk=s.inc.p==='R'?'r0':'d0';tallyLoyalty('c_'+s.d+'_'+rk);tallyFloor('c_'+s.d+'_'+rk);});  
  const loyUnset=150-Object.values(loyMap).reduce((a,b)=>a+b,0);  
  document.getElementById('loyStrongB').textContent=loyMap['Solid Burrows'];  
  document.getElementById('loyLeanB').textContent=loyMap['Likely Burrows'];  
  document.getElementById('loyBacking').textContent=loyMap['Backing Winner'];  
  document.getElementById('loyNeutral').textContent=loyMap['Unsure']+loyUnset;  
  document.getElementById('loyLeanR').textContent=loyMap['Likely Reform'];  
  document.getElementById('loyStrongR').textContent=loyMap['Strong Reform'];  
  document.getElementById('loyDem').textContent=loyMap['Likely Democrat']+loyMap['Strong Democrat'];  
  document.getElementById('floorBurrows').textContent=floorB;  
  document.getElementById('floorOther').textContent=floorO;  
  document.getElementById('floorDem').textContent=floorD;  
  document.getElementById('floorNone').textContent=floorNone;  
  const allSeats=[];  
  returning.forEach(s=>allSeats.push({...s,sopKey:'r_'+s.d}));  
  newfaces.forEach(s=>allSeats.push({...s,isNew:true,sopKey:'n_'+s.d}));  
  contests.forEach(s=>{  
    const tog=window._sopToggles[s.d+'_main']||'r';  
    if(tog==='r'){const rN=s.rCands.length>0?s.rCands[0][0]:'TBD';allSeats.push({d:s.d,name:rN,party:'R',faction:s.faction,isContest:true,sopKey:'c_'+s.d+'_r0'});}  
    else{const dN=s.dCands.length>0?s.dCands[0][0]:'TBD';allSeats.push({d:s.d,name:dN,party:'D',faction:null,isContest:true,sopKey:'c_'+s.d+'_d0'});}  
  });  
  runoffs.forEach(s=>{  
    const pc=s.inc.p==='R'?s.rCands:s.dCands;  
    const leadName=pc&&pc.length>0?pc[0][0]:(s.inc.n+' (open)');  
    allSeats.push({d:s.d,name:leadName,party:s.inc.p,faction:null,isNew:true,sopKey:'c_'+s.d+'_'+(s.inc.p==='R'?'r0':'d0')});  
  });  
  drawVoteBoard(allSeats);  
}  
function sopMiniCard(s){  
  const bc=s.party==='R'?'var(--rep-red)':'var(--dem-blue)';  
  let h=`<div style="background:var(--surface);border:1px solid var(--border-color);border-top:3px solid ${bc};padding:6px 8px;font-family:var(--font-mono);font-size:10px;">`;  
  h+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;"><span style="font-weight:700;">HD-${s.d}</span>`+positionBar(s.d)+`</div>`;  
  h+=`<div style="font-size:11px;font-weight:700;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.name}</div>`;  
  h+=sopDropdowns('r_'+s.d,s.party==='R');  
  h+=`</div>`;return h;  
}  
function sopNewCard(s){  
  const bc=s.party==='R'?'var(--rep-red)':'var(--dem-blue)';  
  let h=`<div style="background:var(--surface);border:1px solid var(--border-color);border-top:3px solid ${bc};padding:6px 8px;font-family:var(--font-mono);font-size:10px;">`;  
  h+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;"><span style="font-weight:700;">HD-${s.d}</span>`+positionBar(s.d)+`</div>`;  
  h+=`<div style="font-size:11px;font-weight:700;margin-bottom:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.name}</div>`;  
  if(s.incName)h+=`<div style="font-size:8px;color:var(--muted);margin-bottom:3px;">← ${s.incName}</div>`;  
  h+=sopDropdowns('n_'+s.d,s.party==='R');  
  h+=`</div>`;return h;  
}  
function sopContestBar(c,type){  
  const{d,inc,faction,rCands,dCands,rRunoff,dRunoff,openSeat,incLost}=c;  
  const flip=c.flip||null;const isNov=type==='nov';const isVo=c.isVoRunoff||false;  
  const margin=flip?flip.dominant+'+'+fmt(flip.margin):'';  
  const mainTog=window._sopToggles[d+'_main']||(isVo?'d':'r');  
  // Pick which R and D candidate is selected (for runoffs with 2 candidates)  
  const rSel=window._sopToggles[d+'_rpick']||0;  
  const dSel=window._sopToggles[d+'_dpick']||0;  
  const rTop=rRunoff?rCands.slice(0,2):(rCands.length?[rCands[0]]:[]);  
  const dTop=dRunoff?dCands.slice(0,2):(dCands.length?[dCands[0]]:[]);  
  const bc=mainTog==='r'?'var(--rep-red)':'var(--dem-blue)';  
  let h=`<div style="background:var(--surface);border:1px solid var(--border-color);border-top:3px solid ${bc};padding:6px 8px;font-family:var(--font-mono);font-size:10px;">`;  
  // Header: HD + tags  
  h+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;flex-wrap:wrap;gap:2px;">`;  
  h+=`<span style="font-weight:700;">HD-${d}</span>`;  
  if(isNov)h+=`<span style="font-size:6px;padding:1px 3px;background:#fff3e0;border:1px solid #ef6c00;color:#e65100;font-weight:700;">NOV</span>`;  
  if(rRunoff||dRunoff)h+=`<span style="font-size:6px;padding:1px 3px;background:var(--success-light);border:1px solid var(--success);color:var(--success);font-weight:700;">RUN</span>`;  
  h+=positionBar(d);  
  h+=`</div>`;  
  // Incumbent line (small)  
  h+=`<div style="font-size:7px;color:var(--muted);margin-bottom:3px;">${openSeat||incLost?'←':''} ${inc.n}</div>`;  
  // R candidate(s)  
  if(rTop.length>0){  
    rTop.forEach((rc,i)=>{  
      const isThisR=mainTog==='r';  
      const picked=rSel==i;  
      const showPick=rRunoff&&rTop.length>1;  
      h+=`<div onclick="window._sopToggles[${d}+'_main']='r';${showPick?`window._sopToggles[${d}+'_rpick']=${i};`:''}renderSOP()" style="padding:3px 4px;margin-bottom:2px;cursor:pointer;border-left:3px solid ${isThisR?(picked||!showPick?'var(--rep-red)':'#e0e0e0'):'#e0e0e0'};background:${isThisR&&(picked||!showPick)?'#fde8e8':'var(--muted-surface)'};${isThisR&&(picked||!showPick)?'':'opacity:0.5;'}">`;  
      h+=`<div style="display:flex;align-items:center;gap:3px;">`;  
      h+=`<input type="radio" name="mt${d}" ${isThisR&&(picked||!showPick)?'checked':''} style="margin:0;width:10px;height:10px;cursor:pointer;flex-shrink:0;" onclick="event.stopPropagation();window._sopToggles[${d}+'_main']='r';${showPick?`window._sopToggles[${d}+'_rpick']=${i};`:''}renderSOP()">`;  
      h+=`<span class="party-tag R" style="font-size:7px;padding:0px 3px;${i>0?'background:#CC5500;':''}">R</span>`;  
      h+=`<span style="font-size:10px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${rc[0]}</span>`;  
      h+=`</div>`;  
      h+=`<div style="font-size:8px;color:var(--muted);padding-left:16px;">${fmt(rc[1])} (${rc[2]}%)</div>`;  
      h+=`</div>`;  
    });  
  } else {  
    h+=`<div style="font-size:8px;color:var(--muted);padding:2px;text-align:center;">No R</div>`;  
  }  
  // D candidate(s)  
  if(dTop.length>0){  
    dTop.forEach((dc,i)=>{  
      const isThisD=mainTog==='d';  
      const picked=dSel==i;  
      const showPick=dRunoff&&dTop.length>1;  
      const clickable=!isVo||true;// Vo: D side always clickable  
      h+=`<div onclick="window._sopToggles[${d}+'_main']='d';${showPick?`window._sopToggles[${d}+'_dpick']=${i};`:''}renderSOP()" style="padding:3px 4px;margin-bottom:2px;cursor:pointer;border-left:3px solid ${isThisD&&(picked||!showPick)?'var(--dem-blue)':'#e0e0e0'};background:${isThisD&&(picked||!showPick)?'#e3f2fd':'var(--muted-surface)'};${isThisD&&(picked||!showPick)?'':'opacity:0.5;'}">`;  
      h+=`<div style="display:flex;align-items:center;gap:3px;">`;  
      h+=`<input type="radio" name="mt${d}" ${isThisD&&(picked||!showPick)?'checked':''} style="margin:0;width:10px;height:10px;cursor:pointer;flex-shrink:0;" onclick="event.stopPropagation();window._sopToggles[${d}+'_main']='d';${showPick?`window._sopToggles[${d}+'_dpick']=${i};`:''}renderSOP()">`;  
      h+=`<span class="party-tag D" style="font-size:7px;padding:0px 3px;${i>0?'background:#3a8fd4;':''}">D</span>`;  
      h+=`<span style="font-size:10px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${dc[0]}</span>`;  
      h+=`</div>`;  
      h+=`<div style="font-size:8px;color:var(--muted);padding-left:16px;">${fmt(dc[1])} (${dc[2]}%)</div>`;  
      h+=`</div>`;  
    });  
  } else {  
    h+=`<div style="font-size:8px;color:var(--muted);padding:2px;text-align:center;">No D</div>`;  
  }  
  // Dropdowns for the selected candidate  
  const selIsR=mainTog==='r';  
  h+=`<div style="margin-top:3px;">`+sopDropdowns('c_'+d+'_'+(selIsR?'r0':'d0'),selIsR)+`</div>`;  
  h+=`</div>`;  
  return h;  
}  
  
function drawVoteBoard(seats){  
  const board=document.getElementById('voteBoard');  
  const sorted=[...seats].sort((a,b)=>a.d-b.d);  
  // Loyalty -> color mapping  
  const loyColors={  
    'Solid Burrows':'#c62828','Likely Burrows':'#e65100','Backing Winner':'#f9a825',  
    'Unsure':'#9e9e9e',  
    'Likely Reform':'#546e7a','Strong Reform':'#37474f',  
    'Likely Democrat':'#42a5f5','Strong Democrat':'#1565c0'  
  };  
  let h='';  
  sorted.forEach(s=>{  
    // Determine the loyalty key for this seat  
    let loyKey='';  
    if(s.sopKey)loyKey=s.sopKey;  
    else loyKey='r_'+s.d;  
    const loy=window._sopLoyalty[loyKey]||'';  
    // Color by loyalty if set, else fallback to grey party  
    let dotColor=loy&&loyColors[loy]?loyColors[loy]:(s.party==='R'?'#bcaaa4':'#90a4ae');  
    // Get short last name  
    const parts=s.name.replace(/,/g,'').split(' ');  
    const skip=['JR','JR.','SR','SR.','III','IV','II'];  
    let short='';  
    for(let i=parts.length-1;i>=0;i--){if(!skip.includes(parts[i].toUpperCase())){short=parts[i].toUpperCase();break;}}  
    if(short.length>10)short=short.substring(0,9)+'.';  
    h+=`<div style="display:flex;align-items:center;gap:3px;padding:1px 2px;white-space:nowrap;overflow:hidden;">`;  
    h+=`<span style="width:9px;height:9px;border-radius:50%;background:${dotColor};flex-shrink:0;display:inline-block;"></span>`;  
    h+=`<span style="color:var(--muted);font-size:9px;min-width:20px;font-weight:700;">${s.d}</span>`;  
    h+=`<span style="font-size:9px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;">${short}</span>`;  
    h+=`</div>`;  
  });  
  board.innerHTML=h;  
}  
  
initDefaults();  
renderSOP();  
renderConsultantsBoard();  
  
// Startup: open 89th leg nav, activate members  
document.getElementById('nav89').style.display='flex';  
document.getElementById('nav89Btn').classList.add('parent-active');  
document.querySelector('#nav89 .sub-nav-btn[data-tab="members"]').classList.add('active');
