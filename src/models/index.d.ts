import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class News {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly img_src?: string;
  readonly text?: string;
  readonly dateCreated?: string;
  constructor(init: ModelInit<News>);
  static copyOf(source: News, mutator: (draft: MutableModel<News>) => MutableModel<News> | void): News;
}