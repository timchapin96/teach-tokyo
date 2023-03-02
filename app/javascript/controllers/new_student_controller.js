import { Controller } from "@hotwired/stimulus"
let studentArray = [];
let randomStudentArray = []
export default class extends Controller {
  static targets = ["form", "names"]

  displayForm() {
    this.formTarget.classList.remove("d-none")
  }
  new(student) {
    student.preventDefault()
  }
  select(e) {
    e.target.classList.toggle("student-card-clicked")
    let studentName = e.target.innerText;
    if (!studentArray.includes(studentName)) {
      studentArray.push(studentName);
    }
    else if (studentArray.includes(studentName)) {
      let removeName = studentArray.indexOf(studentName);
      studentArray.splice(removeName, 1);
    }
  }
  randomize() {
    console.log(this.namesTarget);
    let studentArrayCopy = [...studentArray]
    for (let i = 0; i < studentArray.length; i++) {
      let randStudent = sample(studentArrayCopy);
      randomStudentArray.push(randStudent);
      let removeName = studentArrayCopy.indexOf(randStudent);
      studentArrayCopy.splice(removeName, 1);
    }
    document.querySelector(".students").style.display = "none";
    this.appendGroups();
  }
  appendGroups() {
    // randomStudentArray.forEach((student, index) => {
    //   console.log(student);
    //   console.log(randomStudentArray[index+1]);
    // })

    // Create div for groups then create pairs/groups to append
    // How can I make this more efficient?
    const groupsDiv = document.createElement("groups")
    for (let i = 0; i < randomStudentArray.length; i = i + 2) {
      let groupDiv = document.createElement(`group${i}`)
      let h4Name1 = document.createElement("h4");
      let h4Name2 = document.createElement("h4");
      h4Name1.classList.add("group-card-body");
      h4Name2.classList.add("group-card-body");
      let name1 = document.createTextNode(randomStudentArray[i]);
      let name2 = document.createTextNode(randomStudentArray[i + 1]);

      if (randomStudentArray[i] && randomStudentArray[i + 1] !== undefined) {
        h4Name1.appendChild(name1);
        h4Name2.appendChild(name2);
        groupDiv.appendChild(h4Name1);
        groupDiv.appendChild(h4Name2);
      }
      else {
        h4Name1.appendChild(name1);
        groupDiv.appendChild(h4Name1);
      }
      groupDiv.classList.add("group-card")
      groupsDiv.appendChild(groupDiv);
    }
    const listContainer = document.querySelector(".list-container")
    listContainer.appendChild(groupsDiv);

    //Reset arrays
    studentArray = [];
    randomStudentArray = [];
  }
}
function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}
