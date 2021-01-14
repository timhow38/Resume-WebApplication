const classes = {
  a: "projects-a",
  li: "projects-li",
  ul: "projects-ul",
  lang: "projects-lang",
  desc: "projects-desc"
};

const username = "timhow38";

const repoXHR = new XMLHttpRequest();

function populate() {
  const repos = JSON.parse(this.response);
  const ul = document.getElementsByClassName(classes.ul)[0];

  for (var i = 0, len = repos.length; i < len; i++) {
    if (!repos[i].fork) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const p = document.createElement("p");
      const p2 = document.createElement("p");
      
      li.className = classes.li;
      
      a.className = classes.a;
      a.href = repos[i].html_url;
      a.innerText = repos[i].name;
      
      p.className = classes.lang;
      p.innerText = repos[i].language || " ";
      
      p2.className = classes.desc;
      p2.innerText = repos[i].description;
      
      ul.appendChild(li)
        .appendChild(a)
        .appendChild(p)
        .appendChild(p2);
    }
  }
}

repoXHR.open(
  "GET",
  'https://api.github.com/users/' + username + '/repos?sort=created',
  true
);
repoXHR.addEventListener("load", populate);
repoXHR.send();
