class Project {
  constructor(json) {
    if (!json) return;

    this.projectID = json.projectID ? json.projectID : 0;
    this.name = json.name ? json.name : null;
    this.description = json.description ? json.description : null;
    this.images = json.images ? json.images : null;
  }
}

export default Project;
