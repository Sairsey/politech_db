function loadAll(load_str)
{
  data = JSON.parse(my_post_request(load_str));

  table = document.createElement("table");
  table.border = 1;
  table.id = "Workers_table"
  table.classList.add("styled-table");
  table.width="100%";

  thead = document.createElement("thead");

  tr = document.createElement("tr");
  td_id = document.createElement("th");
  td_id.innerText = "ID\u21D5";

  td_name = document.createElement("th");
  td_name.innerText = "Name\u21D5";

  td_surname = document.createElement("th");
  td_surname.innerText = "Surname\u21D5";

  td_pos = document.createElement("th");
  td_pos.innerText = "Position\u21D5";

  td_email = document.createElement("th");
  td_email.innerText = "EMail\u21D5";

  td_fired = document.createElement("th");
  td_fired.innerText = "Is working\u21D5";

  if (data.length > 0)
  {
    td_id.onclick = function(){sortTable(0, table.id);};
    td_name.onclick = function(){sortTable(1, table.id);};
    td_surname.onclick = function(){sortTable(2, table.id);};
    td_pos.onclick =  function(){sortTable(3, table.id);};
    td_email.onclick = function(){sortTable(4, table.id);};
    td_fired.onclick = function(){sortTable(5, table.id);};
  }
  tr.appendChild(td_id);
  tr.appendChild(td_name);
  tr.appendChild(td_surname);
  tr.appendChild(td_pos);
  tr.appendChild(td_email);
  tr.appendChild(td_fired);


  thead.appendChild(tr);
  table.appendChild(thead);

  tbody = document.createElement("tbody");

  tr = document.createElement("tr");
  td_id = document.createElement("td");
  td_name = document.createElement("td");
  td_surname = document.createElement("td");
  td_email = document.createElement("td");
  td_pos = document.createElement("td");
  td_working = document.createElement("td");

  td_id.appendChild(document.createElement("button"));
  td_id.children[0].innerText = "\u002B";
  td_id.children[0].classList.add("plus-button");
  td_id.children[0].onclick = function()
  {
    name = document.getElementById("fname").value;
    surname = document.getElementById("sname").value;
    email = document.getElementById("email").value;
    pos = document.getElementById("posit").value;
    if (name == "" || surname == "" || email == "")
      alert("Bad project name/surname/email");
    else
    {
      my_post_request("/db_tools/add_worker&&&" +
        document.getElementById("fname").value + "|" +
        document.getElementById("sname").value + "|" +
        document.getElementById("email").value + "|" +
        pos);
      document.location.reload();
    }
  };

  td_name.appendChild(document.createElement("input"));
  td_name.children[0].type = "text";
  td_name.children[0].id = "fname";
  td_name.children[0].name = "firstname";
  td_name.children[0].placeholder = "Staff name..";
  td_name.children[0].classList.add("my_input");

  td_surname.appendChild(document.createElement("input"));
  td_surname.children[0].type = "text";
  td_surname.children[0].id = "sname";
  td_surname.children[0].name = "surname";
  td_surname.children[0].placeholder = "Staff surname..";
  td_surname.children[0].classList.add("my_input");

  td_email.appendChild(document.createElement("input"));
  td_email.children[0].type = "text";
  td_email.children[0].id = "email";
  td_email.children[0].name = "email";
  td_email.children[0].placeholder = "Staff email..";
  td_email.children[0].classList.add("my_input");

  sel = document.createElement("select")
  sel.classList.add("my_input");
  sel.id = "posit";

  sel.appendChild(document.createElement("option"))
  sel.children[0].value = "Developer";
  sel.children[0].innerText = "Developer";

  sel.appendChild(document.createElement("option"))
  sel.children[1].value = "Tester";
  sel.children[1].innerText = "Tester";


  td_pos.appendChild(sel);

  tr.appendChild(td_id);
  tr.appendChild(td_name);
  tr.appendChild(td_surname);
  tr.appendChild(td_pos);
  tr.appendChild(td_email);
  tr.appendChild(td_working);
  tbody.appendChild(tr);

  for (i = 0; i < data.length; i++)
  {
    tr = document.createElement("tr");

    td_id = document.createElement("td");
    td_id.innerText = data[i][0];
    tr.appendChild(td_id);

    td_name = document.createElement("td");
    td_name.appendChild(document.createElement("a"))
    td_name.lastChild.href = "profile?id=" + data[i][0] + "&type=staff";
    td_name.lastChild.innerText = data[i][1];
    tr.appendChild(td_name);

    td_surname = document.createElement("td");
    td_surname.innerText = data[i][2];
    tr.appendChild(td_surname);

    td_pos = document.createElement("td");
    td_pos.innerText = data[i][4];
    tr.appendChild(td_pos);

    td_email = document.createElement("td");
    td_email.innerText = data[i][3];
    tr.appendChild(td_email);

    td_working = document.createElement("td");
    if (data[i][5] == 1)
      td_working.innerText = "\u274C";
    else
      td_working.innerText = "\u2705";
    tr.appendChild(td_working);
    tbody.appendChild(tr);
  }

  table.append(tbody);
  document.getElementById("content").appendChild(table);
}