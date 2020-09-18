data = JSON.parse(my_post_request("/db_tools/show_all_bugs"));

table = document.createElement("table");
table.border = 1;
table.id = "MyTable";
table.classList.add("styled-table");
table.width="100%";

thead = document.createElement("thead");

tr = document.createElement("tr");
td_id = document.createElement("th");
td_id.innerText = "ID \u21D5";
td_id.onclick = function(){sortTable(0, table.id);};
tr.appendChild(td_id);

td_name = document.createElement("th");
td_name.innerText = "Name \u21D5";
td_name.onclick=function(){sortTable(1, table.id);};
tr.appendChild(td_name);

td_datestart = document.createElement("th");
td_datestart.innerText = "Date-time of start \u21D5";
td_datestart.onclick = function(){sortTable(2, table.id);};
tr.appendChild(td_datestart);

td_dateend = document.createElement("th");
td_dateend.innerText = "Date-time of end \u21D5";
td_dateend.onclick = function(){sortTable(3, table.id);};
tr.appendChild(td_dateend);

td_finished = document.createElement("th");
td_finished.innerText = "Is completed \u21D5";
td_finished.onclick = function(){sortTable(4, table.id);};
tr.appendChild(td_finished);

thead.appendChild(tr);  
table.appendChild(thead);  

tbody = document.createElement("tbody");

tr = document.createElement("tr");
td_id = document.createElement("td");
td_name = document.createElement("td");
td_datestart = document.createElement("td");
td_dateend = document.createElement("td");
td_finished = document.createElement("td");

td_id.appendChild(document.createElement("button"));
td_id.children[0].innerText = "\u002B";
td_id.children[0].classList.add("plus-button");
td_id.children[0].onclick = function()
{
  name = document.getElementById("fname").value;
  if (name == "")
    alert("Bad project name");
  else
  {
    my_post_request("/db_tools/add_project&&&" + document.getElementById("fname").value +
    "|" + document.getElementById("date_start").value);
    document.location.reload();
  }
};

td_name.appendChild(document.createElement("input"));
td_name.children[0].type = "text";
td_name.children[0].id = "fname";
td_name.children[0].name = "firstname";
td_name.children[0].placeholder = "Project name..";
td_name.children[0].classList.add("my_input");


td_datestart.appendChild(document.createElement("input"));
td_datestart.children[0].type = "date";
td_datestart.children[0].value = new Date().toDateInputValue();;
td_datestart.children[0].id = "date_start";
td_datestart.children[0].name = "date_start";
td_datestart.children[0].classList.add("my_input");


tr.appendChild(td_id);
tr.appendChild(td_name);
tr.appendChild(td_datestart);
tr.appendChild(td_dateend);
tr.appendChild(td_finished);
tbody.appendChild(tr);

for (i = 0; i < data.length; i++)
{
  tr = document.createElement("tr");

  td_id = document.createElement("td");
  td_id.innerText = data[i][0];
  tr.appendChild(td_id);

  td_name = document.createElement("td");
  td_name.appendChild(document.createElement("a"))
  td_name.lastChild.href = "profile?id=" + data[i][0] + "&type=project";
  td_name.lastChild.innerText = data[i][1];
  tr.appendChild(td_name);

  td_datestart = document.createElement("td");  
  td_datestart.innerText = data[i][2];
  tr.appendChild(td_datestart);

  td_dateend = document.createElement("td");  
  td_dateend.innerText = data[i][3];
  tr.appendChild(td_dateend);

  td_finished = document.createElement("td");  
  if (data[i][3] == null)
    td_finished.innerText = "\u274C";
  else
    td_finished.innerText = "\u2705";
  tr.appendChild(td_finished);
  tbody.appendChild(tr);  
}

table.append(tbody);
document.getElementById("content").appendChild(table);
