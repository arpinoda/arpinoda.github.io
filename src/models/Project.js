class Project {
  constructor(json) {
    if (!json) return;

    this.projectID = json.projectID ? json.projectID : 0;
    this.name = json.name ? json.name : null;
    this.description = json.description ? json.description : null;
    this.media = json.media ? json.media : null;
  }
}

export default Project;
