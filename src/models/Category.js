import Project from './Project';

class Category {
  constructor(json) {
    this.json = json;
    this.json.breadcrumbs = '';

    this.children = [];
    this.projects = [];
  }
}

Category.prototype = {
  get categoryID() {
    return this.json.categoryID ? this.json.categoryID : null;
  },
  get name() {
    return this.json.name ? this.json.name : null;
  },
  get urlFragment() {
    return this.json.urlFragment ? this.json.urlFragment : null;
  },
  get className() {
    return this.json.className ? this.json.className : '';
  },
  set className(val) {
    this.json.className += `${val}`;
  },
  get elementID() {
    return this.urlPath;
  },
  get urlPath() {
    return this.json.urlFragment ? this.json.urlFragment : null;
  },
  set urlPath(val) {
    this.json.urlFragment = val;
  },
  get breadcrumbs() {
    return this.json.breadcrumbs ? this.json.breadcrumbs : this.json.name;
  },
  set breadcrumbs(val) {
    this.json.breadcrumbs = val;
  },
  get displayCrumbs() {
    let result = '';
    const crumbs = this.breadcrumbs.split(' > ');

    switch (crumbs.length) {
      case 2:
        result = `${crumbs[1]}`;
        break;
      case 3:
        result = `${crumbs[1]} > ${crumbs[2]}`;
        break;
      default:
        result = this.breadcrumbs;
        break;
    }

    return result;
  },
  subcategoriesFrom(categoriesJSON) {
    categoriesJSON.map(jsonItem => {
      if (jsonItem.parentIDs && jsonItem.parentIDs.includes(this.categoryID)) {
        const childCategory = new Category(jsonItem);
        childCategory.urlPath = `${this.urlPath}/${childCategory.urlFragment}`;
        childCategory.breadcrumbs = `${this.breadcrumbs} > ${childCategory.name}`;
        childCategory.subcategoriesFrom(categoriesJSON);
        this.children.push(childCategory);
      }
      return this;
    });

    if (this.isDeepestParent) {
      this.className = !this.className
        ? 'root-section'
        : `${this.className} root-section`;
    }
  },
  projectsFrom(projectsJSON) {
    projectsJSON
      .filter(projectJSON => projectJSON.categoryIDs.includes(this.categoryID))
      .sort((a, b) => a.index - b.index)
      .map(projectJSON => this.projects.push(new Project(projectJSON)));

    this.children.map(childCategory => {
      childCategory.projectsFrom(projectsJSON);
      return childCategory;
    });
  },
  getElementIDs() {
    const result = [];
    result.push(this.elementID);

    this.children.forEach(subcategory => {
      result.push(subcategory.getElementIDs());
    });
    return result;
  },
  get isDeepestParent() {
    let result = false;

    if (this.children.length === 0) {
      result = false;
    }

    const query = this.children.filter(
      child => child.children.length === 0 && !child.isDeepestParent,
    );

    result = query.length > 0;

    return result;
  },
};

export default Category;
