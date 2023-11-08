let theInput = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-btn");
let reposData = document.querySelector(".show-repos");

getBtn.onclick = function () {
  getRepos();
};

// Get repos Function
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        reposData.innerHTML = "";

        //loop on repos
        repos.forEach((repo) => {
          // Create The Main Div
          let mainDiv = document.createElement("div");
          let repName = document.createTextNode(repo.name);
          mainDiv.appendChild(repName);
          mainDiv.className = "repoDiv";
          reposData.appendChild(mainDiv);
          // Create Repo URL
          let repoUrl = document.createElement("a");
          let repoUrlText = document.createTextNode("Visit");
          repoUrl.appendChild(repoUrlText);
          repoUrl.className = "repoUrl";
          repoUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          repoUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(repoUrl);
          // Create Repo Stars
          let repoStars = document.createElement("span");
          let repoStarsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          repoStars.appendChild(repoStarsText);
          repoStars.className = "repoStars";
          mainDiv.appendChild(repoStars);

          reposData.appendChild(mainDiv);
          
        });
      });
  }
}
