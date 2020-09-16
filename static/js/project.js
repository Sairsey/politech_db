data = JSON.parse(my_post_request("/db_tools/show_all_projects"));

table = document.createElement("table");
table.border = 1;
table.classList.add("styled-table");
table.width="100%";

thead = document.createElement("thead");

tr = document.createElement("tr");
td_id = document.createElement("th");
td_id.innerText = "ID";
tr.appendChild(td_id);

td_name = document.createElement("th");  
td_name.innerText = "Name";
tr.appendChild(td_name);

td_datestart = document.createElement("th");  
td_datestart.innerText = "Date-time of start";
tr.appendChild(td_datestart);

td_dateend = document.createElement("th");  
td_dateend.innerText = "Date-time of end";
tr.appendChild(td_dateend);

td_finished = document.createElement("th");  
td_finished.innerText = "Is completed";
tr.appendChild(td_finished);


thead.appendChild(tr);  
table.appendChild(thead);  

tbody = document.createElement("tbody");

for (i = 0; i < data.length; i++)
{
  tr = document.createElement("tr");

  td_id = document.createElement("td");
  td_id.innerText = data[i][0];
  tr.appendChild(td_id);

  td_name = document.createElement("td");  
  td_name.innerText = data[i][1];
  tr.appendChild(td_name);

  td_datestart = document.createElement("td");  
  td_datestart.innerText = data[i][2];
  tr.appendChild(td_datestart);

  td_dateend = document.createElement("td");  
  td_dateend.innerText = data[i][3];
  tr.appendChild(td_dateend);

  td_finished = document.createElement("td");  
  if (data[i][4] == 0)
    td_finished.innerText = "\u274C";
  else
    td_finished.innerText = "\u2705";
  tr.appendChild(td_finished);


  tbody.appendChild(tr);  
}
table.append(tbody);
document.getElementById("content").appendChild(table);
