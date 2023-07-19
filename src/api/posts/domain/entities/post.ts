export interface PostData {
  postFormat: string;
  title: string;
  featureImg: string;
  date: string;
  category: string;
  categoryName: string;
  categoryImg: string;
  postViews: number;
  readTime: string;
  authorName: string;
  authorImg: string;
  authorDesignation: string;
  authorBio: string;
  authorSocial: Array<any>;
  tags: Array<string>;
  content: string;
  uuid: string;
  slug: string;
}

export interface PostI extends PostData {
  id: string;
}

export class PostEntity implements PostI {
  id: string;
  postFormat: string;
  title: string;
  featureImg: string;
  date: string;
  category: string;
  categoryName: string;
  categoryImg: string;
  postViews: number;
  readTime: string;
  authorName: string;
  authorImg: string;
  authorDesignation: string;
  authorBio: string;
  authorSocial: Array<any>;
  tags: Array<string>;
  content: string;
  uuid: string;
  slug: string;

  constructor(
    id: string,
    postFormat: string,
    title: string,
    featureImg: string,
    date: string,
    category: string,
    categoryName: string,
    categoryImg: string,
    postViews: number,
    readTime: string,
    authorName: string,
    authorImg: string,
    authorDesignation: string,
    authorBio: string,
    authorSocial: Array<any>,
    tags: Array<string>,
    content: string,
    uuid: string,
    slug: string
  ) {
    this.id = id;
    this.postFormat = postFormat;
    this.title = title;
    this.featureImg = featureImg;
    this.date = date;
    this.category = category;
    this.categoryName = categoryName;
    this.categoryImg = categoryImg;
    this.postViews = postViews;
    this.readTime = readTime;
    this.authorName = authorName;
    this.authorImg = authorImg;
    this.authorDesignation = authorDesignation;
    this.authorBio = authorBio;
    this.authorSocial = authorSocial;
    this.tags = tags;
    this.content = content;
    this.uuid = uuid;
    this.slug = slug;
  }
}
