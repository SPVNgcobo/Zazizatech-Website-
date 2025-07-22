let currentProject = 0;
const projects = document.querySelectorAll(".project");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function showProject(index) {
  projects.forEach((project, i) => {
    project.classList.remove("active");
    if (i === index) {
      project.classList.add("active");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentProject = (currentProject + 1) % projects.length;
  showProject(currentProject);
});

prevBtn.addEventListener("click", () => {
  currentProject = (currentProject - 1 + projects.length) % projects.length;
  showProject(currentProject);
});

showProject(currentProject);

