
function loadAllbugs(loadStr)
{
  data = JSON.parse(my_post_request(loadStr));
  projects = JSON.parse(my_post_request("/db_tools/show_min_active_projects"));
  developers = JSON.parse(my_post_request("/db_tools/show_min_dev"));
  testers = JSON.parse(my_post_request("/db_tools/show_min_testers"));
  project_names = JSON.parse(my_post_request("/db_tools/show_project_names"));
  worker_names = JSON.parse(my_post_request("/db_tools/show_worker_names"));

  table = document.createElement("table");
  table.border = 1;
  table.id = "MyTable";
  table.classList.add("styled-table");
  table.width="100%";

  thead = document.createElement("thead");

  fields = ["ID", "Project", "Name", "Category", "Fault", "Finder", "Fixer", "Time_found", "Time_deadline", "Time_fixed", "IsClosed"];

  tr = document.createElement("tr");
  for (i = 0; i < fields.length; i++)
  {
    td_id = document.createElement("th");
    td_id.innerText = fields[i] + "\u21D5";
    td_id.id = "th_" + i;
    td_id.onclick = function(){sortTable(this.id.substr(3), "MyTable");};
    tr.appendChild(td_id);
  }

  thead.appendChild(tr);
  table.appendChild(thead);

  tbody = document.createElement("tbody");

  tr = document.createElement("tr");
  for (i = 0; i < fields.length; i++)
  {
    td_id = document.createElement("td");
    if (i == 0)
    {
      td_id.appendChild(document.createElement("button"));
      td_id.children[0].innerText = "\u002B";
      td_id.children[0].classList.add("plus-button");
      td_id.children[0].onclick = function()
      {
        proj_id = document.getElementById("project_sel").value;
        Name = document.getElementById("bug_name").value;
        Category = document.getElementById("bug_category").value;
        id_fault = document.getElementById("fault_sel").value;
        id_founder = document.getElementById("finder_sel").value;
        id_fixer = document.getElementById("fixer_sel").value;
        time_found = document.getElementById("date_found").value;
        time_deadline = document.getElementById("date_deadline").value;
        my_post_request("/db_tools/add_bug&&&" + proj_id + "|" + Name + "|" + Category + "|" + id_fault + "|" + id_founder + "|" + id_fixer + "|" + time_found + "|" + time_deadline);
        document.location.reload();
      };
    }

    if (i == 1)
    {
       sel = document.createElement("select")
       sel.classList.add("my_input");
       sel.id = "project_sel";
       for (j = 0; j < projects.length; j++)
       {
         opt = document.createElement("option");
         opt.value = projects[j][0];
         opt.innerText = projects[j][1];
         sel.appendChild(opt);
       }
       td_id.appendChild(sel);
    }
    if (i == 2 || i == 3)
    {
       inp = document.createElement("input")
       inp.classList.add("my_input");
       if (i == 2)
         inp.id = "bug_name";
       else
         inp.id = "bug_category";
       td_id.appendChild(inp);
    }
    if (i == 4)
    {
       sel = document.createElement("select")
       sel.classList.add("my_input");
       sel.id = "fault_sel";
       for (j = 0; j < developers.length; j++)
       {
         opt = document.createElement("option");
         opt.value = developers[j][0];
         opt.innerText = developers[j][1];
         sel.appendChild(opt);
       }
       td_id.appendChild(sel);
    }
    if (i == 5 || i == 6)
    {
       sel = document.createElement("select")
       sel.classList.add("my_input");
       if (i == 5)
         sel.id = "finder_sel";
       else
         sel.id = "fixer_sel";
       for (j = 0; j < testers.length; j++)
       {
         opt = document.createElement("option");
         opt.value = testers[j][0];
         opt.innerText = testers[j][1];
         sel.appendChild(opt);
       }
       td_id.appendChild(sel);
    }
    if (i == 7 || i == 8)
    {
      dt = document.createElement("input");
      dt.type = "date";
      dt.value = new Date().toDateInputValue();;
      if (i == 7)
        dt.id = "date_found";
      else
        dt.id = "date_deadline";
      dt.classList.add("my_input");
      td_id.appendChild(dt);
    }
    tr.appendChild(td_id);
  }
  tbody.appendChild(tr);
/*
td_proj = document.createElement("td");
td_datestart = document.createElement("td");
td_dateend = document.createElement("td");
td_finished = document.createElement("td");

td_id.appendChild(document.createElement("button"));
td_id.children[0].innerText = "\u002B";
td_id.children[0].classList.add("plus-button");
td_id.children[0].onclick = function()
{
  alert("TODO");
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
*/
  for (i = 0; i < data.length; i++)
  {
    tr = document.createElement("tr");

    for (j = 0; j < data[i].length; j++)
    {
      td_id = document.createElement("td");
      if (j == 1)
      {
        project_name = project_names[data[i][j] -1]
        td_id.innerHTML = "<a href='/profile?id=" + data[i][j] + "&type=project'>" + project_name+"</a>";
      }
      else if (j >= 4 && j <= 6)
      {
        worker_name = worker_names[data[i][j] - 1]
        td_id.innerHTML = "<a href='/profile?id=" + data[i][j] + "&type=staff'>" + worker_name + "</a>";
      }
      else
        td_id.innerText = data[i][j];
      tr.appendChild(td_id);
    }
    td_id = document.createElement("td");
    if (data[i][9] == null)
    {
      td_id.innerHTML = "<button style='border:none;'>\u274C</button>";
      td_id.children[0].id = "button_" + data[i][0];
      td_id.children[0].onclick = function()
      {
        really = confirm("this bug really fixed?");
        if (really)
        {
          my_post_request("/db_tools/bug_fix&&&" + this.id.substr(7));
          document.location.reload();
        }
      }
    }
    else
      td_id.innerText = "\u2705";
    tr.appendChild(td_id);
    tbody.appendChild(tr);
  }

  table.append(tbody);
  return table;
}